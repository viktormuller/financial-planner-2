import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Child } from "./Child";
import { BsTrash } from "react-icons/bs";

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
