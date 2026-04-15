using BoschPizza.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoschPizza.Controller;

[ApiController]
[Route("dashboard")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var totalPizzas = await _context.Pizzas.CountAsync();
        var totalClientes = await _context.Clientes.CountAsync();

        var ultimaPizza = await _context.Pizzas
            .OrderByDescending(p => p.Id)
            .FirstOrDefaultAsync();

        var clientes = await _context.Clientes.ToListAsync();

        var clientesPorMes = await _context.Clientes
            .GroupBy(c => c.DataCadastro.Month)
            .Select(g => new {
                Mes = g.Key,
                Quantidade = g.Count()
            })
            .ToListAsync();

        return Ok(new {
            totalPizzas,
            totalClientes,
            ultimaPizza,
            clientesPorMes
        });
    }
}