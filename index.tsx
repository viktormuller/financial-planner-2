import React, { Component } from "react";
import {
  Navbar,
  Row,
  Container,
  Col,
  Accordion,
  Card,
  Form,
  FormGroup
} from "react-bootstrap";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>How much does it cost to raise a child?</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={6}>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    How many children do you have or plan to have?
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Form>
                        <FormGroup>
                          <Form.Label>First child's year of birth: </Form.Label>
                          <Form.Control
                            className="text-right"
                            name="endYear"
                            type="number"
                            value={2020}
                          />
                        </FormGroup>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col xs={6} className="text-center align-middle">
              Here is where output will go{" "}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
