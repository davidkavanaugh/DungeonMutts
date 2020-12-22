using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DungeonMutts.Models;

namespace DungeonMutts.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly ILogger<GamesController> _logger;
        private APIContext _context;

        public GamesController(ILogger<GamesController> logger, APIContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> PostGame([FromBody] NewGameRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Enemy> level1Enemies = new List<Enemy>();
            level1Enemies.Add(new Enemy()
            {
                Name = "Ram",
                Health = 13
            });

            level1Enemies.Add(new Enemy()
            {
                Name = "Bull",
                Health = 14
            });

            Boss level1Boss = new Boss()
            {
                Name = "Castor & Pollux",
                Health = 15
            };

            Level level1 = new Level()
            {
                Enemies = level1Enemies,
                Boss = level1Boss
            };

            User userDocument = _context.Users.FirstOrDefault(user => user.UserId == request.UserId);
            Game newGame = new Game()
            {
                Creator = userDocument,
                GameName = request.GameName,
                Level = level1

            };
            await _context.Games.AddAsync(newGame);

            await _context.SaveChangesAsync();

            return CreatedAtAction("PostGame", new { id = newGame.GameId }, newGame);
        }
    }
}
