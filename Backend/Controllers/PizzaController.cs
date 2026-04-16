using BoschPizza.Data;
using BoschPizza.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace BoschPizza.Controller;

[ApiController]
[Route("[controller]")]
[Authorize]
public class PizzaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PizzaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Pizza>>> GetAll()
    { 
        return await _context.Pizzas.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Pizza>> Get(int id)
    {
        var pizza = await _context.Pizzas.FindAsync(id);
        if (pizza is null) return NotFound();

        return pizza;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Pizza pizza)
    {
        // 👇 garante que o preço veio (opcional, mas recomendado)
        if (pizza.Price <= 0)
            return BadRequest("O preço deve ser maior que 0");

        _context.Pizzas.Add(pizza);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = pizza.Id }, pizza);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Pizza pizza)
    {
        if (id != pizza.Id) return BadRequest();

        var existe = await _context.Pizzas.FindAsync(id);
        if (existe is null) return NotFound();

        // 👇 atualiza TODOS os campos, incluindo preço
        existe.Name = pizza.Name;
        existe.IsGlutenFree = pizza.IsGlutenFree;
        existe.Price = pizza.Price;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var pizza = await _context.Pizzas.FindAsync(id);
        if (pizza is null) return NotFound();

        _context.Pizzas.Remove(pizza);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}