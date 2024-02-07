import React, { useEffect, useState } from "react";
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

    const [userTypeErr, setUserTypeErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        let ers = 0
        if(userType==="") {
            ers+=1
            setUserTypeErr("Please select a user Type (Teacher or Student)");
        } else {
            setUserTypeErr("")
        }
        if(!isValidEmail(email)) {
            ers+=1
            setEmailErr("Please enter a valid email address");
        } else {
            setEmailErr("")
        }
        if(password==="") {
            ers+=1
            setPassErr("Please enter your password");
        } else {
            setPassErr("")
        }
        if(ers===0) {
            console.log(userType);
            console.log(email);
            console.log(password);
            const data = {
                Email: email,
                Password: password,
                userType: userType,
            };
            const url = 'https://localhost:7182/api/Login/login';
            axios.post(url, data).then((result) => {
                console.log(result.status);
                if (result.status == 200) {
                    localStorage.setItem('email', JSON.stringify(email));
                    localStorage.setItem('userType', JSON.stringify(userType));
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    localStorage.setItem('userId', JSON.stringify(result.data.userId));
                    // navigate('/');
                    window.location.reload(true)
                }
                else alert(result.data);
            }).catch((error) => {
                alert("Credentials do not match");
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
                                            onChange={()=>setUserType("T")}
                                            checked={userType==="T"}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            className="student-radio"
                                            type="radio" 
                                            id={`student`} 
                                            label={`STUDENT`} 
                                            onChange={()=>setUserType("S")}
                                            checked={userType==="S"}
                                        />
                                    </Col>
                                </Row>
                                <Row className="text-danger">
                                    <Col>
                                        {userTypeErr}
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
                                <Row className="text-danger">
                                    <Col>
                                        {emailErr}
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
                                <Row className="text-danger">
                                    <Col>
                                        {passErr}
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
                                <Row>
                                    <Col>
                                        <span>Don't have an account ?</span>
                                        <NavLink style={{textDecoration:"none"}} to="/unauthorized/signup">
                                            <span className="get-started"> Get Started</span>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </Form>
                    </div>
                    {/* <Container className="footer">
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
                    </Container> */}
                </Col>
        </Container>
        <div><Image className="background-img" src={bgd}></Image></div>
      </div>
    );
  };