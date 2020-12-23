using EntitySignal.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using DungeonMutts.Models;

namespace EntitySignal.Controllers
{

    [ResponseCache(NoStore = true, Duration = 0)]
    public class SubscribeController : Controller
    {
        private APIContext _db;
        private EntitySignalSubscribe _entitySignal;

        public SubscribeController(
          APIContext context,
          EntitySignalSubscribe entitySignalSubscribe
          )
        {
            _db = context;
            _entitySignal = entitySignalSubscribe;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Game>> SubscribeToAllGames()
        {
            _entitySignal.Subscribe<Game>();

            return _db.Games.ToList();
        }

    }
}