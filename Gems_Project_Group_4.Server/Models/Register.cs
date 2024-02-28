using System.ComponentModel.DataAnnotations;

namespace Gems_Project_Group_4.Server.Models
{
    public class Register
    {
        //public int ID { get; set; }
        public string Name { get; set; }
        public string userType { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
