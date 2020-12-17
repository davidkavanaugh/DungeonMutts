using System.ComponentModel.DataAnnotations;
public class LoginRequest
{
    [Required(ErrorMessage = "Not Found")]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }

}
