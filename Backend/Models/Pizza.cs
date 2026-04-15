// onde nossa classe esta organizada
namespace BoschPizza.Models;
public class Pizza
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsGlutenFree { get; set; }

    //novo campo (coluna)
    public decimal Price { get; set; }

    public DateTime DataCadastro { get; set; } = DateTime.Now;

}