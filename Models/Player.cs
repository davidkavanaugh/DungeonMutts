using System;
using System.ComponentModel.DataAnnotations;

public class Player
{
    [Key]
    public int PlayerId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int GameId { get; set; }
    public Game Game { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}