using BoschPizza.Models;

namespace BoschPizza.Service;

public static class PizzaService{
    
    static List<Pizza> Pizzas { get; }
    static int nextId = 3; // controla a proxma pizza que vo ta adicionando

//metodo construtor
    static PizzaService()
    {
        Pizzas = new List<Pizza>
        {
          new Pizza { Id = 1, Name = "Calabresa", IsGlutenFree = false },
          new Pizza { Id = 2, Name = "Salmão", IsGlutenFree = true },
        };
    }

    public static List<Pizza> GetAll() => Pizzas;

    //busca pizza por id
    public static Pizza? Get(int id) => Pizzas.FirstOrDefault(p => p.Id == id);

    //adicionar nova pizza
    public static void Add(Pizza pizza)
    {
        pizza.Id = nextId++;
        Pizzas.Add(pizza);
    }

    //delete
    public static void Delete(int id)
    {
        var pizza = Get(id);
        if(pizza is null) return;
        Pizzas.Remove(pizza);
    }

    //update

    public static void Update(Pizza pizza)
    {
        var index = Pizzas.FindIndex(p => p.Id == pizza.Id);
        if(index == -1) return;
        Pizzas[index] = pizza;
    }
}