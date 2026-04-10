using BoschPizza.Data;
using BoschPizza.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc; //core do aspnet importa para criacao de apis

namespace BoschPizza.Controller;


[ApiController]

[Route("[controller]")]
[Authorize]

public class ClienteController : ControllerBase
{

    private readonly AppDbContext _context;

    public ClienteController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<List<Cliente>>> GetAll()
    { 
        return await _context.Clientes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cliente>> Get(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);

        if(cliente is null) return NotFound();

        return cliente;
    }

    [HttpPost]

    public async Task<IActionResult> Create(Cliente cliente)
    {
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new {id=cliente.Id}, cliente);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> Update(int id, Cliente cliente)
    {
        if(id != cliente.Id) return BadRequest();

        var existe = await _context.Clientes.FindAsync(id);

        if(existe is null) return NotFound();

        existe.Nome = cliente.Nome;
        existe.Endereco = cliente.Endereco;
        existe.Telefone = cliente.Telefone;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if(cliente is null) return NotFound();

        _context.Clientes.Remove(cliente);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

