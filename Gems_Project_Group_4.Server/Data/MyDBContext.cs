using Gems_Project_Group_4.Server.Models;
using System.Data.Entity;

namespace Gems_Project_Group_4.Server.Data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext() : base("Data Source=PSL-1R7BWZ2\\SQLEXPRESS;Initial Catalog=Account;Integrated Security=True;Encrypt=False;")
        {
        }

        public DbSet<Register> register { get; set; }
        public DbSet<Login> login { get; set; }
    }
}
