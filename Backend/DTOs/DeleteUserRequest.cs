namespace BoschPizza.DTOs;

public class DeleteUserRequest
{
    public int Id { get; set; }
    public string Password { get; set; } = string.Empty;
}