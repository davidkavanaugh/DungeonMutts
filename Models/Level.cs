using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Level
{
    [Key]
    public int LevelId { get; set; }
    public int Number { get; set; } = 1;
    public List<Enemy> Enemies { get; set; }
    public Boss Boss { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}