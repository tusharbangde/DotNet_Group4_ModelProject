namespace Gems_Project_Group_4.Server.Models
{
    public class Login
    {
        //public int Id { get; set; }
        public required string userType { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
