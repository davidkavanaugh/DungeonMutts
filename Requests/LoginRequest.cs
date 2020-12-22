using System.ComponentModel.DataAnnotations;
public class LoginRequest
{
    [Required(ErrorMessage = "Invalid Username/Password")]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }

}
