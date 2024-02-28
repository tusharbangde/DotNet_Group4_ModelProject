/*using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Data.Entity;
using Gems_Project_Group_4.Server.Data;



namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JWTTokenController : ControllerBase
    {
        public IConfiguration _configuration;
        public MyDBContext _context;
        public JWTTokenController(IConfiguration configuration, MyDBContext dbContext)
        {
            _configuration = configuration;
            _context = dbContext;
        }
        [HttpPost]
        public async Task<IActionResult> Post(Login login)
        {
            if (login != null && login.Email != null && login.Password != null && login.userType != null)
            {
                var userData = await GetLogin(login.Email, login.Password, login.userType);

                if (userData != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                        new Claim("Email",login.Email.ToString()),
                        new Claim("userType",login.userType.ToString()),
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

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid Credentials");
                }
            }
            else
            {
                return BadRequest("Invalid Credentials");
            }
        }
        [HttpGet]
        public async Task<Login> GetLogin(string email, string password, string usertype)
        {
            return await _context.login.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.userType == usertype);
        }
    }
}
*/