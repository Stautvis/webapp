using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace backend
{
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public ServicesController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("Company/{companyId}/Service")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ServiceGetDTO>>> GetServices(int companyId)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var services = await _context.Service.Where(e => e.Company.ID == companyId).ToListAsync();
            return _mapper.Map<List<ServiceGetDTO>>(services);
        }

        [HttpGet("Company/{companyId}/Service/{serviceId}")]
        [AllowAnonymous]
        public async Task<ActionResult<ServiceGetDTO>> GetService(int companyId, int serviceId)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var service = await _context.Service.Include(e => e.Company).Where(e => e.Company.ID == companyId && e.ID == serviceId).FirstOrDefaultAsync();
            if (service == null) return NotFound();

            return _mapper.Map<ServiceGetDTO>(service);
        }

        [HttpPatch("Company/{companyId}/Service/{serviceId}/confirm")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CompanyGetDTO>> ConfirmCompany(int companyId, int serviceId)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var service = await _context.Service.Where(e => e.CompanyID == companyId && e.ID == serviceId).FirstOrDefaultAsync();
            if (service == null) return NotFound();

            service.Confirmed = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(serviceId)) return NotFound();
                else throw;
            }

            var serviceGetDTO = _mapper.Map<ServiceGetDTO>(service);
            return CreatedAtAction("GetService", new { companyId = companyId, serviceId = service.ID }, serviceGetDTO);
        }

        [HttpPut("Company/{companyId}/Service/{serviceId}")]
        [Authorize(Roles = "Admin, CompanyOwner")]
        public async Task<ActionResult<ServiceGetDTO>> UpdateService(int companyId, int serviceId, ServicePostDTO serviceDTO)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var service = _context.Service.Where(e => e.Company.ID == companyId && e.ID == serviceId).FirstOrDefault();
            if (service == null) return NotFound();

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (!user.Roles.Contains(Role.Admin) && !user.Roles.Contains(Role.CompanyOwner)) return Forbid();
            if (!user.Roles.Contains(Role.Admin) && user.Company?.ID != service.CompanyID) return Forbid();

            service.Title = serviceDTO.Title;
            service.Description = serviceDTO.Description;
            service.ShortDescription = serviceDTO.ShortDescription;
            service.Image = serviceDTO.Image;


            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(serviceId)) return NotFound();
                else throw;
            }

            var serviceGetDTO = _mapper.Map<ServiceGetDTO>(service);
            return Ok(serviceGetDTO);
        }

        [HttpPost("Company/{companyId}/Service")]
        [Authorize(Roles = "CompanyOwner")]
        public async Task<ActionResult<ServiceGetDTO>> PostService(int companyId, ServicePostDTO serviceDTO)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var service = _mapper.Map<Service>(serviceDTO);
            service.CompanyID = companyId;

            _context.Service.Add(service);
            await _context.SaveChangesAsync();

            var serviceGetDTO = _mapper.Map<ServiceGetDTO>(service);    
            return CreatedAtAction("GetService", new { companyId = companyId, serviceId = service.ID }, serviceGetDTO);
        }

        [HttpDelete("Company/{companyId}/Service/{serviceId}")]
        [Authorize(Roles = "Admin, CompanyOwner")]
        public async Task<IActionResult> DeleteService(int companyId, int serviceId)
        {
            var validation = Validation(companyId);
            if (validation != null) return validation;

            var service = await _context.Service.Where(e => e.Company.ID == companyId && e.ID == serviceId).FirstOrDefaultAsync();
            if (service == null)
            {
                return NotFound();
            }

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (!user.Roles.Contains(Role.Admin) && !user.Roles.Contains(Role.CompanyOwner)) return Forbid();
            if (!user.Roles.Contains(Role.Admin) && user.Company?.ID != service.CompanyID) return Forbid();

            service.Deleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceExists(int id)
        {
            return (_context.Service?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private ActionResult Validation(int companyId)
        {
            if (_context.Company == null || _context.Service == null || _context.Review == null) return Problem();
            var company = _context.Company.Find(companyId);
            if (company == null) return NotFound();

            return default!;
        }
    }
}
