using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Net;
using System.Security.Policy;
using System.Text;
using System.Web.Helpers;
//using System.Web.Http;

namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        public IConfiguration config;

        public AssignmentController(IConfiguration configuration)
        {
            config = configuration;
        }

        [HttpGet]
        [Route("studentsList")]
        public Dictionary<string,string> studentList()
        {
            SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString());

            conn.Open();

            Dictionary<string, string> list = new Dictionary<string, string>();

            string studentlist = "select ID,Name from UserAccount where userType='Student' ";

            SqlCommand cmd = new SqlCommand(studentlist, conn);

            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    string name = reader["name"].ToString();
                    string id = reader["id"].ToString();

                    list.Add(id, name);
                }
            }
            return list;
        }

        [HttpGet]
        [Route("assignments")]
        public List<Assignment> GetAssignments()
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                {
                    string query = "SELECT A_ID, TOPIC, SUBJECT,APPROVAL,TASK,FILE_ASSIGNMENT FROM ASSIGNMENT"; // Adjust SQL query as needed
                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
 
                    List<Assignment> assignments = new List<Assignment>();
                    while (reader.Read())
                    {
                        Assignment assignment = new Assignment();
                        //assignment.A_ID = Convert.ToInt32(reader["AssignmentId"]);
                        assignment.TOPIC = reader["Topic"].ToString();
                        assignment.SUBJECT = reader["Subject"].ToString();
                        assignment.APPROVAL = reader["Approval"].ToString();
                        assignment.TASK = reader["Task"].ToString();
                        /*assignment.FILE_ASSIGNMENT = (byte[])reader["FILE_ASSIGNMENT"];*/
                        
                        assignments.Add(assignment);

                        Console.WriteLine(assignment.FILE_ASSIGNMENT);
                    }
 
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    response.Content = new StringContent(JsonConvert.SerializeObject(assignments), Encoding.UTF8, "application/json");
                    return assignments;
                }
            }
            catch (Exception ex)
            {
                /*return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message)
                };*/
                return null;
            }
        }

       
        //Submit Assignment
        [HttpPost]
        [Route("submitassignmentpdf")]
        public string InsertAssignment(NewAssignment model, int tid)
        {
            if (!ModelState.IsValid || model.FileData == null || model.FileData.Length == 0)
            {
                return "Bad Request or pdf is empty";
            }

            /*string student = GetStudent(model.SId);

            if (string.IsNullOrEmpty(student)) 
            {
                return "Student not found";
            }*/


            // string sd = $"{us.Id} : {us.Name}";
            SqlConnection con1 = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con1.Open();


            string q = "insert into Assignment(TOPIC,SUBJECT,APPROVAL,TASK,FILE_ASSIGNMENT,SELECTSTUDENT,TEACHER_ID) values (@topic,@subject,@approval,@task,@file,@student,@tid);";

            SqlCommand cmd = new SqlCommand(q, con1);

            List<string> studentdetails = new List<string>();

            string base64data;

            using (var memory = new MemoryStream())
            {
                model.FileData.CopyTo(memory);
                byte[] pdf = memory.ToArray();
                base64data = Convert.ToBase64String(pdf);
            }

            byte[] binarydata = Convert.FromBase64String(base64data);

            foreach (int sid in model.SIds)
            {
                SqlConnection con2 = new SqlConnection(config.GetConnectionString("MyConn").ToString());
                con2.Open();
                string selectq = "select ID from UserAccount where ID = @id AND userType = 'Student' ";
                SqlCommand cmd2 = new SqlCommand(selectq, con2);

                // string name="";

                cmd2.Parameters.AddWithValue("@id", sid);
                SqlDataReader sd = cmd2.ExecuteReader();

                if (sd.Read())
                {
                    int fetchid = sd.GetInt32(0);
                    //string fetchname = sd.GetString(1);

                    string det = $"{fetchid}";
                    if (!string.IsNullOrEmpty(det))
                    {
                        studentdetails.Add(det);
                    }
                }
                // con.Close();
            }
            string student = string.Join(",", studentdetails);
            cmd.Parameters.AddWithValue("@topic", model.TopicName);
            cmd.Parameters.AddWithValue("@subject", model.SubjectName);
            cmd.Parameters.AddWithValue("@approval", model.AutoAssign);
            cmd.Parameters.AddWithValue("@task", model.Task);
            cmd.Parameters.AddWithValue("@file", binarydata);
            cmd.Parameters.AddWithValue("@student", student);
            cmd.Parameters.AddWithValue("@tid", tid);

            //con.Open();
            int rows = cmd.ExecuteNonQuery();

            if(rows > 0)
            {
                int aid = GetAid();
                return CreateHomework(aid);
            }
            else
            {
                return "Not Assigned";
            }
        }




        //All Assignment Details
        [HttpPost]
        [Route("displayassignment")]
        public IActionResult DisplayAssignment(int tid)
        {
            List<AssignmentDetails> assignment = new List<AssignmentDetails>();
            using (SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
            {
                conn.Open();
                string q = $"select * from Assignment where Teacher_ID='{tid}';";
                try
                {
                    SqlCommand cmd = new SqlCommand(q, conn);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int aid;
                            int tot;
                            using (SqlConnection conn1 = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                            {
                                string q1 = $"select count(*) from HOMEWORK where A_ID='{reader[0]}' and STATUS<>'0';";
                                string q2 = $"select count(*) from HOMEWORK where A_ID='{reader[0]}';";

                                using (SqlCommand cmd1 = new SqlCommand(q1, conn1))
                                using (SqlCommand cmd2 = new SqlCommand(q2, conn1))
                                {
                                    conn1.Open();
                                    aid = (Int32)(cmd1.ExecuteScalar());
                                    tot = (Int32)(cmd2.ExecuteScalar());
                                }
                            }
                            assignment.Add(new AssignmentDetails((int)reader[0], reader[2].ToString(), reader[1].ToString(), reader[4].ToString(), reader[3].ToString(), aid, tot));
                        }

                    }
                }
                catch (Exception ex)
                {
                    return null;
                }
                finally { conn.Close(); }
            }
            return Ok(assignment);
        }

        //On Card Open
        [HttpGet]
        [Route("assignmentdetails")]
        public IActionResult AssignmentDetails(int aid)
        {
            List<AssignmentApproval> list = new List<AssignmentApproval>();
            using (SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
            {
                conn.Open();
                int nos, tot;
                string q = $"select * from Assignment where A_ID='{aid}';";
                string q1 = $"select count(*) from HOMEWORK where A_ID='{aid}' and STATUS='1';";
                string q2 = $"select count(*) from HOMEWORK where A_ID='{aid}';";
                try
                {
                    SqlCommand cmd = new SqlCommand(q, conn);
                    SqlCommand cmd1 = new SqlCommand(q1, conn);
                    SqlCommand cmd2 = new SqlCommand(q2, conn);
                    nos = (Int32)(cmd1.ExecuteScalar());
                    tot = (Int32)(cmd2.ExecuteScalar());
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            List<HomeworkPDA> homeworkpda = new List<HomeworkPDA>();
                            using (SqlConnection conn1 = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                            {
                                string q3 = $"select * from HOMEWORK where A_ID={aid};";
                                conn1.Open();
                                SqlCommand cmd3 = new SqlCommand(q3, conn1);
                                using (SqlDataReader reader1 = cmd3.ExecuteReader())
                                {
                                    while (reader1.Read())
                                    {
                                        string name = "";
                                        using (SqlConnection conn2 = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                                        {
                                            string q4 = $"select Name from UserAccount where ID={reader1[0]};";
                                            conn2.Open();
                                            SqlCommand cmd4 = new SqlCommand(q4, conn2);
                                            using (SqlDataReader reader2 = cmd4.ExecuteReader())
                                            {
                                                while (reader2.Read())
                                                {
                                                    name = reader2[0].ToString();
                                                }
                                            }
                                            conn2.Close();
                                        }
                                        homeworkpda.Add(new HomeworkPDA((int)reader1[0], name, reader1[2].ToString(), (byte[])(reader1[4])));
                                    }
                                }
                                conn1.Close();
                            }
                            list.Add(new AssignmentApproval(reader[2].ToString(), reader[1].ToString(), Convert.ToBoolean(Convert.ToInt32(reader[3])), nos, tot, homeworkpda));
                        }

                       
                    }

                    return Ok(list);

                }
                catch (Exception ex)
                {
                    return null;
                }
                finally
                {
                    conn.Close();
                }
            }
           
        }


        //Auto-Approval
        [HttpPost]
        [Route("autoapproval")]
        public IActionResult AutoApproval(int aid, int sid)
        {
            string q = $"Update HOMEWORK set STATUS = 1 where ID={sid} AND A_ID={aid};";
            try
            {
                using (SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(q, conn);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception ex) { return null; }
            return Ok("Approved");
        }

        /*[HttpPost]
        [Route("assignment-pdf")]
        public string InsertAssignment(NewAssignment model, int tid)
        {
            if (!ModelState.IsValid || model.FileData == null || model.FileData.Length == 0)
            {
                return "Bad Request or pdf is empty";
            }

            *//*string student = GetStudent(model.SId);

            if (string.IsNullOrEmpty(student)) 
            {
                return "Student not found";
            }*//*


            // string sd = $"{us.Id} : {us.Name}";
            SqlConnection con1 = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con1.Open();


            string q = "insert into Assignment(TOPIC,SUBJECT,APPROVAL,TASK,FILE_ASSIGNMENT,SELECTSTUDENT,TEACHER_ID) values (@topic,@subject,@approval,@task,@file,@student,@tid);";

            SqlCommand cmd = new SqlCommand(q, con1);

            List<string> studentdetails = new List<string>();

            string base64data;

            using (var memory = new MemoryStream())
            {
                model.FileData.CopyTo(memory);
                byte[] pdf = memory.ToArray();
                base64data = Convert.ToBase64String(pdf);
            }

            byte[] binarydata = Convert.FromBase64String(base64data);

            foreach (int sid in model.SIds)
            {
                SqlConnection con2 = new SqlConnection(config.GetConnectionString("MyConn").ToString());
                con2.Open();
                string selectq = "select ID from UserAccount where ID = @id AND userType = 'Student' ";
                SqlCommand cmd2 = new SqlCommand(selectq, con2);

                // string name="";

                cmd2.Parameters.AddWithValue("@id", sid);
                SqlDataReader sd = cmd2.ExecuteReader();

                if (sd.Read())
                {
                    int fetchid = sd.GetInt32(0);
                    //string fetchname = sd.GetString(1);

                    string det = $"{fetchid}";
                    if (!string.IsNullOrEmpty(det))
                    {
                        studentdetails.Add(det);
                    }
                }


                // con.Close();
            }


            string student = string.Join(",", studentdetails);

            cmd.Parameters.AddWithValue("@topic", model.TopicName);
            cmd.Parameters.AddWithValue("@subject", model.SubjectName);
            cmd.Parameters.AddWithValue("@approval", model.AutoAssign);
            cmd.Parameters.AddWithValue("@task", model.Task);
            cmd.Parameters.AddWithValue("@file", binarydata);
            cmd.Parameters.AddWithValue("@student", student);
            cmd.Parameters.AddWithValue("@tid", tid);


            //con.Open();
            int rows = cmd.ExecuteNonQuery();

            if (rows > 0)
            {
                int aid = GetAid();
                return CreateHomework(aid);
            }

            else
            {
                return "Not assigned";
            }



        }*/


        [HttpPost]
        public string CreateHomework(int id)
        {

            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con.Open();
            string q1 = "select SELECTSTUDENT from Assignment where A_ID = @aid";

            SqlCommand cmd1 = new SqlCommand(q1, con);

            cmd1.Parameters.AddWithValue("@aid", id);
            string student = cmd1.ExecuteScalar().ToString();

            if (!string.IsNullOrEmpty(student))
            {
                SqlConnection con2 = new SqlConnection(config.GetConnectionString("MyConn").ToString());
                con2.Open();
                string[] sid = student.Split(',');
                foreach (string s in sid)
                {

                    int selectedsid = Convert.ToInt32(s);

                    string q2 = "insert into HOMEWORK (ID,STATUS,A_ID,COMMENT) values (@sid,@status,@aid,@com);";
                    SqlCommand cmd2 = new SqlCommand(q2, con);

                    cmd2.Parameters.AddWithValue("@sid", selectedsid);
                    cmd2.Parameters.AddWithValue("@status", "0");
                    cmd2.Parameters.AddWithValue("@aid", id);
                    cmd2.Parameters.AddWithValue("@file", DBNull.Value);
                    cmd2.Parameters.AddWithValue("@com", " ");

                    cmd2.ExecuteNonQuery();

                    con2.Close();
                }

                return "Homework record created successfully along with assignment";
            }

            return "No student details found for the assignment";
        }


        [NonAction]
        public int GetAid()
        {
            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con.Open();

            string q = "Select Top 1 A_ID from Assignment order by A_ID desc;";

            SqlCommand cmd = new SqlCommand(q, con);

            int aid = Convert.ToInt32(cmd.ExecuteScalar());

            con.Close();

            return aid;
        }


        [HttpGet]
        [Route("Get-Assignment")]
        public JsonResult GetAssignmentDetails(int id)
        {


            List<object> ll = new List<object>();


            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con.Open();

            string q = "select a.TOPIC, a.SUBJECT, a.APPROVAL, a.TASK, h.STATUS, h.ID, u.NAME,h.H_ID from Assignment a JOIN HOMEWORK h on a.A_ID = h.A_ID JOIN UserAccount u on h.ID = u.ID where h.A_ID = @aid";
            SqlCommand cmd = new SqlCommand(q, con);

            cmd.Parameters.AddWithValue("@aid", id);

            SqlDataReader sd = cmd.ExecuteReader();

            while (sd.Read())
            {


                var assignment = new
                {
                    Subject = sd["SUBJECT"].ToString(),
                    Topic = sd["TOPIC"].ToString(),
                    Task = sd["TASK"].ToString(),
                    Assign = sd["APPROVAL"].ToString(),
                    Status = sd["STATUS"].ToString(),
                    StudentId = Convert.ToInt32(sd["ID"]),
                    StudentName = sd["Name"].ToString(),
                    HomeworkID = Convert.ToInt32(sd["H_ID"]),
                };

                ll.Add(assignment);
            }

            return new JsonResult(ll);


        }
    }
}
