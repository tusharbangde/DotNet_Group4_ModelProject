using Gems_Project_Group_4.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Text;
using System.Xml.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Policy;

namespace Gems_Project_Group_4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeworkController : ControllerBase
    {

        private readonly IConfiguration config;

        public HomeworkController(IConfiguration configuration)
        {
            config = configuration;
        }

        /*[HttpPost]
        [Route("studentpdf")]
        public HttpResponseMessage studentpdf(Homework homework)
        {
            if (homework == null)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Homework Data is null.")
                };
            }

            try
            {
                using (SqlConnection conn = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                {
                    string str = "insert into HOMEWORK(STATUS,FILE_DATA,REMARK) VALUES (@Status,@FileData,@Remark); select SCOPE_IDENTITY();";

                    SqlCommand cmd = new SqlCommand(str, conn);

                    cmd.Parameters.AddWithValue("@Status", homework.STATUS);
                    cmd.Parameters.AddWithValue("@FileData", homework.FILE_DATA);
                    cmd.Parameters.AddWithValue("@Remark", homework.REMARK);

                    conn.Open();

                    int homeworkId = Convert.ToInt32(cmd.ExecuteScalar());

                    var response = new HttpResponseMessage(HttpStatusCode.Created);
                    response.Content = new StringContent(homeworkId.ToString());

                    return response;
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message)
                };
            }
        }*/

        /*[HttpGet]
        [Route("downloadpdf")]
        public HttpResponseMessage downloadpdf(Assignment assign)
        {
            try
            {
                // Fetch the binary data from the database
                byte[] fileBytes;
                using (SqlConnection connection = new SqlConnection(config.GetConnectionString("MyConn").ToString()))
                {
                    connection.Open();
                    string query = "SELECT TOPIC,SUBJECT,TASK,FILE_ASSIGNMENT FROM Assignment WHERE FileType = 'VARBINARY'"; // Adjust query as needed
                    SqlCommand command = new SqlCommand(query, connection);
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        fileBytes = (byte[])reader["FileData"];
                    }
                    else
                    {
                        return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                        {
                            Content = new StringContent("File not found in the database")
                        };
                    }
                }

                // Set the response headers
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new ByteArrayContent(fileBytes);
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(MimeMapping.GetMimeMapping(fileName));
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileName
                };
                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message)
                };
            }*/
        //}

        /*
                [HttpPost]
                [Route("pdf-upload")]
                public string UploadHw([FromForm] Homework model, int aid, int sid)
                {
                    if (model.FILE_DATA == null || model.FILE_DATA.Length == 0)
                    {
                        return "Empty homework";
                    }

                    SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn"));
                    con.Open();

                    byte[] filedata;
                    string base64data;


                    using (var memory = new MemoryStream())
                    {
                        model.FILE_DATA.CopyTo(memory);
                        //byte[] pdf = memory.ToArray();
                        //base64data = Convert.ToBase64String(pdf);
                        filedata = memory.ToArray();
                    }

                    //byte[] binarydata = Convert.FromBase64String(base64data);

                    string q = "update HOMEWORK set FILE_DATA = @file, STATUS= '1' where A_ID = @aid and ID= @sid";
                    SqlCommand cmd = new SqlCommand(q, con);

                    cmd.Parameters.AddWithValue("@file", filedata);
                    cmd.Parameters.AddWithValue("@aid", aid);
                    cmd.Parameters.AddWithValue("@sid", sid);


                    int row = cmd.ExecuteNonQuery();

                    if (row > 0)
                    {
                        return "Homework Pdf uploaded successfully";
                    }

                    else
                    {
                        return "Homework pdf not uploaded";
                    }

                }

                


                //*******************************************************
        */


        [HttpPost]
        [Route("pdf-upload")]
        public string UploadHw([FromForm] Homework model, int aid, int sid)
        {
            if (model.FILE_DATA == null || model.FILE_DATA.Length == 0)
            {
                return "Empty homework";
            }

            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn"));
            con.Open();
            byte[] filedata;
            string base64data;

            using (var memory = new MemoryStream())
            {
                model.FILE_DATA.CopyTo(memory);
                filedata = memory.ToArray();
            }

            string q = "update HOMEWORK set FILE_DATA = @file, STATUS = @status where A_ID = @aid and ID = @sid";

            // Check if auto-approval is enabled for the assignment
            using (SqlCommand approvalCmd = new SqlCommand("SELECT Approval FROM Assignment WHERE A_ID = @Aid", con))
            {
                approvalCmd.Parameters.AddWithValue("@Aid", aid);
                string approvalStatus = (string)approvalCmd.ExecuteScalar();

                using (SqlCommand cmd = new SqlCommand(q, con))
                {
                    if (approvalStatus == "1")
                    {
                        // If auto-approval is enabled, set the status to 2
                        cmd.Parameters.AddWithValue("@status", 2);
                    }
                    else
                    {
                        // If auto-approval is disabled, set the status to 1
                        cmd.Parameters.AddWithValue("@status", 1);
                    }

                    cmd.Parameters.AddWithValue("@file", filedata);
                    cmd.Parameters.AddWithValue("@aid", aid);
                    cmd.Parameters.AddWithValue("@sid", sid);

                    int row = cmd.ExecuteNonQuery();

                    if (row > 0)
                    {
                        return "Homework Pdf uploaded successfully";
                    }
                    else
                    {
                        return "Homework pdf not uploaded";
                    }
                }
            }
        }

        [HttpGet]
        [Route("download-assignment")]
        public IActionResult DownloadPdf([FromQuery] int aid)
        {
            byte[] pdf = GetAssignment(aid);

            if (pdf == null || pdf.Length == 0)
            {
                return NotFound("pdf not found");
            }


            return File(pdf, "application/pdf", "assignment.pdf");

        }


        [NonAction]
        public byte[] GetAssignment(int aid)
        {
            byte[] pdf = null;
            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());

            string q = "select FILE_ASSIGNMENT from Assignment where A_ID = @aid";

            SqlCommand cmd = new SqlCommand(q, con);
            cmd.Parameters.AddWithValue("@aid", aid);

            con.Open();

            object res = cmd.ExecuteScalar();

            if (res != null && res != DBNull.Value)
            {
                pdf = (byte[])res;
            }

            return pdf;

        }


        [HttpGet]
        [Route("download-homework")]
        public IActionResult DownloadHomework([FromQuery] int hid)
        {
            byte[] pdf = GetHomework(hid);

            if (pdf == null || pdf.Length == 0)
            {
                return NotFound("pdf not found");
            }


            return File(pdf, "application/pdf", "homework.pdf");

        }


        [NonAction]
        public byte[] GetHomework(int hid)
        {
            byte[] pdf = null;
            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());

            string q = "select FILE_DATA from HOMEWORK where H_ID = @hid";

            SqlCommand cmd = new SqlCommand(q, con);
            cmd.Parameters.AddWithValue("@hid", hid);

            con.Open();

            object res = cmd.ExecuteScalar();

            if (res != null && res != DBNull.Value)
            {
                pdf = (byte[])res;
            }

            return pdf;

        }

        [HttpGet]
        [Route("Student-Assignment")]
        public JsonResult FetchAssignment(int sid)
        {

            List<object> list = new List<object>();

            StringBuilder sb = new StringBuilder();

            SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn").ToString());
            con.Open();

            string q = "select h.H_ID, a.A_ID, a.TOPIC, a.SUBJECT, a.TASK, h.STATUS from Assignment a JOIN Homework h on a.A_ID=h.A_ID where h.ID = @sid ;";

            SqlCommand cmd = new SqlCommand(q, con);

            cmd.Parameters.AddWithValue("@sid", sid);

            SqlDataReader sd = cmd.ExecuteReader();

            while (sd.Read())
            {
                var assignemnt = new
                {
                    A_ID = sd["A_ID"].ToString(),
                    Topic = sd["TOPIC"].ToString(),
                    Subject = sd["SUBJECT"].ToString(),
                    Task = sd["TASK"].ToString(),
                    Status = sd["STATUS"].ToString(),
                    H_ID = sd["H_ID"].ToString()
                };

                list.Add(assignemnt);


            }
            con.Close();

            return new JsonResult(list);
        }


        // to change status of homework from 0 - pending to 1 - submitted to 2 - Approved 3 - Rejected...

        [HttpPost]
        [Route("ChangeStatus")]
        public IActionResult ChangeHomeworkStatus(int aid, int sid, int status)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(config.GetConnectionString("MyConn")))
                {
                    con.Open();
                    string fileCheckQuery = "SELECT COUNT(*) FROM HOMEWORK WHERE A_ID = @Aid AND ID = @Sid AND FILE_DATA IS NOT NULL";
                    SqlCommand fileCheckCmd = new SqlCommand(fileCheckQuery, con);
                    fileCheckCmd.Parameters.AddWithValue("@Aid", aid);
                    fileCheckCmd.Parameters.AddWithValue("@Sid", sid);
                    int fileCount = (int)fileCheckCmd.ExecuteScalar();
                    if (fileCount == 0)
                    {
                        return BadRequest("Homework solution for the given assignment is not submitted yet by the student.");
                    }



                    string query = "UPDATE HOMEWORK SET STATUS = @Status WHERE A_ID = @Aid AND ID = @Sid";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Status", status);
                    cmd.Parameters.AddWithValue("@Aid", aid);
                    cmd.Parameters.AddWithValue("@Sid", sid);
                    int rowsAffected = cmd.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        return Ok("Homework status updated successfully.");
                    }
                    else
                    {
                        return NotFound("No homework found for the provided assignment and student ID.");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
