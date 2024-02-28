namespace Gems_Project_Group_4.Server.Models
{
    public class AssignmentApproval
    {
        public AssignmentApproval(string subject, string topic, bool aassign, int nss, int tns, List<HomeworkPDA> homework)
        {
            this.SubjectName = subject;
            this.TopicName = topic;
            this.AutoAssign = aassign;
            this.NoOfStudentsSubmitted = nss;
            this.TotNoOfStudents = tns;
            this.homework = homework;
        }
        public string SubjectName { get; set; }
        public string TopicName { get; set; }
        public bool AutoAssign { get; set; }
        public int NoOfStudentsSubmitted { get; set; }
        public int TotNoOfStudents { get; set; }
        public List<HomeworkPDA> homework { get; set; }
    }
}
