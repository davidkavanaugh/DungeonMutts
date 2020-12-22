using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
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
            level1Enemies.Add(new Enemy(
                name: "Ram",
                health: 13,
                imgSrc: "ram.png"
            ));

            level1Enemies.Add(new Enemy(
                name: "Bull",
                health: 14,
                imgSrc: "bull.png"
            ));

            Boss level1Boss = new Boss(
                name: "Castor & Pollux",
                health: 15,
                imgSrc: "twins.png"
            );

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
        [HttpGet("{gameId}")]
        public ActionResult GetGame(int gameId)
        {
            Game gameDocument = _context.Games
            .Include(game => game.Level)
                .ThenInclude(level => level.Enemies)
            .Include(game => game.Level)
                .ThenInclude(level => level.Boss)
            .Include(game => game.Heroes)
                .ThenInclude(hero => hero.User)
            .FirstOrDefault(game => game.GameId == gameId);
            return CreatedAtAction("GetGame", new { id = gameDocument.GameId }, gameDocument);
        }
        [HttpPost("{gameCode}")]
        public ActionResult GameByCode(string gameCode)
        {
            Game gameDocument = _context.Games.FirstOrDefault(game => game.GameCode == gameCode);

            return Ok(gameDocument);
        }
    }
}
