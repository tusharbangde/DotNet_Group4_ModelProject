import React, { useState } from "react";
import home from "../resources/home 1.png";
import bgd from "../resources/home-page-image.png";
import "../styles/login.css";
import Container from 'react-bootstrap/Container';
import { Col, Form, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = () => {

    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const ers = [];
        if(userType==="") {
            ers.push("Please select a user Type (Teacher or Student)");
        }
        if(!isValidEmail(email)) {
            ers.push("Please enter a valid email address");
        }
        if(password==="") {
            ers.push("Please enter your password");
        }
        setErrors(ers);
        if(ers.length===0) {
            console.log(userType);
            console.log(email);
            console.log(password);
            const data = {
                Email: email,
                Password: password,
                userType: userType,
            };
            const url = 'https://localhost:44319/login';
            axios.post(url, data).then((result) => {
                if (result.data === "Data Found" && userType ==="Teacher") {
                    navigate("/teacher-dashboard");
                }
                else alert(result.data);
            }).catch((error) => {
                alert(error);
            })
        }
    }
     
    const isValidEmail = (input) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
                                <Row className="email-input">
                                    <Col>
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                         />
                                    </Col>
                                </Row>
                                <Row className="password-input">
                                    <Col>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                        className="btn btn-primary btn-submit" 
                                        type="submit"
                                        onClick={onSubmit}
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
                                        <span>Don't have an account ?</span>
                                        <NavLink style={{textDecoration:"none"}} to="/signup">
                                            <span className="get-started"> Get Started</span>
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