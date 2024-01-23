import React from "react";
import "../styles/login.css";
import Sidebar from "./sidebar_teacher";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { TAssignmentCard } from "./TAssignmentCard";

export const TeacherDashboard = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div style={{marginLeft: "0.7rem", marginTop: "1rem", overflow:"hidden" }}>
                <InputGroup>
                    <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                    />
                </InputGroup>
                <h3 style={{marginTop:"1.5rem"}}>New Assignment</h3>
                <div>
                    <Card style={{marginTop:"1.5rem", width:"fit-content"}}>
                        <FontAwesomeIcon style={{height:"5rem", width:"5rem", margin:"3rem"}} icon={faSquarePlus} />
                    </Card>
                </div>
                <h3 style={{marginTop:"1.5rem"}}>All Assignments</h3>
                <div style={{marginTop:"2rem"}}>
                    <Row>
                        <Col>
                            <TAssignmentCard />
                        </Col>
                        <Col>
                            <TAssignmentCard />
                        </Col>
                        <Col>
                            <TAssignmentCard />
                        </Col>
                        <Col>
                            <TAssignmentCard />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};