using System.Runtime.InteropServices;

namespace Gems_Project_Group_4.Server.Models
{
public class AssignmentDetails

    {

        public AssignmentDetails(int aid, string subject, string topic, string task, string aassign, int nss, int tns)

        {

            this.AId = aid;

            this.SubjectName = subject;

            this.TopicName = topic;

            this.Task = task;

            this.AutoAssign = aassign;

            this.NoOfStudentsSubmitted = nss;

            this.TotNoOfStudents = tns;

        }

        public int AId { get; set; }

        public string SubjectName { get; set; }

        public string TopicName { get; set; }

        public string Task { get; set; }

        public string AutoAssign { get; set; }

        public int NoOfStudentsSubmitted { get; set; }

        public int TotNoOfStudents { get; set; }

    }
}
