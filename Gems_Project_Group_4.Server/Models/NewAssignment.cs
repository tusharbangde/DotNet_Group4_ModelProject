namespace Gems_Project_Group_4.Server.Models
{
    public class NewAssignment
    {
        // public int id { get; set; }
        public string SubjectName { get; set; }
        public string Task { get; set; }
        public string TopicName { get; set; }

        public string AutoAssign { get; set; }

        public List<int> SIds { get; set; }

        //public string Student { get; set; }

        // public string Description { get; set; }

        // public string FileName { get; set; }
        public IFormFile FileData { get; set; }
        // public string OneDriveUrl { get; set; }


    }
}
