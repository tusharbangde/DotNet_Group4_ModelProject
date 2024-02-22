import react, { Fragment, useState } from "react";
import "../styles/login.css";
import "../styles/cardHover.css";
import { NavLink } from "react-router-dom";

export const SAssignmentCard = ({ item }) => {
  //   const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <card>
      <div>
        <div class="card1">
          {/* <div class="card-details">
    <p class="text-title">Card title</p>
    <p class="text-body">Here are the details of the card</p> */}

          <div>
            <div style={{ marginBottom: "-1.5rem", marginTop: "-2.5rem" }}>
              {/* <Doughnut
                    data={data}
                    options={options}
                    style={{height:"100%", width:"100%"}}
                /> */}
            </div>
            {/* <div style={{marginBottom:"0.5rem"}}>
                <Button variant="success" size="sm">
                    Auto
                </Button>
            </div> */}
            <br></br>
            {item.status == "2" && (
              <h1
                style={{
                  backgroundColor: "green",
                  fontStyle: "-moz-initial",
                  fontSize: "25px",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                Approved
              </h1>
            )}

            {item.status == "3" && (
              <h1
                style={{
                  backgroundColor: "red",
                  fontStyle: "-moz-initial",
                  fontSize: "25px",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                Rejected
              </h1>
            )}

            {item.status == "0" && (
              <h1
                style={{
                  backgroundColor: "orange",
                  fontStyle: "-moz-initial",
                  fontSize: "25px",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                Pending
              </h1>
            )}

            {item.status == "1" && (
              <h1
                style={{
                  backgroundColor: "blue",
                  fontStyle: "-moz-initial",
                  fontSize: "25px",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                Submitted
              </h1>
            )}

            {/* <div>
              <span>Class: </span>
              <span>8th</span>
            </div> */}
            <div>
              <span>Subject: </span>
              <span>{item.subject}</span>
            </div>
            <div>
              <span>Task: </span>
              <span>{item.task}</span>
            </div>
            <div>
              <span>Topic: </span>
              <span>{item.topic}</span>
            </div>
            {/* <div>
              <span>Comments</span>
            </div>
            <div>
              <span>Details</span>
            </div> */}
          </div>

          <NavLink
            style={{ textDecoration: "none" }}
            to={`assignments/${item.a_ID}`}
          >
            <button class="card-button">
              <div style={{ textAlign: "center", marginLeft: "" }}>Open</div>
            </button>
          </NavLink>
        </div>
      </div>
    </card>
  );
};
