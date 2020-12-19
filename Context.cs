using Microsoft.EntityFrameworkCore;
namespace DwF.Models
{

    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions options) : base(options) { }
        public DbSet<Game> Games { get; set; }
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<User> Users { get; set; }


    }
}