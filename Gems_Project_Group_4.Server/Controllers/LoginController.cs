using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(Login login)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("MyConn")))
            {
                SqlCommand command = new SqlCommand("SELECT Id FROM UserAccount WHERE Email = @Email AND Password = @Password AND userType = @userType", connection);
                command.Parameters.AddWithValue("@Email", login.Email);
                command.Parameters.AddWithValue("@Password", login.Password);
                command.Parameters.AddWithValue("@userType", login.userType);

                connection.Open();
                var userId = command.ExecuteScalar();

                if (userId != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Email", login.Email.ToString()),
                        new Claim("userType", login.userType.ToString()),
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(20),
                        signingCredentials: signIn
                    );

                    string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(new { UserId = userId, Token = jwtToken });
                }
                else
                {
                    return Problem("Invalid Credentials");
                }
            }
        }
    }
}