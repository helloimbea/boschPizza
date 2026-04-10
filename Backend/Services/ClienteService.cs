using BoschPizza.Models;

namespace BoschPizza.Service;

public static class ClienteService{
    
    static List<Cliente> Clientes { get; }
    static int nextId = 3; 

//metodo construtor
    static ClienteService()
    {
        Clientes = new List<Cliente>
        {

        };
    }

    public static List<Cliente> GetAll() => Clientes;

    public static Cliente? Get(int id) => Clientes.FirstOrDefault(p => p.Id == id);

    public static void Add(Cliente cliente)
    {
        cliente.Id = nextId++;
        Clientes.Add(cliente);
    }

    //delete
    public static void Delete(int id)
    {
        var cliente = Get(id);
        if(cliente is null) return;
        Clientes.Remove(cliente);
    }

    //update

    public static void Update(Cliente cliente)
    {
        var index = Clientes.FindIndex(p => p.Id == cliente.Id);
        if(index == -1) return;
        Clientes[index] = cliente;
    }
}