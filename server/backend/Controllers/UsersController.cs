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
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.Net.Http.Headers;

namespace backend
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public UsersController(Context context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("User/RefreshToken")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var user = _context.User.Where(e => e.RefreshToken == refreshToken).FirstOrDefault();

            if (user == null) { return Unauthorized(); }

            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = Generate(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("User/Login")]
        public IActionResult Login(UserLoginDTO userDTO)
        {
            var user = Authenticate(userDTO);

            if (user == null) return NotFound(
                new UserLoginDTO() { EmailAddress = "User not found or invalid credentials!"}
                );
            
            var token = Generate(user);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, user);

            return Ok(token);
        }

        [HttpGet("User")]
        public async Task<ActionResult<IEnumerable<UserGetDTO>>> GetUsers()
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            var users = await _context.User.ToListAsync();
            return _mapper.Map<List<UserGetDTO>>(users);
        }

        [Authorize]
        [HttpGet("User/Logged")]
        public async Task<ActionResult<UserGetDTO>> GetLoggedUser()
        {
            int id;
            var isLogged = int.TryParse(User.Identity?.Name, out id);
            if (!isLogged) return Unauthorized();

            var user = await _context.User.FindAsync(id);
            if (_context.User == null)
            {
                return NotFound();
            }
            return _mapper.Map<UserGetDTO>(user);
        }

        [HttpGet("User/{id}")]
        public async Task<ActionResult<UserGetDTO>> GetUser(int id)
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            
            return _mapper.Map<UserGetDTO>(user);
        }

        [HttpPut("User")]
        [Authorize]
        public async Task<IActionResult> PutUser(UserPostDTO userDTO)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null) return Problem();

            var stringId = identity.Claims.FirstOrDefault(e => e.Type == ClaimTypes.NameIdentifier)?.Value;
            var id = int.Parse(stringId!);

            var user = _context.User.Find(id);
            if (user == null) return BadRequest();

            foreach(var key in typeof(UserPostDTO).GetProperties())
            {
                var propertyName = key.Name;

                #pragma warning disable CS8602 // Dereference of a possibly null reference.

                var dto = userDTO.GetType().GetProperty(propertyName).GetValue(userDTO);
                user.GetType().GetProperty(propertyName).SetValue(user, dto);

                #pragma warning restore CS8602 // Dereference of a possibly null reference.
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("User")]
        public async Task<ActionResult<UserGetDTO>> PostUser(UserPostDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            var userGetDTO = _mapper.Map<UserGetDTO>(user);
            return CreatedAtAction("GetUser", new { id = user.ID }, userGetDTO);
        }

        [HttpDelete("User/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.User?.Any(e => e.ID == id)).GetValueOrDefault();
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddMinutes(30),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, User _user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires,
                Domain = "http://localhost:5173",
                Path = "/"
            };

            var refreshToken = new CookieHeaderValue("refreshToken", newRefreshToken.Token);

            Response.Headers.AccessControlAllowOrigin = "http://localhost";
            Response.Headers.AccessControlAllowCredentials = "true";
            Response.Headers.AccessControlAllowMethods = "GET, POST, PUT, PATCH, DELETE";
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            var user = _context.User.Find(_user.ID);

            if (user == null)
            {
                return;
            }

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;

            _context.SaveChanges();
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.ID.ToString()),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
            };

            foreach(var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }



            var token = new JwtSecurityToken(
              issuer: _config["Jwt:Issuer"],
              audience: _config["Jwt:Audience"],
              claims: claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User Authenticate(UserLoginDTO userDTO)
        {

            var user = _context.User.Where(e => e.EmailAddress.ToLower() == userDTO.EmailAddress.ToLower() && e.Password == userDTO.Password).FirstOrDefault();
            if (user == null) return null!;
            return user;
        }
    }
}
