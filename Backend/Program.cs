//Importa o contexto do banco de dados
using BoschPizza.Data;
 
//import o servico de geração do Token
using BoschPizza.Service;
 
//Importa recursos do Entity Framework Core
using Microsoft.EntityFrameworkCore;
 
//Importa recursos de autenticação do JWT
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
 
using Microsoft.OpenApi.Models;
//Cria o build da aplicacao
//Auxilia na configuração dos servicos e recursos do projeto
var builder = WebApplication.CreateBuilder(args);
 
// Add services to the container.
 
// Adiciona suporte a controllers
// Isso ajuda para que a API reconheça a classe controllers como ponto de entrada
builder.Services.AddControllers();
 
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
 
// Adiciona suporte à exploração dos endpoints da API
// Ajuda ferramentas de documentação a identificar as rotas disponíveis
builder.Services.AddEndpointsApiExplorer();
 
// Adiciona a geração da documentação Swagger/OpenAPI
builder.Services.AddSwaggerGen(options =>
{
  options.SwaggerDoc("v1", new OpenApiInfo
   {
      Title = "Bosch Pizza API",
      Version = "v1"
   });
 
   // 🔐 Definição do esquema de segurança (JWT)
   options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
   {
      Name = "Authorization",
      Type = SecuritySchemeType.Http,
      Scheme = "bearer",
      BearerFormat = "JWT",
      In = ParameterLocation.Header,
      Description = "Digite: Bearer {seu token}"
   });
 
   // Aplicar segurança global
  options.AddSecurityRequirement(new OpenApiSecurityRequirement
   {
       {
          new OpenApiSecurityScheme
          {
              Reference = new OpenApiReference
              {
                   Type = ReferenceType.SecurityScheme,
                   Id = "Bearer"
              }
          },
          new string[] {}
       }
   });
});
 
 
//Obter a string de conexao do appsetings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
 
// Registrar o AppDbContext usando MySQL
builder.Services.AddDbContext<AppDbContext>(Options => Options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
 
// Registra o TokenSercice para injeção de dependencias
builder.Services.AddScoped<TokenService>();
 
// Le a chave JWT do aquivo de configuração
var jwtKey = builder.Configuration["Jwt:Key"];
 
// Configuração autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
        };
    }
);
 
// Adiciona a autorização
builder.Services.AddAuthorization();
 
var app = builder.Build();
 
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //Ativa o swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
//redireciona o HTTPS
app.UseHttpsRedirection();
 
// Ativa a autenticação
app.UseAuthorization();
 
// Mapeia os controllers
app.MapControllers();
 
// Inicia a aplicação
app.Run();