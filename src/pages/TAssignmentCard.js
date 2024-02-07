<<<<<<< HEAD
import React, { Fragment, useState } from "react";
import "../styles/login.css";
import { Button, Card, CardBody } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
export const TAssignmentCard = () => {
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
  }
  const data = {
    datasets: [
      {
        data: [3, 10],
        backgroundColor: [
          "#336699",
          "#99CCFF"
        ],
        display: true,
        borderColor: "white"
      }
    ]
  };
  return (
    <Card style={{width:"fit-content"}}>
      <CardBody>
        <div>
            <div style={{ marginBottom:"-1.5rem", marginTop:"-2.5rem"}}>
                <Doughnut
                    data={data}
                    options={options}
                    style={{height:"100%", width:"100%"}}
                />
            </div>
            <div style={{marginBottom:"0.5rem"}}>
                <Button variant="success" size="sm">
                    Auto
                </Button>
            </div>
            <div>
                <span>Class: </span>
                <span>8th</span>
            </div>
            <div>
                <span>Subject: </span>
                <span>Maths</span>
            </div>
            <div>
                <span>Comments</span>
            </div>
            <div>
                <span>Details</span>
            </div>
        </div>
      </CardBody>
    </Card>
  );
};
=======
import React, { Fragment, useState } from "react";
import "../styles/login.css";
import { Button, Card, CardBody } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
export const TAssignmentCard = () => {
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
    cutout: "60%",
    maintainAspectRatio: true,
    responsive: true,
  }
  const data = {
    datasets: [
      {
        data: [3, 10],
        backgroundColor: [
          "#336699",
          "#99CCFF"
        ],
        display: true,
        borderColor: "#D1D6DC"
      }
    ]
  };
  return (
    <Card style={{width:"fit-content"}}>
      <CardBody>
        <div>
            <div style={{ marginBottom:"-1.5rem", marginTop:"-2.5rem"}}>
                <Doughnut
                    data={data}
                    options={options}
                    style={{height:"100%", width:"100%"}}
                />
            </div>
            <div style={{marginBottom:"0.5rem"}}>
                <Button variant="success" size="sm">
                    Auto
                </Button>
            </div>
            <div>
                <span>Class: </span>
                <span>8th</span>
            </div>
            <div>
                <span>Subject: </span>
                <span>Maths</span>
            </div>
            <div>
                <span>Comments</span>
            </div>
            <div>
                <span>Details</span>
            </div>
        </div>
      </CardBody>
    </Card>
  );
};
>>>>>>> 2ec04d9fe5d2731343f4b25f9833d3ab68d77411
