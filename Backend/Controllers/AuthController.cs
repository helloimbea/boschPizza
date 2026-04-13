using BoschPizza.Data;
using BoschPizza.Models;
using BoschPizza.Service;
using Microsoft.AspNetCore.Mvc;

namespace BoschPizza.Controller;

[ApiController]

[Route("auth")]

public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly TokenService _tokenService;

    // metodo construtor
private readonly AppDbContext _context;

public AuthController(IConfiguration configuration, TokenService tokenService, AppDbContext context)
{
    _configuration = configuration;
    _tokenService = tokenService;
    _context = context;
}

[HttpPost("login")]
public IActionResult Login(UserLogin login)
{
    var user = _context.UserLogins
        .FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);

    if (user == null)
        return Unauthorized(new { message = "usuário ou senha inválidos" });

    var key = _configuration["Jwt:Key"]!;
    var issuer = _configuration["Jwt:Issuer"]!;
    var audience = _configuration["Jwt:Audience"]!;

    var token = _tokenService.GenerateToken(user.Username, key, issuer, audience);

    return Ok(new { token });
}

[HttpPost("register")]
public IActionResult Register(UserLogin user)
{
    var userExists = _context.UserLogins.Any(u => u.Username == user.Username);

    if (userExists)
        return BadRequest(new { message = "Usuário já existe" });

    // salva direto (sem hash)
    _context.UserLogins.Add(user);
    _context.SaveChanges();

    return Ok(new { message = "Usuário cadastrado com sucesso" });
}
}