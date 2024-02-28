namespace Gems_Project_Group_4.Server.Models
{
    public class HomeworkPDA
    {
        public HomeworkPDA(int sid, string sname, string status, byte[] fd)
        {
            this.SId = sid;
            this.Sname = sname;
            this.Status = status;
            this.FileData = fd;
        }
        public int SId { get; set; }
        public string Sname { get; set; }
        public string Status { get; set; }
        public byte[] FileData { get; set; }
    }
}
