using Azure.Messaging;
using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Net;
using System.Reflection.PortableExecutable;

namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        public IConfiguration config;

        public ProfileController(IConfiguration configuration)
        {
            config = configuration;
        }

        [HttpGet]
        [Route("profile")]
        public string profile(int id, string usertype)
        { 
             SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            
                string query = "select Id,userType,Name,Email,PhoneNumber from UserAccount where Id = @UserId and userType = @UserType";

                SqlCommand command = new SqlCommand(query, conn);
                command.Parameters.AddWithValue("@UserId", id);
                command.Parameters.AddWithValue("@UserType", usertype);

                conn.Open();

                SqlDataReader reader = command.ExecuteReader();

            if (reader.Read())
            {
                string ids = reader["Id"].ToString();
                string utype = reader["userType"].ToString();
                string name = reader["Name"].ToString();
                string email = reader["Email"].ToString();
                string phoneNumber = reader["PhoneNumber"].ToString();
                string user = $"{ids},\n{utype},\n{name}, \n{email}, \n{phoneNumber}";
                return user;
            }
            else
            {
                return "User not found";
            }
        }
    }
}
