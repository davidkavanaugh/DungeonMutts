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
            _context = context;
            _logger = logger;
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
                name: "Twins",
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
        [HttpDelete("{gameId}")]
        public ActionResult DeleteGame(int gameId)
        {
            Game gameDocument = _context.Games
            .FirstOrDefault(game => game.GameId == gameId);

            _context.Games.Remove(gameDocument);
            _context.SaveChanges();
            return StatusCode(204);
        }
        [HttpPost("{gameCode}")]
        public ActionResult GameByCode(string gameCode)
        {
            Game gameDocument = _context.Games.FirstOrDefault(game => game.GameCode == gameCode);

            return Ok(gameDocument);
        }
        [HttpPost("{gameId}/levels")]
        public async Task<ActionResult> NextLevel([FromBody] NextLevelRequest request, int gameId)
        {
            List<List<string>> enemyNames = new List<List<string>>();

            List<string> level1Enemies = new List<string>();
            level1Enemies.Add("Ram");
            level1Enemies.Add("Bull");
            level1Enemies.Add("Twins");

            List<string> level2Enemies = new List<string>();
            level2Enemies.Add("Crab");
            level2Enemies.Add("Lion");
            level2Enemies.Add("Bear");

            List<string> level3Enemies = new List<string>();
            level3Enemies.Add("Raven");
            level3Enemies.Add("Scorpion");
            level3Enemies.Add("Centaur");

            List<string> level4Enemies = new List<string>();
            level4Enemies.Add("Goat");
            level4Enemies.Add("Dolphin");
            level4Enemies.Add("Fish");

            enemyNames.Add(level1Enemies);
            enemyNames.Add(level2Enemies);
            enemyNames.Add(level3Enemies);
            enemyNames.Add(level4Enemies);

            List<Enemy> levelEnemies = new List<Enemy>();
            levelEnemies.Add(new Enemy(
                name: enemyNames[request.LevelNumber - 1][0],
                health: request.LevelNumber + 12,
                imgSrc: $"{enemyNames[request.LevelNumber - 1][0].ToLower()}.png"
            ));

            levelEnemies.Add(new Enemy(
                name: enemyNames[request.LevelNumber - 1][1],
                health: request.LevelNumber + 13,
                imgSrc: $"{enemyNames[request.LevelNumber - 1][1].ToLower()}.png"
            ));

            Boss levelBoss = new Boss(
                name: enemyNames[request.LevelNumber - 1][2],
                health: request.LevelNumber + 14,
                imgSrc: $"{enemyNames[request.LevelNumber - 1][2].ToLower()}.png"
            );

            Level newLevel = new Level()
            {
                Enemies = levelEnemies,
                Boss = levelBoss,
                Number = request.LevelNumber
            };

            Game gameDocument = _context.Games.FirstOrDefault(game => game.GameId == gameId);
            gameDocument.Level = newLevel;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
