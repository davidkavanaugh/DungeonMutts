using Microsoft.EntityFrameworkCore;
namespace DungeonMutts.Models
{

    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions options) : base(options) { }
        public DbSet<Boss> Bosses { get; set; }
        public DbSet<Enemy> Enemies { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<User> Users { get; set; }


    }
}