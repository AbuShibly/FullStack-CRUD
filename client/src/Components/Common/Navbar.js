import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../Assets/Images/image.png";
import "../Assets/Styles/Nav.css";

function CollapsibleExample() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-bg position-sticky top-0 z-2"
    >
      <Container>
        <Navbar.Brand href="/home">
          <img src={Logo} className="img-fluid" alt="Logo" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex gap-3">
            <Nav.Link id="nav-link" href="/home">
              UserData
            </Nav.Link>
            {/* <Nav.Link id="nav-link" href="/">
              Login
            </Nav.Link>
            <Nav.Link id="nav-link" href="/signup">
              SignUp
            </Nav.Link> */}
            <Nav.Link id="nav-link-logout" href="/">
              LogOut
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
