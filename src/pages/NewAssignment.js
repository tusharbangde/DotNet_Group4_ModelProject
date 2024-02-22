import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar_teacher";
import Option from "./Dropdown.js";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import FileUpload from "./FileUpload";
import "../styles/NewAssignment.css";
import Button from "react-bootstrap/Button";
import { CDBSidebarMenuItem } from "cdbreact";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";

export const NewAssignment = () => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    comment: "",
    auto_approve: false,
    assignment_file: null,
  });

  const onSelect = (e) => {
    setSelectedValues(e);
  };

  const onRemove = (e) => {
    setSelectedValues(e);
  };

  useEffect(() => {
    const url = "https://localhost:7182/api/Assignment/studentsList";
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        if (result.status == 200) {
          const temp = Object.keys(result.data).map((s) => {
            return { name: s + ". " + result.data[s], id: s };
          });
          setOptions(temp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInput = (name, value) => {
    const form = { ...formData };
    form[name] = value;
    setFormData(form);
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if(formData.subject=="" || formData.topic=="" || formData.comment=="" || formData.assignment_file == null) {
      alert("All the fields are mandatory !")
    } else {
      var form = new FormData();
      form.append("FileData", formData.assignment_file)
      let url = "https://localhost:7182/api/Assignment/submitassignmentpdf?";
      const params = {
        SubjectName: formData.subject,
        TopicName: formData.topic,
        Task: formData.comment,
        AutoAssign: formData.auto_approve ? '1' : '0',
        tid: localStorage.getItem("userId")
      }
      url+=selectedValues.map((value) => `SIds=${value.id}`).join('&');
      axios
      .post(url, form, { params})
      .then((result) => {
        console.log(result.data);
        if (result.status == 200) {
          alert("Assignment Added successfully")
        }
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <div className="d-flex" style={{ backgroundColor: "#f5f5f5" }}>
      <Sidebar />
      <div className="container" style={{ textAlign: "left", backgroundColor:"azure", borderRadius:"1rem" }}>
        <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
          <h2>NEW ASSIGNMENT</h2>

          <Row className="my-5">
            <Col>
              <Form.Control
                type="text"
                placeholder="Subject Name"
                value={formData.subject}
                onChange={(e) => handleInput("subject", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Chapter/Topic Name"
                value={formData.topic}
                onChange={(e) => handleInput("topic", e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <Form.Control
                type="text"
                placeholder="Comment"
                value={formData.comment}
                onChange={(e) => handleInput("comment", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Auto Approval"
                defaultChecked={formData.auto_approve}
                isValid={true}
                onChange={(e) =>
                  handleInput("auto_approve", !formData.auto_approve)
                }
              />
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <Form.Control
                type="file"
                accept="application/pdf"
                name="file"
                onChange={(e) =>
                  handleInput("assignment_file", e.target.files[0])
                }
              />
            </Col>
            <Col>
              <Multiselect
                style={{ marginTop: "2rem" }}
                options={options} // Options to display in the dropdown
                selectedValues={selectedValues} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Select Students"
                showCheckbox={true}
              />
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <Button
                href="/"
                variant="outline-success"
                className="button-primary"
                onClick={onSubmit}
              >
                Create
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
