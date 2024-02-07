import React, { useEffect, useState } from "react";
import "../styles/login.css";
import Sidebar from "./sidebar_teacher";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../styles/TAssignmentPage.css";
import { Doughnut } from "react-chartjs-2";

export const TAssignmentPage = () => {

  const [list, setList] = useState([]);

  useEffect(()=>{
    let temp = [
        {student_id:"1", student_name:"Somya Patel", date:"2/2/2024", status:"Approved"},
        {student_id:"2", student_name:"Tushar", date:"1/2/2024", status:"Pending"},
        {student_id:"3", student_name:"Vedant", date:"31/1/2024", status:"Approved"},
        {student_id:"4", student_name:"Diwakar", date:"29/2/2024", status:"Rejected"},
        {student_id:"5", student_name:"Sarvesh", date:"2/2/2024", status:"Rejected"},
        {student_id:"6", student_name:"Diksha Shaw", date:"2/2/2024", status:"Pending"},
        {student_id:"7", student_name:"Shovin", date:"2/2/2024", status:"Pending"},
        {student_id:"8", student_name:"Ankit", date:"2/2/2024", status:"Rejected"},
    ]
    setList(temp)
  }, [])

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
  const data = {
    datasets: [
      {
        data: [3, 10],
        backgroundColor: ["#336699", "#99CCFF"],
        display: true,
      },
    ],
  };
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
            <h3 style={{ marginTop: "1rem" }}>Assignment Name</h3>
          </div>

          <Row
            style={{ marginTop: "5%", paddingLeft: "5%", paddingRight: "5%" }}
          >
            <Col>
              <div className="h4">
                Subject Name: <span>subject</span>
              </div>
              <div className="h4">
                Topic Name: <span>topic</span>
              </div>
              <div className="h4">
                Auto Approve: <span>yes</span>
              </div>
              <div className="h4">
                Number of students: <span>30</span>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "-1.5rem",
                  marginTop: "-4.9rem"
                }}
              >
                <div style={{width:"17rem", height:"17rem"}}>
                <Doughnut data={data} options={options}/>
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
                  <th>Date</th>
                  <th>Status</th>
                  <th>Submission</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {list.map((el)=><tr>
                  <td>{el.student_id}</td>
                  <td>{el.student_name}</td>
                  <td>{el.date}</td>
                  <td>{el.status}</td>
                  <td></td>
                  <td></td>
                </tr>)}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </div>
  );
};
