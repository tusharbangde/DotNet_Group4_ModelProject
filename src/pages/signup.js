import React, { useState } from "react";
import home from "../resources/home 1.png";
import bgd from "../resources/home-page-image.png";
import "../styles/login.css";
import Container from 'react-bootstrap/Container';
import { Col, Form, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Signup = () => {

    const [userType, setUserType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const ers = [];
        if(userType==="") {
            ers.push("Please select a user Type (Teacher or Student).");
        }
        if(!isValidEmail(email)) {
            ers.push("Please enter a valid email address.");
        }
        if(name==="") {
            ers.push("Please enter your full name");
        }
        if(mobile.length !== 10) {
            ers.push("Please enter a valid mobile number.");
        }
        if(password==="") {
            ers.push("Please choose a password");
        }
        if(password!==confirmPassword) {
            ers.push("Password and confirm password do not match.");
        }
        setErrors(ers);
        if(ers.length===0) {
            console.log(userType);
            console.log(email);
            console.log(name);
            console.log(mobile);
            console.log(password);
            console.log(confirmPassword);
            const data = {
                Name: name,
                userType: userType,
                Password: password,
                Email: email,
                PhoneNumber: mobile
            };
            const url = 'https://localhost:44388/registration';
            axios.post(url, data).then((result) => {
                alert(result.data);
            }).catch((error) => {
                alert(error);
            })
        }
    }

    function isValidEmail(input) {
        var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return input.match(validRegex)
    }

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
                            <div className="label-2-signup">
                                <div className="join-the-hype">Sign Up</div>
                            </div>
                            <Form className="mt-3 login-form">
                                <Row className="radios">
                                    <Col>
                                        <Form.Check 
                                            className="teacher-radio"
                                            type="radio" 
                                            id={`teacher`} 
                                            label={`TEACHER`} 
                                            onChange={()=>setUserType("Teacher")}
                                            checked={userType==="Teacher"}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            className="student-radio"
                                            type="radio" 
                                            id={`student`} 
                                            label={`STUDENT`} 
                                            onChange={()=>setUserType("Student")}
                                            checked={userType==="Student"}
                                        />
                                    </Col>
                                </Row>
                                <Row className="name-input">
                                    <Col>
                                        <Form.Control
                                         type="text" 
                                         placeholder="Full name" 
                                         onChange={(e)=>setName(e.target.value)}
                                         />
                                    </Col>
                                </Row>
                                <Row className="email-input">
                                    <Col>
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Email address" 
                                        onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mobile-input">
                                    <Col>
                                        <Form.Control 
                                        type="number" 
                                        placeholder="Mobile Number"
                                        onChange={(e)=>setMobile(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="password-input">
                                    <Col>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="confirm-password-input">
                                    <Col>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="text-danger">
                                    <Col>
                                        {errors.map(e=><div key={e}>{e}</div>)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                        onClick={onSubmit}
                                        className="btn btn-primary btn-submit" 
                                        type="submit" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span>Already have an account ?</span>
                                        <NavLink style={{textDecoration:"none"}} to="/login">
                                            <span className="get-started"> Login</span>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </Form>
                    </div>
                    <Container className="footer-signup">
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