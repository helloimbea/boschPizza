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

[Route("user")]

public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    // metodo construtor
public UsersController(
    UserService userService)
{
    _userService = userService;
}

[Authorize(Roles = "Admin")]
[HttpGet("users")]
public IActionResult GetUsers()
{
    var users = _userService.GetUsers()
        .Select(u => new {
            u.Id,
            u.Username,
            u.Nome,
            u.IsAdmin
        });

    return Ok(users);
}

[Authorize(Roles = "Admin")]
[HttpPost("users/delete")]
public IActionResult DeleteUser(DeleteUserRequest request)
{
    var adminId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

    var result = _userService.RemoveUser(request, adminId);

    if (!result.success)
        return StatusCode(result.statusCode, new { message = result.message });

    return Ok(new { message = "Usuário deletado com sucesso" });
}
}