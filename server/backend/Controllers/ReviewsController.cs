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
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace backend
{
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public ReviewsController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("Company/{companyId}/Service/{serviceId}/Review")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ReviewGetDTO>>> GetServiceReviews(int companyId, int serviceId)
        {
            var validation = Validation(companyId, serviceId);
            if (validation != null) return validation;

            var reviews = await _context.Review.Where(e => e.Service.CompanyID == companyId &&  e.ServiceID == serviceId).ToListAsync();
            return _mapper.Map<List<ReviewGetDTO>>(reviews);
        }

        [HttpGet("Company/{companyId}/Service/{serviceId}/Review/{reviewId}")]
        [AllowAnonymous]
        public async Task<ActionResult<ReviewGetDTO>> GetServiceReview(int companyId, int serviceId, int reviewId)
        {
            var validation = Validation(companyId, serviceId);
            if (validation != null) return validation;

            var review = await _context.Review.Where(e => e.Service.CompanyID == companyId && e.ServiceID == serviceId && e.ID == reviewId).FirstOrDefaultAsync();
            if (review == null) return NotFound();

            return _mapper.Map<ReviewGetDTO>(review);
        }

        [HttpPost("Company/{companyId}/Service/{serviceId}/Review")]
        [Authorize]
        public async Task<ActionResult<ReviewGetDTO>> PostReview(int companyId, int serviceId, ReviewPostDTO reviewDTO)
        {
            var validation = Validation(companyId, serviceId);
            if (validation != null) return validation;

            var author = _context.User.Find(reviewDTO.AuthorID);
            if (author == null) return BadRequest();

            var review = _mapper.Map<Review>(reviewDTO);
            review.ServiceID = serviceId;

            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            var reviewGetDTO = _mapper.Map<ReviewGetDTO>(review); 
            return CreatedAtAction("GetServiceReview", new { companyId = companyId, serviceId = review.Service.ID, reviewId = review.ID }, reviewGetDTO);
        }

        [HttpPut("Company/{companyId}/Service/{serviceId}/Review/{reviewId}")]
        [Authorize]
        public async Task<ActionResult<ReviewGetDTO>> UpdateReview(int companyId, int serviceId, int reviewId, ReviewEditDTO reviewDTO)
        {
            var validation = Validation(companyId, serviceId);
            if (validation != null) return validation;

            var review = await _context.Review.Where(e => e.Service.CompanyID == companyId && e.ServiceID == serviceId && e.ID == reviewId).FirstOrDefaultAsync();
            if (review == null) return NotFound();

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (user.ID != review.Author.ID) return Forbid();

            review.Message = reviewDTO.Message;
            review.Rating = reviewDTO.Rating;

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(reviewId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var reviewGetDTO = _mapper.Map<ReviewGetDTO>(review);
            return Ok(reviewGetDTO);
        }

        [HttpDelete("Company/{companyId}/Service/{serviceId}/Review/{reviewId}")]
        [Authorize]
        public async Task<IActionResult> DeleteServiceReview(int companyId, int serviceId, int reviewId)
        {
            var validation = Validation(companyId, serviceId);
            if (validation != null) return validation;

            var review = await _context.Review.Where(e => e.Service.CompanyID == companyId && e.ServiceID == serviceId && e.ID == reviewId).FirstOrDefaultAsync();
            if (review == null) return NotFound();

            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = _context.User.Find(id);

            if (user == null) return Unauthorized();
            if (user.ID != review.Author.ID || !user.Roles.Contains(Role.Admin)) return Forbid();

            review.Deleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool ReviewExists(int id)
        {
            return (_context.Review?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private ActionResult Validation(int companyId, int serviceId)
        {
            if (_context.Company == null || _context.Service == null || _context.Review == null) return Problem();
            var company = _context.Company.Find(companyId);
            if (company == null) return NotFound();

            var service = _context.Service.Where(e => e.Company.ID == companyId && e.ID == serviceId).FirstOrDefault();
            if (service == null) return NotFound();

            return default!;
        } 
    }
}
