import React, { useEffect, useState } from "react";
import "../styles/login.css";
import Sidebar from "./sidebar_teacher";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { TAssignmentCard } from "./TAssignmentCard";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const url = "https://localhost:7182/api/Assignment/displayassignment";
    axios
      .post(url, null, { params: { tid: localStorage.getItem("userId") } })
      .then((result) => {
        console.log("data",result.data);
        if (result.status == 200) {
          const asgn = result.data;
          const fin = [];
          for (let i = 0; i < asgn.length; i += 4) {
            const temp = [];
            for (let j = i; j < Math.min(asgn.length, i + 4); j++) {
              temp.push(asgn[j]);
            }
            fin.push(temp);
          }
          setAssignments(fin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="container"
        style={{ marginLeft: "0.7rem", marginTop: "1rem", overflow: "hidden" }}
      >
        {/* <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Search" />
        </InputGroup> */}
        <h3 style={{ marginTop: "1.5rem" }}>New Assignment</h3>
        <div>
          <NavLink style={{ textDecoration: "none" }} to="new-assignment">
            <Button variant="success" className="btn btn-lg mt-2">
              New Assignment +
            </Button>
          </NavLink>
        </div>
        <h3 style={{ marginTop: "1.5rem" }}>All Assignments</h3>
        <Container style={{ marginTop: "2rem" }}>
          <Row>
            {assignments.map((f) => {
              return f.map((a) => {
                return (
                  <Col xl="3" key={a.aId} style={{ marginBottom: "1rem" }}>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to={`assignments/${a.aId}`}
                    >
                      <TAssignmentCard assignment={a} />
                    </NavLink>
                  </Col>
                );
              });
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};
