using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PusherServer;
using DungeonMutts.Models;

namespace DungeonMutts.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnemiesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EnemiesController> _logger;
        private APIContext _context;

        public EnemiesController(ILogger<EnemiesController> logger, APIContext context, IConfiguration config)
        {
            _config = config;
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

            string APP_CLUSTER = _config.GetValue<string>("PUSHER_APP_CLUSTER");
            string APP_ID = _config.GetValue<string>("PUSHER_APP_ID");
            string APP_KEY = _config.GetValue<string>("PUSHER_APP_KEY");
            string APP_SECRET = _config.GetValue<string>("PUSHER_APP_SECRET");

            var options = new PusherOptions();
            options.Cluster = APP_CLUSTER;

            var pusher = new Pusher(APP_ID, APP_KEY, APP_SECRET, options);
            var result = await pusher.TriggerAsync("my-channel", "my-event", new { message = "reading game" });

            return Ok();
        }
    }
}
