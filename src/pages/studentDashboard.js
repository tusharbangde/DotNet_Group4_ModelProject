import React, { useEffect, useState } from "react";
import "../styles/login.css";
import Sidebar from "./sidebar_teacher";
import {Col, Row } from "react-bootstrap";
import { SAssignmentCard } from "./SAssignmentCard";
import "../styles/searchbar.css";
import axios from "axios";
 
export const Studentdashboard = () => {

  const [cards, setCards] = useState([]);

  useEffect(()=>{
    const url = "https://localhost:7182/api/Homework/Student-Assignment";
    axios
      .get(url, { params: { sid: localStorage.getItem("userId") } })
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setCards(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  
 
  return (
    <div className="d-flex">
      <Sidebar />
 
      <div
        style={{
          marginLeft: "0.7rem",
          marginTop: "1rem",
          overflow: "hidden",
          marginRight: "0.7rem",
          width:"100%"
        }}
      >
        {/* <InputGroup>
                    <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                    />
                </InputGroup> */}
 
        {/* <input
          type="text"
          name="text"
          placeholder="Search assignment"
          class="input"
          style={{width:"100%"}}
        ></input> */}
 
        {/* <h3 style={{marginTop:"1.5rem"}}>New Assignment</h3> */}
        {/* <div>
                    <NavLink style={{ textDecoration: "none" }} to="/new-assignment">
                        <Card style={{ marginTop: "1.5rem", width: "fit-content" }}>
                            <FontAwesomeIcon style={{ height: "5rem", width: "5rem", margin: "3rem" }} icon={faSquarePlus} />
                        </Card>
                    </NavLink>
                   
                </div> */}
 
        <h3 style={{ marginTop: "1.5rem", textAlign: "left" }}>
          All Assignments
        </h3>
        <div style={{ marginTop: "1rem" }}>
          <Row>
            {cards.map((item) => (
              <Col lg="3" key={item.id} >
                <SAssignmentCard item={item} />
              </Col>
            ))}
 
           
          </Row>
        </div>
      </div>
    </div>
  );
};