using Microsoft.EntityFrameworkCore;
using EntitySignal.Server.EFDbContext.Data;
using EntitySignal.Services;
namespace DungeonMutts.Models
{

    public class APIContext : EntitySignalDbContext
    {
        public APIContext(DbContextOptions<APIContext> options,
    EntitySignalDataProcess entitySignalDataProcess)
      : base(options, entitySignalDataProcess) { }
        public DbSet<Boss> Bosses { get; set; }
        public DbSet<Enemy> Enemies { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<User> Users { get; set; }


    }
}