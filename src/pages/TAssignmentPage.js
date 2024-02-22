import React, { useEffect, useState } from "react";
import "../styles/login.css";
import Sidebar from "./sidebar_teacher";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "../styles/TAssignmentPage.css";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useParams } from "react-router-dom";

export const TAssignmentPage = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();
  const statuses = {
    0: "Pending",
    1: "Submitted",
    2: "Approved",
    3: "Rejected",
  };

  const downloadHomework = (hid) => {
    const url = "https://localhost:7182/api/Homework/download-homework";
    axios
      .get(url, { params: { hid: hid }, responseType: "arraybuffer" })
      .then((result) => {
        if (result.data != null) {
          const blob = new Blob([result.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "homework.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approveSubmission = (homeworkID) => {};

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = "https://localhost:7182/api/Assignment/Get-Assignment";
    axios
      .get(url, { params: { id: id } })
      .then((result) => {
        console.log(result.data);
        setList(result.data);
        const temp = {
          datasets: [
            {
              data: [
                result.data.filter((r) => r.status != 0).length,
                result.data.length,
              ],
              backgroundColor: ["#336699", "#99CCFF"],
              display: true,
            },
          ],
        };
        setData(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "80%",
    maintainAspectRatio: true,
    responsive: true,
  };
  const [data, setData] = useState({
    datasets: [
      {
        data: [3, 10],
        backgroundColor: ["#336699", "#99CCFF"],
        display: true,
      },
    ],
  });

  const changeStatus = (sid, status) => {
    const url = "https://localhost:7182/api/Homework/ChangeStatus";
    axios
      .post(url, null, { params: { aid: id, sid, status } })
      .then((result) => {
        if(result.status==200){
          alert("Homework status updated successfully");
          getData();
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        style={{
          marginLeft: "0.7rem",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Container className="single-assignment-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            <h3 style={{ marginTop: "1rem" }}>{list[0]?.subject}</h3>
          </div>

          <Row
            style={{ marginTop: "5%", paddingLeft: "5%", paddingRight: "5%" }}
          >
            <Col>
              <div className="h4">
                Subject Name: <span>{list[0]?.subject}</span>
              </div>
              <div className="h4">
                Topic Name: <span>{list[0]?.topic}</span>
              </div>
              <div className="h4">
                Auto Approve:{" "}
                <span>{list[0]?.assign == "1" ? "Yes" : "No"}</span>
              </div>
              <div className="h4">
                Number of students: <span>{list.length}</span>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "-1.5rem",
                  marginTop: "-4.9rem",
                }}
              >
                <div style={{ width: "17rem", height: "17rem" }}>
                  <Doughnut data={data} options={options} />
                </div>
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: "3%", paddingLeft: "5%", paddingRight: "5%" }}
          >
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Submission</th>
                  {list[0]?.assign == "0" ? <th>Approve</th> : ""}
                </tr>
              </thead>
              <tbody>
                {list.map((el) => (
                  <tr>
                    <td>{el.studentId}</td>
                    <td>{el.studentName}</td>
                    <td>{statuses[el.status]}</td>
                    <td>
                      <Button
                        disabled={el.status == "0"}
                        className="btn btn-info"
                        onClick={() => downloadHomework(el.homeworkID)}
                      >
                        Download
                      </Button>
                    </td>
                    {list[0]?.assign == "0" ? (
                      <td>
                        <Button
                          onClick={() => {
                            changeStatus(el.studentId, 2);
                          }}
                          className="btn btn-success"
                          style={{ marginRight: "1rem" }}
                          disabled={el.status == "2" || el.status == "0"}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => {
                            changeStatus(el.studentId, 3);
                          }}
                          className="btn btn-danger"
                          disabled={el.status != '1'}
                        >
                          Reject
                        </Button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </div>
  );
};
