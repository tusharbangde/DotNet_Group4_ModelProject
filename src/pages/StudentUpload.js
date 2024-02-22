import React, { useEffect, useState } from "react";
import "../styles/searchbar.css";
import Sidebar from "./sidebar_teacher";
import "../styles/StudentUpload.css";

import "../styles/downloadbutton.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const PDF_FILE_URL = "http://localhost:3000/pdf.pdf";

export const StudentUpload = () => {
  const [file, setFile] = useState();

  const { id } = useParams();

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault()
    var form = new FormData();
    form.append("FILE_DATA", file)
    let url = "https://localhost:7182/api/Homework/pdf-upload";
    const params = {
      sid:localStorage.getItem("userId"),
      aid:id
    }
    axios
    .post(url, form, { params})
    .then((result) => {
      console.log(result.data);
      if (result.status == 200) {
        alert("Homework uploaded successfully")
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const downloadAssignment = () => {
    const url = "https://localhost:7182/api/Homework/download-assignment";
    axios
      .get(url, { params: { aid: id }, responseType:"arraybuffer" })
      .then((result) => {
        if (result.data != null) {
          const blob = new Blob([result.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "assignment.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        style={{
          marginLeft: "0.7rem",
          marginTop: "1rem",
          overflow: "hidden",
          marginRight: "0.7rem",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", marginLeft: "12px", font: "poppin" }}>
          Upload Your document
        </h1>

        <Row className="my-5">
          <Col>
            <Form.Control
              type="file"
              accept="application/pdf"
              name="file"
              onChange={(e) => handleFile(e)}
            />
          </Col>
          <Col>
            <Button
              href="/"
              variant="outline-success"
              className="button-primary"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Col>
        </Row>

        <Col>
          <Row>
            <h1> Download Your Assignment</h1>
            {/* <div style={{ textAlign: "center" }}>
              <button
                style={{ width: "200px", margin: "10px", marginLeft: "30px" }}
                onClick={() => {
                  downloadFileURL(PDF_FILE_URL);
                }}
              >
                <div style={{ marginLeft: "20px" }}>Download File</div>
              </button>
            </div> */}
          </Row>
        </Col>

        <button class="Documents-btn">
          <span class="folderContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 146 113"
              height="113"
              width="146"
              class="fileBack"
            >
              <path
                fill="url(#paint0_linear_117_4)"
                d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
              ></path>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  y2="95.4804"
                  x2="72.93"
                  y1="0"
                  x1="0"
                  id="paint0_linear_117_4"
                >
                  <stop stop-color="#8F88C2"></stop>
                  <stop stop-color="#5C52A2" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 88 99"
              height="99"
              width="88"
              class="filePage"
            >
              <rect
                fill="url(#paint0_linear_117_6)"
                height="99"
                width="88"
              ></rect>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  y2="160.5"
                  x2="81"
                  y1="0"
                  x1="0"
                  id="paint0_linear_117_6"
                >
                  <stop stop-color="white"></stop>
                  <stop stop-color="#686868" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 160 79"
              height="79"
              width="160"
              class="fileFront"
            >
              <path
                fill="url(#paint0_linear_117_5)"
                d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
              ></path>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  y2="82.8317"
                  x2="66.9106"
                  y1="8.71323"
                  x1="38.7619"
                  id="paint0_linear_117_5"
                >
                  <stop stop-color="#C3BBFF"></stop>
                  <stop stop-color="#51469A" offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <p
            onClick={downloadAssignment}
            class="text"
            style={{ textAlign: "center" }}
          >
            Documents
          </p>
        </button>
      </div>
    </div>
  );
};
