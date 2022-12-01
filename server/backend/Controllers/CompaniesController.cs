using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using AutoMapper;
using System.ComponentModel.Design;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public CompaniesController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("Company")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CompanyGetDTO>>> GetCompanies()
        {
            var validation = Validation();
            if (validation != null) return validation;

            var companies =  await _context.Company.ToListAsync();
            return _mapper.Map<List<CompanyGetDTO>>(companies);
        }

        [HttpGet("Company/{companyId}")]
        [AllowAnonymous]
        public async Task<ActionResult<CompanyGetDTO>> GetCompany(int companyId)
        {
            var validation = Validation();
            if (validation != null) return validation;

            var company = await _context.Company.FindAsync(companyId);

            if (company == null)
            {
                return NotFound();
            }

            return _mapper.Map<CompanyGetDTO>(company);
        }

        [HttpPatch("Company/{companyId}/confirm")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CompanyGetDTO>> ConfirmCompany(int companyId)
        {
            var validation = Validation();
            if (validation != null) return validation;

            var company = await _context.Company.FindAsync(companyId);
            if (company == null) return NotFound();

            company.Confirmed = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(companyId)) return NotFound();
                else throw;
            }

            var companyGetDTO = _mapper.Map<CompanyGetDTO>(company);
            return CreatedAtAction("GetCompany", new { companyId = company.ID }, companyGetDTO);
        }

        [HttpPut("Company/{companyId}")]
        [Authorize(Roles = "Admin,CompanyOwner")]
        public async Task<ActionResult<CompanyGetDTO>> UpdateCompany(int companyId, CompanyPostDTO companyDTO)
        {
            var validation = Validation();
            if (validation != null) return validation;

            var company = await _context.Company.FindAsync(companyId);
            if (company == null) return NotFound();

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (!user.Roles.Contains(Role.CompanyOwner) && !user.Roles.Contains(Role.Admin)) return Forbid();
            if (!user.Roles.Contains(Role.Admin) && user.Company?.ID != company.ID) return Forbid();


            company.Title = companyDTO.Title;
            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(companyId)) return NotFound();
                else throw;
            }

            var companyGetDTO = _mapper.Map<CompanyGetDTO>(company);
            return Ok(companyGetDTO);
        }

        [HttpPost("Company")]
        [Authorize]
        public async Task<ActionResult<CompanyGetDTO>> PostCompany(CompanyPostDTO companyDTO)
        {
            var validation = Validation();
            if (validation != null) return validation;

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (user.Company != null) BadRequest();
            if (user.Roles.Contains(Role.CompanyOwner)) return BadRequest();

            var company = _mapper.Map<Company>(companyDTO);
            user.Company = company;

            var roles = new List<Role>(user.Roles);
            roles.Add(Role.CompanyOwner);
            user.Roles = roles;

            _context.Company.Add(company);
            await _context.SaveChangesAsync();

            var companyGetDTO = _mapper.Map<CompanyGetDTO>(company);
            return CreatedAtAction("GetCompany", new { companyId = company.ID }, companyGetDTO);
        }

        [HttpDelete("Company/{companyId}")]
        [Authorize(Roles = "Admin,CompanyOwner")]
        public async Task<IActionResult> DeleteCompany(int companyId)
        {
            var validation = Validation();
            if (validation != null) return validation;

            var company = await _context.Company.FindAsync(companyId);
            if (company == null)
            {
                return NotFound();
            }

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (!user.Roles.Contains(Role.Admin) && !user.Roles.Contains(Role.CompanyOwner)) return Forbid();
            if (!user.Roles.Contains(Role.Admin) && user.Company?.ID != company.ID) return Forbid();

            var owner = _context.User.Where(e => e.Company != null && e.Company.ID == company.ID).FirstOrDefault();
            if (owner == null) return Problem();

            var roles = new List<Role>(owner.Roles);
            roles.Remove(Role.CompanyOwner);
            owner.Roles = roles;
            owner.Company = null;

            company.Deleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return (_context.Company?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private ActionResult Validation()
        {
            if (_context.Company == null || _context.Service == null || _context.Review == null) return Problem();

            return default!;
        }
    }
}
