using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Game
{
    [Key]
    public int GameId { get; set; }
    public int CreatorId { get; set; }
    public User Creator { get; set; }
    public string GameCode { get; set; }
    public string GameName { get; set; }
    public List<Hero> Heroes { get; set; } = new List<Hero>();
    public Level Level { get; set; }
    public string Message { get; set; } = "Level 1: Spring";
    public List<Player> Players { get; set; }
    public int TurnCounter { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Game()
    {
        Random random = new Random();
        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        string randomName = new string(Enumerable.Repeat(chars, 12)
          .Select(s => s[random.Next(s.Length)]).ToArray());

        GameCode = randomName;
    }
}