import logo from "./logo.svg";
import "./App.css";
import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center">Contact Application</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={8}>
          <h2>My Contacts</h2>
          <ContactTable />
        </Col>
        <Col sm={4}>
          <h2>Add New Contact</h2>
          <ContactForm />
        </Col>
      </Row>
      {/* <ContactModal /> */}
    </Container>
  );
}

export default App;
