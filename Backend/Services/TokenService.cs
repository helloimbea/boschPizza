using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BoschPizza.Service;

public class TokenService
{
    public string GenerateToken(string username, string key, string issuer, string audience)
    {
        var claims = new[]
        {
            //armazena o nome do usuario dentro do token
            new Claim(ClaimTypes.Name, username)
        };

        //criar a chave de segurança com base no segredo configurado no servidor
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

        //definir a credencial de assinatura usando algoritimo HMAC SHA256
        var credencial = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //cria o token jwt com emissor audiencia claims expiração e assinatura
        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credencial

        );

        //converte o objeto token em string para ser enviada ao cliente
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}