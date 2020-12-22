using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;


public class Hero : IHero
{
    [Key]
    public int HeroId { get; set; }
    public string HeroClass { get; set; }
    public int GameId { get; set; }
    public Game Game { get; set; }
    public int Health { get; set; } = 12;
    public int Mana { get; set; } = 12;
    public int UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ActionResponse Attack(int level, string username)
    {
        int dmg = 0;
        string msg = $"{username} misses";
        Random random = new Random();
        int roll = random.Next(7);
        if (roll != 0)
        {
            if (HeroClass == "dalmation")
            {
                dmg = roll + level + 2;
            }
            if (HeroClass == "poodle")
            {
                dmg = roll + level;
            }
            if (HeroClass == "greyhound")
            {
                dmg = roll + level;
            }
            if (HeroClass == "dachshund")
            {
                dmg = roll + level + 1;
            }
            msg = $"{username} attacks for {dmg} damage";
        }
        ActionResponse result = new ActionResponse()
        {
            Amount = dmg,
            Message = msg
        };
        return result;
    }

    public string Spell()
    {
        string response = "";
        if (HeroClass == "Dalmation")
        {
            response = "Dalmation casts spell";
        }
        if (HeroClass == "Poodle")
        {
            response = "Poodle casts spell";
        }
        if (HeroClass == "Greyhound")
        {
            response = "Greyhound casts spell";
        }
        if (HeroClass == "Dachshund")
        {
            response = "Dachshund casts spell";
        }
        return response;
    }

    public string Heal()
    {
        string response = "";
        if (HeroClass == "Dalmation")
        {
            response = "Dalmation heals";
        }
        if (HeroClass == "Poodle")
        {
            response = "Poodle heals";
        }
        if (HeroClass == "Greyhound")
        {
            response = "Greyhound heals";
        }
        if (HeroClass == "Dachshund")
        {
            response = "Dachshund heals";
        }
        return response;
    }
}