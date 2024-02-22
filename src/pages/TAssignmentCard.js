import React, { Fragment, useEffect, useState } from "react";
import "../styles/login.css";
import { Button, Card, CardBody } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
export const TAssignmentCard = ({ assignment }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
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
        // data: [assignment.noOfStudentsSubmitted, assignment.totNoOfStudents],
        data: [50, 50],
        backgroundColor: ["#336699", "#99CCFF"],
        display: true,
        borderColor: "white",
      },
    ],
  });

  useEffect(() => {
    const temp = {
      datasets: [
        {
          data: [assignment.noOfStudentsSubmitted, assignment.totNoOfStudents],
          backgroundColor: ["#336699", "#99CCFF"],
          display: true,
          borderColor: "white",
        },
      ],
    };
    setData(temp);
  }, []);
  return (
    <Card style={{width:"100%"}}>
      <CardBody style={{width:"100%"}}>
        <div>
          <div style={{ marginBottom: "-1.5rem", marginTop: "-2.5rem" }}>
            <Doughnut
              data={data}
              options={options}
              // style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            {assignment.autoAssign=='1' ? (
              <Button variant="success" size="sm">
                Auto Approve Enabled
              </Button>
            ) : (
              <Button variant="danger" size="sm">
                Auto Approve Disabled
              </Button>
            )}
          </div>
          <div>
            <span>Subject: </span>
            <span>{assignment.subjectName}</span>
          </div>
          <div>
            <span>Topic: </span>
            <span>{assignment.topicName}</span>
          </div>
          <div>
            <span>Task: </span>
            <span>{assignment.task}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
