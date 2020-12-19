using System;
using System.ComponentModel.DataAnnotations;

public class Hero
{
    [Key]
    public int HeroId { get; set; }
    public int Experience { get; set; } = 0;
    public int GameId { get; set; }
    public Game Game { get; set; }
    public int Health { get; set; } = 12;
    public int Level { get; set; } = 1;
    public int Mana { get; set; } = 12;
    public string Name { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}