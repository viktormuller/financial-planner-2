import React, { Component } from "react";
import * as d3 from "d3-format";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Row,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { Child } from "./Child";
import { BsTrash } from "react-icons/bs";
import {
  ChildCareStrategy,
  ChildStrategy,
  CHILD_CARE_TEXT,
  K12Strategy,
  K12_TEXT,
  MONTHLY_CHILD_SUPPLY_MAX,
  MONTHLY_CHILD_SUPPLY_MIN
} from "./ChildStrategyEnums";
import { MonetaryAmount } from "./MonetaryAmount";
import RangeSlider from "react-bootstrap-range-slider";
import { Calculator } from "./Calculator";

export class ChildCostInput extends Component<
  { children: Child[]; childStrategy: ChildStrategy; onChange },
  { children: Child[]; childStrategy: ChildStrategy }
> {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children,
      childStrategy: props.childStrategy
    };
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
    CHILD_CARE_TEXT;
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

  renderYearsOfBirthInput(eventKey: string) {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
          How many children do you plan to have?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={eventKey}>
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
    );
  }

  renderChildStartegyInput(eventKey: string) {
    var eldestChildYoB = Math.max(
      ...this.state.children.map(child => child.yearOfBirth)
    );
    var nextYear = new Date().getFullYear() + 1;

    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
          How would you like to raise them?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            <Form>
              {eldestChildYoB + Calculator.MAX_CHILD_CARE_AGE >= nextYear && (
                <ChildCareStrategyInput
                  strategy={this.state.childStrategy}
                  onChange={this.props.onChange}
                />
              )}
              {eldestChildYoB + Calculator.MAX_K12_AGE >= nextYear && (
                <React.Fragment>
                  <K12StrategyInput
                    strategy={this.state.childStrategy}
                    onChange={this.props.onChange}
                  />
                  <AfterSchoolCareInput
                    strategy={this.state.childStrategy}
                    onChange={this.props.onChange}
                  />
                </React.Fragment>
              )}
              {eldestChildYoB + Calculator.MAX_CHILD_SUPPORT_AGE >=
                nextYear && (
                <ChildSupplyInput
                  strategy={this.state.childStrategy}
                  onChange={this.props.onChange}
                />
              )}
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  render() {
    return (
      <Accordion defaultActiveKey="yearsOfBirth">
        {this.renderYearsOfBirthInput("yearsOfBirth")}
        {this.renderChildStartegyInput("childStrategy")}
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

export class ChildCareStrategyInput extends Component<
  { strategy: ChildStrategy; onChange },
  ChildStrategy
> {
  constructor(props) {
    super(props);
    this.state = props.strategy;
  }

  onChange(value) {
    this.state.childCareStrategy = value;
    this.props.onChange();
  }
  render() {
    return (
      <FormGroup>
        {" "}
        <Form.Label>Child care (0-5 years)</Form.Label>
        <ToggleButtonGroup
          name="child_care"
          type="radio"
          value={this.state.childCareStrategy}
          onChange={this.onChange.bind(this)}
        >
          {Object.keys(ChildCareStrategy).map(strat => {
            if (!isNaN(Number(strat)))
              return (
                <ToggleButton
                  variant="outline-secondary"
                  size="sm"
                  value={Number(strat)}
                  key={strat}
                  style={{
                    width:
                      (100 / Object.keys(ChildCareStrategy).length) * 2 + "%"
                  }}
                >
                  {CHILD_CARE_TEXT[strat]}{" "}
                </ToggleButton>
              );
          })}
        </ToggleButtonGroup>
      </FormGroup>
    );
  }
}

export class K12StrategyInput extends Component<
  { strategy: ChildStrategy; onChange },
  ChildStrategy
> {
  constructor(props) {
    super(props);
    this.state = props.strategy;
  }

  onChange(value) {
    this.state.k12Strategy = value;
    this.props.onChange();
  }

  render() {
    return (
      <FormGroup>
        {" "}
        <Form.Label>K-12 education (6-18 years)</Form.Label>
        <Form.Row className="mx-0">
          <ToggleButtonGroup
            style={{ width: "100%" }}
            name="k12"
            type="radio"
            value={this.state.k12Strategy}
            onChange={this.onChange.bind(this)}
          >
            {Object.keys(K12Strategy).map(strat => {
              if (!isNaN(Number(strat)))
                return (
                  <ToggleButton
                    variant="outline-secondary"
                    size="sm"
                    value={Number(strat)}
                    key={strat}
                    style={{
                      width: (100 / Object.keys(K12Strategy).length) * 2 + "%"
                    }}
                  >
                    {K12_TEXT[strat]}{" "}
                  </ToggleButton>
                );
            })}
          </ToggleButtonGroup>
        </Form.Row>
      </FormGroup>
    );
  }
}

export class AfterSchoolCareInput extends Component<
  { strategy: ChildStrategy; onChange },
  ChildStrategy
> {
  constructor(props) {
    super(props);
    this.state = props.strategy;
  }

  onChange(value) {
    this.state.afterSchoolCare = Boolean(value);
    this.props.onChange();
  }

  render() {
    return (
      <FormGroup>
        {" "}
        <Form.Label>After school care (6-18 years)</Form.Label>
        <Form.Row className="mx-0">
          <ToggleButtonGroup
            style={{ width: "100%" }}
            name="k12"
            type="radio"
            value={this.state.afterSchoolCare}
            onChange={this.onChange.bind(this)}
          >
            <ToggleButton
              variant="outline-secondary"
              size="sm"
              value={false}
              style={{
                width: "50%"
              }}
            >
              No
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              size="sm"
              value={true}
              style={{
                width: "50%"
              }}
            >
              Yes
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Row>
      </FormGroup>
    );
  }
}

export class ChildSupplyInput extends Component<
  { strategy: ChildStrategy; onChange },
  ChildStrategy
> {
  constructor(props) {
    super(props);
    this.state = props.strategy;
  }

  onChange(event) {
    this.state.monthlySupply = new MonetaryAmount(Number(event.target.value));
    this.props.onChange();
  }
  render() {
    return (
      <FormGroup>
        {" "}
        <Form.Label>
          Monthly supplies (e.g. food, housing, transport, clothing, healthcare,
          extra-curriculars, summer camp, etc.)
        </Form.Label>
        <div className="mx-4">
          <RangeSlider
            variant="secondary"
            min={MONTHLY_CHILD_SUPPLY_MIN.amount}
            max={MONTHLY_CHILD_SUPPLY_MAX.amount}
            step={100}
            value={this.state.monthlySupply.amount}
            onChange={this.onChange.bind(this)}
            tooltip="on"
            tooltipLabel={value =>
              this.state.monthlySupply.currency + " " + d3.format(",")(value)
            }
          />
        </div>
      </FormGroup>
    );
  }
}
