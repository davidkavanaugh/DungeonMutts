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
    }
}
