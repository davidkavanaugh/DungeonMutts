using System;
using System.ComponentModel.DataAnnotations;

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

    public string Attack()
    {
        string response = "";
        if (HeroClass == "Dalmation")
        {
            response = "Dalmation attacks";
        }
        if (HeroClass == "Poodle")
        {
            response = "Poodle attacks";
        }
        if (HeroClass == "Greyhound")
        {
            response = "Greyhound attacks";
        }
        if (HeroClass == "Dachshund")
        {
            response = "Dachshund attacks";
        }
        return response;
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