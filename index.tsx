import React, { Component } from "react";
import { Navbar, Row, Container, Col } from "react-bootstrap";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Household } from "./Household";
import { Child } from "./Child";
import { HouseholdInput } from "./HouseholdInput";
import { Calculator } from "./Calculator";
import { MonetaryAmount } from "./MonetaryAmount";

interface AppProps {}
interface AppState {
  household: Household;
  financials: { childCost: MonetaryAmount[] };
}

class App extends Component<AppProps, AppState> {
  recalcTimeout: number;
  calculator: Calculator = new Calculator();

  constructor(props) {
    super(props);
    var household = new Household();
    household.children.push(new Child(2022));
    this.state = {
      household: household,
      financials: { childCost: this.calculator.childCost(household) }
    };
  }

  renderOutput() {
    var firstYearCost = this.state.financials.childCost[0];

    return (
      <div className="text-center align-middle">
        {firstYearCost && firstYearCost.amount > 0
          ? "Child cost in " +
            this.calculator.startYear +
            ": " +
            firstYearCost.amount
          : "No child cost in first year."}
      </div>
    );
  }

  onChange() {
    if (this.recalcTimeout) clearTimeout(this.recalcTimeout);

    this.setState({ household: this.state.household });
    this.recalcTimeout = setTimeout(() => {
      this.setState({
        financials: {
          childCost: this.calculator.childCost(this.state.household)
        }
      });
    }, 500);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>How much does it cost to raise a child?</Navbar.Brand>
        </Navbar>
        <Container className="mt-2">
          <Row>
            <Col xs={6}>
              <HouseholdInput
                household={this.state.household}
                onChange={this.onChange.bind(this)}
              />
            </Col>
            <Col xs={6}>{this.renderOutput()}</Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
