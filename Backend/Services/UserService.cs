using BoschPizza.Data;
using BoschPizza.DTOs;
using BoschPizza.Models;
using BoschPizza.Service;

namespace BoschPizza.Services;

public class UserService
{
    private readonly AppDbContext _context;
    public UserService(AppDbContext context)
    {
        _context = context;
    }

public UserLogin? GetById(int id)
{
    return _context.UserLogins.Find(id);
}



public void DeleteUserById(int id)
{
    var user = GetById(id);

    if (user != null)
    {
        _context.UserLogins.Remove(user);
        _context.SaveChanges();
    }
}

    public List<UserLogin> GetUsers()
    {
        return _context.UserLogins.ToList();
    }
    

    public (bool success, int statusCode, string message) RemoveUser(DeleteUserRequest request, int adminId)
{
    var admin = GetById(adminId);

    if (admin == null)
        return (false, 401, "Admin não encontrado");

    var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, admin.Password);

    if (!isPasswordValid)
        return (false, 401, "Senha incorreta");

    var user = GetById(request.Id);

    if (user == null)
        return (false, 404, "Usuário não encontrado");

    DeleteUserById(user.Id);

    return (true, 200, "");
}
}