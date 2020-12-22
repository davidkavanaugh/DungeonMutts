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
    public class HeroesController : ControllerBase
    {
        private readonly ILogger<HeroesController> _logger;
        private APIContext _context;

        public HeroesController(ILogger<HeroesController> logger, APIContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> PostHero([FromBody] CreateHeroRequest request)
        {
            Game gameDocument = _context.Games.Include(game => game.Heroes).FirstOrDefault(game => game.GameId == request.GameId);
            User userDocument = _context.Users.FirstOrDefault(user => user.UserId == request.UserId);
            Hero newHero = new Hero()
            {
                HeroClass = request.HeroClass,
                Game = gameDocument,
                User = userDocument
            };
            _context.Heroes.Add(newHero);

            gameDocument.Heroes.Add(newHero);

            Player newPlayer = new Player()
            {
                User = userDocument,
                Game = gameDocument
            };
            _context.Players.Add(newPlayer);

            await _context.SaveChangesAsync();
            return CreatedAtAction("PostHero", new { id = newHero.HeroId }, newHero);

        }
        [HttpPost("{heroId}/attack")]
        public async Task<ActionResult> Attack([FromBody] ActionRequest request, int heroId)
        {
            Hero heroDocument = _context.Heroes
            .Include(hero => hero.User)
            .FirstOrDefault(hero => hero.HeroId == heroId);

            ActionResponse response = heroDocument.Attack(request.LevelNumber, heroDocument.User.Username);
            if (request.TargetType == "enemy")
            {
                Enemy enemyDocument = _context.Enemies.FirstOrDefault(enemy => enemy.EnemyId == request.TargetId);
                enemyDocument.Health -= response.Amount;
            }
            if (request.TargetType == "boss")
            {
                Boss bossDocument = _context.Bosses.FirstOrDefault(boss => boss.BossId == request.TargetId);
                bossDocument.Health -= response.Amount;
            }

            Game gameDocument = _context.Games
            .Include(game => game.Players)
            .FirstOrDefault(game => game.GameId == request.GameId);
            gameDocument.Message = response.Message;
            gameDocument.TurnCounter++;

            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("{heroId}/spell")]
        public async Task<ActionResult> Spell([FromBody] ActionRequest request, int heroId)
        {
            Hero heroDocument = _context.Heroes
            .Include(hero => hero.User)
            .FirstOrDefault(hero => hero.HeroId == heroId);

            heroDocument.Mana -= 3;

            ActionResponse response = heroDocument.Spell(request.LevelNumber, heroDocument.User.Username);
            if (request.TargetType == "enemy")
            {
                Enemy enemyDocument = _context.Enemies.FirstOrDefault(enemy => enemy.EnemyId == request.TargetId);
                enemyDocument.Health -= response.Amount;
            }
            if (request.TargetType == "boss")
            {
                Boss bossDocument = _context.Bosses.FirstOrDefault(boss => boss.BossId == request.TargetId);
                bossDocument.Health -= response.Amount;
            }

            Game gameDocument = _context.Games
            .Include(game => game.Players)
            .FirstOrDefault(game => game.GameId == request.GameId);
            gameDocument.Message = response.Message;
            gameDocument.TurnCounter++;

            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("{heroId}/heal")]
        public async Task<ActionResult> Heal([FromBody] ActionRequest request, int heroId)
        {
            Hero heroDocument = _context.Heroes
            .Include(hero => hero.User)
            .FirstOrDefault(hero => hero.HeroId == heroId);

            heroDocument.Mana -= 3;

            Hero target = _context.Heroes
            .Include(hero => hero.User)
            .FirstOrDefault(hero => hero.HeroId == request.TargetId);

            ActionResponse response = heroDocument.Heal(request.LevelNumber, heroDocument.User.Username, target.User.Username);

            target.Health += response.Amount;

            Game gameDocument = _context.Games
            .Include(game => game.Players)
            .FirstOrDefault(game => game.GameId == request.GameId);

            gameDocument.Message = response.Message;
            gameDocument.TurnCounter++;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
