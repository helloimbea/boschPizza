using BoschPizza.Data;
using BoschPizza.DTOs;
using BoschPizza.Models;
using BoschPizza.Service;
using BoschPizza.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BoschPizza.Controller;


[ApiController]

[Route("auth")]

public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    // metodo construtor
public AuthController(
    AuthService authService)
{
    _authService = authService;
}

[HttpPost("login")]
public IActionResult Login(UserLogin login)
{
    var token = _authService.Login(login);

    if (token == null)
        return Unauthorized(new { message = "usuário ou senha inválidos" });

    return Ok(new { token });
}

[HttpPost("register")]
public IActionResult Register(UserLogin user)
{
    var result = _authService.Register(user);

    if (!result)
        return BadRequest(new { message = "Usuário já existe" });

    return Ok(new { message = "Usuário cadastrado com sucesso" });
}

}