using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DwF.Models;

namespace DwF.Controllers
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

        // [HttpPost]
        // public async Task<ActionResult<Game>> PostGame([FromBody] NewGameRequest request)
        // {
        //     Console.WriteLine(request);
        //     User userDocument = _context.Users.FirstOrDefault(user => user.UserId == request.userId);
        //     Game newGame = new Game()
        //     {
        //         Creator = userDocument
        //     };
        //     _context.Games.Add(newGame);

        //     Player newPlayer = new Player()
        //     {
        //         User = userDocument,
        //         Game = newGame
        //     };
        //     _context.Players.Add(newPlayer);

        //     await _context.SaveChangesAsync();
        //     Console.WriteLine(newGame);
        //     Console.WriteLine(newGame.GameId);

        //     return CreatedAtAction("Task", new { id = newGame.GameId }, newGame);
        // }
        [HttpPost]
        public async Task<ActionResult> PostGame([FromBody] NewGameRequest request)
        {
            Console.WriteLine(request);
            User userDocument = _context.Users.FirstOrDefault(user => user.UserId == request.userId);
            Game newGame = new Game()
            {
                Creator = userDocument
            };
            await _context.Games.AddAsync(newGame);

            Player newPlayer = new Player()
            {
                User = userDocument,
                Game = newGame
            };
            await _context.Players.AddAsync(newPlayer);

            await _context.SaveChangesAsync();
            Console.WriteLine(newGame);
            Console.WriteLine(newGame.GameId);

            return CreatedAtAction("PostGame", new { id = newGame.GameId }, newGame);
        }
    }
}
