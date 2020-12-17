using System.ComponentModel.DataAnnotations;

public class RegistrationRequest
{
    [Required(ErrorMessage = "Required")]
    [MinLength(2, ErrorMessage = "too short")]
    public string Username { get; set; }

    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Required")]
    [MinLength(8, ErrorMessage = "too short")]
    public string Password { get; set; }
    [Compare("Password", ErrorMessage = "must match")]
    [DataType(DataType.Password)]
    public string Confirm { get; set; }
}