using BoschPizza.Data;
using BoschPizza.DTOs;
using BoschPizza.Models;
using BoschPizza.Service;

namespace BoschPizza.Services;

public class AuthService
{
    private readonly AppDbContext _context;


    private readonly TokenService _tokenService;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, TokenService tokenService, IConfiguration configuration)
    {
        _context = context;
        _tokenService = tokenService;
        _configuration = configuration;
    }
public string? Login(UserLogin login)
{
    var user = GetByUsername(login.Username);

    if (user == null)
        return null;

    var isValid = BCrypt.Net.BCrypt.Verify(login.Password, user.Password);

    if (!isValid)
        return null;

    return _tokenService.GenerateToken(
        user.Username,
        user.Id,
        user.IsAdmin,
        user.Nome,
        _configuration["Jwt:Key"]!,
        _configuration["Jwt:Issuer"]!,
        _configuration["Jwt:Audience"]!
    );
}
public UserLogin? GetByUsername(string username)
{
    return _context.UserLogins
        .FirstOrDefault(u => u.Username == username);
}
public bool Register(UserLogin user)
{
    if (UserExists(user.Username))
        return false;

    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

    CreateUser(user);
    return true;
}

    public bool UserExists(string username)
    {
        return _context.UserLogins
            .Any(u => u.Username == username);
    }

    public void CreateUser(UserLogin user)
    {
        _context.UserLogins.Add(user);
        _context.SaveChanges();
    }



public UserLogin? GetById(int id)
{
    return _context.UserLogins.Find(id);
}



}