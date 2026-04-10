using BoschPizza.Models;
using Microsoft.EntityFrameworkCore;
 
namespace BoschPizza.Data;
 
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
 
    public DbSet<Pizza> Pizzas { get; set; }

    public DbSet<UserLogin> UserLogins { get; set; }

    public DbSet<Cliente> Clientes { get; set; }

}