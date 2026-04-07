using BoschPizza.Data;
using BoschPizza.Models;
using BoschPizza.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc; //core do aspnet importa para criacao de apis

namespace BoschPizza.Controller;


//indica que essa classe é um controlelr da API
[ApiController]

//definir a rota base do controller
// [controller] sera substituido por "pizza" porque o nome base é PizzaController convenção
[Route("[controller]")]
[Authorize]

public class PizzaController : ControllerBase
{

    private readonly AppDbContext _context;

    public PizzaController(AppDbContext context)
    {
        _context = context;
    }
    // mapeamento requisições HTTP GET para /pizza
    [HttpGet]
    // retorna a lista completa de pizzas usando o service
    public async Task<ActionResult<List<Pizza>>> GetAll()
    { 
        return await _context.Pizzas.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Pizza>> Get(int id)
    {
        //busca a pizza peço id
        var pizza = await _context.Pizzas.FindAsync(id);

        //se não encontrar, retorna um erro (404 not found)
        if(pizza is null) return NotFound();

        //se encontrar retorna a pizza
        return pizza;
    }

    [HttpPost]
    //grava nova pizza
    // I interface
    public async Task<IActionResult> Create(Pizza pizza)
    {
        _context.Pizzas.Add(pizza);
        await _context.SaveChangesAsync();

        // retorna status 201 created
        //tambem informa qual ação pode recuperar o item criado
        return CreatedAtAction(nameof(Get), new {id=pizza.Id}, pizza);
    }

    //mapeia as requisiscoes http put para pizza/id
    [HttpPut("{id}")]

    public async Task<IActionResult> Update(int id, Pizza pizza)
    {
        //verifica se o id da url é diferente do id enviado no corpo
        if(id != pizza.Id) return BadRequest();

        // verifica se a pizza existe
        var existe = await _context.Pizzas.FindAsync(id);

        //se nao existir retorna 404 not foud
        if(existe is null) return NotFound();

        //atualiza a pizza
        existe.Name = pizza.Name;
        existe.IsGlutenFree = pizza.IsGlutenFree;
        await _context.SaveChangesAsync();

        //retorna 204 no content indicando que a atualização foi realizada
        return NoContent();
    }

    //mapeia requisicoes http delete para /pizza/id
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        //buscar a pizza antes de excluir
        var pizza = await _context.Pizzas.FindAsync(id);
        //se não existir retorna 404
        if(pizza is null) return NotFound();

        //removo a pizza se existeir
        _context.Pizzas.Remove(pizza);
        await _context.SaveChangesAsync();

        // retorna 204 No Content
        return NoContent();
    }
}

