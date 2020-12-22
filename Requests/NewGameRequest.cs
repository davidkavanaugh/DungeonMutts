using System.ComponentModel.DataAnnotations;
public class NewGameRequest
{
    public int UserId { get; set; }
    [MinLength(1, ErrorMessage = "Too Short")]
    [MaxLength(20, ErrorMessage = "Too Long")]
    public string GameName { get; set; }

}
