using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public string register(Register register)
        {

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("MyConn")))
            {
                SqlCommand cmd = new SqlCommand("INSERT INTO UserAccount (Name,userType,Password,Email,PhoneNumber ) VALUES('" + register.Name + "','" +
            register.userType + "','" + register.Password + "','" + register.Email + "','" + register.PhoneNumber + "')", connection);

                connection.Open();

                int i = cmd.ExecuteNonQuery();

                connection.Close();

                if (i > 0)

                {
                    return "Data inserted";
                }

                else
                {
                    return "Error";
                }
            }

            
        }
    }
}
