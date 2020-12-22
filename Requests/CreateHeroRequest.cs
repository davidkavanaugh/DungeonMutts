using System.ComponentModel.DataAnnotations;
public class CreateHeroRequest
{
    public int UserId { get; set; }
    public int GameId { get; set; }
    public string HeroClass {get; set;}

}
