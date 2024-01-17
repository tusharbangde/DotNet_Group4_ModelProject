import React, { Fragment } from "react";
import home from "../resources/home 1.png";
import bgd from "../resources/home-page-image.png";
import "../styles/login.css";
import Container from 'react-bootstrap/Container';
import { Col, Form, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export const Login = () => {
    return (
      <div className="d-flex">
        <Container>
                <Col>
                    <Row>
                        <div className="d-flex">
                            <Image className="home" src={home} />   
                            <div className="align-middle project-title">
                                <h2>HomeWork</h2>   
                            </div> 
                        </div>
                    </Row>
                    <div className="welcome">
                            <div className="label">
                                <p className="short-headline">
                                    <span className="text-wrapper">Welcome back to </span>
                                    <span className="span">HomeWork</span>
                                </p>
                            </div>
                            <div className="label-2 mt-5">
                                <div className="join-the-hype">Login</div>
                            </div>
                            <Form className="mt-3 login-form">
                                <Row className="radios">
                                    <Col>
                                        <Form.Check 
                                            className="teacher-radio"
                                            type="radio" 
                                            id={`teacher`} 
                                            label={`TEACHER`} 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            className="student-radio"
                                            type="radio" 
                                            id={`student`} 
                                            label={`STUDENT`} 
                                        />
                                    </Col>
                                </Row>
                                <Row className="email-input">
                                    <Col>
                                        <Form.Control type="email" placeholder="Email address" />
                                    </Col>
                                </Row>
                                <Row className="password-input">
                                    <Col>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control className="btn btn-primary btn-submit" type="submit" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span>Don't have an account ?</span>
                                        <NavLink style={{textDecoration:"none"}} to="/signup">
                                            <span className="get-started">Get Started</span>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </Form>
                    </div>
                    <Container className="footer">
                        <Row>
                            <Col xs={8}>
                                Copyright © 2023 HomeWork All rights reserved.
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-end" >
                                    Terms & Conditions
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
        </Container>
        <div><Image className="background-img" src={bgd}></Image></div>
      </div>
    );
  };