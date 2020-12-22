using System;
using System.ComponentModel.DataAnnotations;

public class Enemy
{
    [Key]
    public int EnemyId { get; set; }
    public string Name { get; set; }
    public int Health { get; set; }
    public int HealthCapacity { get; set; }
    public string ImgSrc { get; set; }
    public int LevelId { get; set; }
    public Level Level { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Enemy(string name, int health, string imgSrc)
    {
        Name = name;
        Health = health;
        HealthCapacity = health;
        ImgSrc = imgSrc;
    }
}