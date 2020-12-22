using System.ComponentModel.DataAnnotations;
public class ActionRequest
{
    public int TargetId { get; set; }
    public string TargetType { get; set; }
    public int LevelNumber { get; set; }
    public int GameId { get; set; }
}
