using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    // public List<Player> Games { get; set; }
    // public List<Hero> Heroes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}