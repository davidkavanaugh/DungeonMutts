using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using DwF.Models;

namespace DwF.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private APIContext _context;

        public UsersController(ILogger<UsersController> logger, APIContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] RegistrationRequest request)
        {
            // If a User exists with provided username
            if (_context.Users.Any(u => u.Username == request.Username))
            {
                // error message
                ModelState.AddModelError("Username", "already in use!");
                string[] arr = { "already in use" };
                return Conflict(new { title = "Conflict", status = 409, errors = new { Username = arr } });
            };

            // Initializing a PasswordHasher object, providing our User class as its type
            PasswordHasher<RegistrationRequest> Hasher = new PasswordHasher<RegistrationRequest>();
            request.Password = Hasher.HashPassword(request, request.Password);

            // add new user to DB
            User newUser = new User()
            {
                Username = request.Username,
                Password = request.Password,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Task", new { id = newUser.UserId }, newUser);
        }
        [HttpPost("login")]
        public ActionResult<User> LoginUser([FromBody] LoginRequest userSubmission)
        {
            // If inital ModelState is valid, query for a user with provided username
            var userDocument = _context.Users.FirstOrDefault(u => u.Username == userSubmission.Username);
            // If no user exists with provided username
            if (userDocument == null)
            {
                return StatusCode(403);
            }

            // Initialize hasher object
            var hasher = new PasswordHasher<LoginRequest>();

            // verify provided password against hash stored in db
            var result = hasher.VerifyHashedPassword(userSubmission, userDocument.Password, userSubmission.Password);

            // result can be compared to 0 for failure
            if (result == 0)
            {
                return StatusCode(403);
            }

            return Ok(userDocument);
        }
    }
}
