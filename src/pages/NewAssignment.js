import React from "react";
import Sidebar from "./sidebar_teacher";
import Option from "./Dropdown.js"
import { Form, InputGroup } from "react-bootstrap";
import FileUpload from "./FileUpload";
import '../styles/NewAssignment.css';
import Button from 'react-bootstrap/Button';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

export const NewAssignment = () => {
    return (

        <div className="d-flex" style={{ backgroundColor: '#f5f5f5' }}>
            <Sidebar />
            <div className="container" style={{ textAlign: 'left' }}>
                <div style={{ float: 'right', marginTop: '1rem' }}>
                    <h3>
                        <CDBSidebarMenuItem icon="user"> Hello Tushar</CDBSidebarMenuItem>
                    </h3>
                </div>
                <div style={{ float: 'right', marginTop: '3rem', marginLeft: '3rem' }}>
                    <h2>NEW ASSIGNMENT</h2>
                    <div>
                        <div className="mydiv">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Subject Name"
                                />
                            </InputGroup>
                        </div>
                        <div className="mydiv">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Chapter/Topic Name"
                                />
                            </InputGroup>
                        </div>
                        <div className="mydiv">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Comment"
                                />
                            </InputGroup>
                            <InputGroup style={{ marginTop: '2rem' }}>
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Auto Approval"
                                    />
                                </Form>
                                <div style={{ marginTop: '3rem' }}>
                                    <Option />
                                </div>
                            </InputGroup>
                        </div>
                    </div>
                    <div style={{ float: 'left', marginTop: '2rem' }}>
                        <FileUpload />
                        <div style={{ marginTop: '2rem' }}>
                            <Button href="/" variant="outline-success" className="button-primary">
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};