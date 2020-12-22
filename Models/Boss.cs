using System;
using System.ComponentModel.DataAnnotations;

public class Boss
{
    [Key]
    public int BossId { get; set; }
    public string Name { get; set; }
    public int Health { get; set; }
    public int LevelId { get; set; }
    public Level Level { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}