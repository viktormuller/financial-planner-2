import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Accordion,
  Card,
  Row
} from "react-bootstrap";
import { Child } from "./Child";
import { Household } from "./Household";
import { BsTrash } from "react-icons/bs";
import {} from "react-bootstrap";

export class HouseholdInput extends Component<
  { household: Household; onChange },
  Household
> {
  constructor(props) {
    super(props);
    this.state = props.household;
  }

  addChild(event) {
    var maxYear = Math.max(
      ...this.state.children.map(child => child.yearOfBirth)
    );
    maxYear = maxYear ? maxYear : new Date().getFullYear();
    this.state.children.push(new Child(maxYear + 2));
    console.log("Added new child " + (maxYear + 2));
    console.log(this.state.children);

    this.setState({ children: this.state.children });

    this.props.onChange();
  }

  removeChild(index: number) {
    console.log("Before");
    console.log(this.state.children);
    this.state.children.splice(index, 1);
    console.log("After");
    console.log(this.state.children);
    this.setState({ children: this.state.children });

    this.props.onChange();
  }

  render() {
    return (
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            How many children do you plan to have?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                {this.state.children.map((child, index) => (
                  <ChildInput
                    key={child.id}
                    child={child}
                    index={index}
                    removeChild={this.removeChild.bind(this)}
                    onChange={this.props.onChange}
                  />
                ))}
              </Form>
              <Button
                block
                variant="secondary"
                onClick={this.addChild.bind(this)}
              >
                Add a child
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export interface ChildProps {
  child: Child;
  index: number;
  removeChild;
  onChange;
}

export class ChildInput extends Component<ChildProps, { child: Child }> {
  constructor(props: ChildProps) {
    super(props);
    this.state = { child: props.child };
  }

  onYearOfBirthChange(event) {
    this.state.child.yearOfBirth = Number(event.target.value);
    this.setState({ child: this.state.child });
    this.props.onChange();
  }

  render() {
    return (
      <FormGroup>
        <Row>
          {" "}
          <Col>
            {" "}
            <Form.Label>
              Child {this.props.index + 1} year of birth
              <Button
                variant="light"
                onClick={() => this.props.removeChild(this.props.index)}
              >
                <BsTrash />
              </Button>
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              className="text-right"
              name="endYear"
              type="number"
              value={this.state.child.yearOfBirth}
              onChange={this.onYearOfBirthChange.bind(this)}
            />
          </Col>
        </Row>{" "}
      </FormGroup>
    );
  }
}
