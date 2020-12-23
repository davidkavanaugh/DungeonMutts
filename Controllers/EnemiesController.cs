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
    public class EnemiesController : ControllerBase
    {
        private readonly ILogger<EnemiesController> _logger;
        private APIContext _context;

        public EnemiesController(ILogger<EnemiesController> logger, APIContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("{enemyId}/attack")]
        public async Task<ActionResult> AttackPlayer([FromBody] EnemyAttackRequest request, int enemyId)
        {
            Hero heroDocument = _context.Heroes
            .Include(hero => hero.User)
            .FirstOrDefault(hero => hero.HeroId == request.TargetId);

            ActionResponse response = new ActionResponse();
            if (request.EnemyType == "enemy")
            {
                Enemy enemyDocument = _context.Enemies
                .FirstOrDefault(enemy => enemy.EnemyId == enemyId);
                response = enemyDocument.Attack(request.LevelNumber, heroDocument.User.Username);

            }

            if (request.EnemyType == "boss")
            {
                Boss bossDocument = _context.Bosses
                .FirstOrDefault(boss => boss.BossId == enemyId);
                response = bossDocument.Attack(request.LevelNumber, heroDocument.User.Username);
            }

            heroDocument.Health -= response.Amount;

            Game gameDocument = _context.Games
            .FirstOrDefault(game => game.GameId == request.GameId);
            gameDocument.Message = response.Message;
            if (heroDocument.Health <= 0)
            {
                gameDocument.Message = $"{heroDocument.User.Username} has died";
            }
            gameDocument.TurnCounter = 0;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
