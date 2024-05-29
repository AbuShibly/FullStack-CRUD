import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../Assets/Images/image.png";
import "../Assets/Styles/Nav.css";

function CollapsibleExample() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Function to fetch userData from local storage
    const fetchUserData = () => {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    };

    // Fetch userData initially
    fetchUserData();

    // Listen for the custom event and re-fetch userData when the event is triggered
    window.addEventListener("userDataChanged", fetchUserData);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("userDataChanged", fetchUserData);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-bg position-sticky top-0 z-2"
    >
      <Container>
        <Navbar.Brand href="/home">
          <img src={Logo} className="img-fluid" alt="Logo" width={30} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center justify-content-center">
            {userData?.id ? (
              <div className="d-flex gap-4 align-items-center">
                <Nav.Link id="nav-link" href="/home">
                  UserData
                </Nav.Link>
                <Nav.Link id="nav-link-logout" onClick={handleLogOut}>
                  LogOut
                </Nav.Link>
                <img
                  src={userData.avatar}
                  alt="User-Profile"
                  width={40}
                  className="rounded-circle"
                />
              </div>
            ) : (
              <div className="d-flex gap-3 align-items-center">
                <Nav.Link id="nav-link" href="/signup">
                  SignUp
                </Nav.Link>
                <Nav.Link id="nav-link" href="/">
                  Login
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
