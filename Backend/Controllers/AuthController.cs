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
    public AuthController(IConfiguration configuration, TokenService tokenService)
    {
        //_ é como um this, para o nome não ficar igual
        _configuration = configuration;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login(UserLogin login)
    {
        if (login.Username != "admin" || login.Password != "1234") return Unauthorized(new { message = "usuário ou senha inválidos" });

        var key = _configuration["Jwt:Key"]!;
        var issuer = _configuration["Jwt:Issuer"]!;
        var audience = _configuration["Jwt:Audience"]!;

        var token = _tokenService.GenerateToken(login.Username, key, issuer, audience);

        return Ok(new { token });
    }
}