import React, { Component } from "react";
import { MonetaryAmount } from "./MonetaryAmount";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

import * as d3 from "d3-format";
import { Button } from "react-bootstrap";

export class ChildCostGraphProps {
  data: MonetaryAmount[];
  startYear: number;
}

export class ChildCostGraph extends Component<
  ChildCostGraphProps,
  { show: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    var monthlyData = this.props.data.map((annualData, index) => {
      return {
        amount: Math.round(annualData.amount / 12 / 100) * 100,
        year: this.props.startYear + index
      };
    });

    return this.state.show ? (
      <React.Fragment>
        <div className="mb-n1">
          <input type="text" style={{ display: "none" }} autoFocus />
          <Button
            className="close"
            variant="secondary"
            aria-label="Close"
            onClick={() => this.setState({ show: false })}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
        <ResponsiveContainer aspect={1.5} className="mt-5">
          <BarChart data={monthlyData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip
              formatter={value => [
                d3.format(",.0f")(Number(value)),
                "Monthly cost: "
              ]}
            />
            <Legend />
            <Bar
              dataKey="amount"
              name="Monthly cost"
              fill="#6c757d"
              unit={this.props.data[0].currency}
            />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    ) : (
      <div className="my-5 text-center">
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          Show cost over time
        </Button>
      </div>
    );
  }
}
