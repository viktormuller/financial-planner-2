import { Household } from "./Household";
import { MonetaryAmount } from "./MonetaryAmount";

export class Calculator {
  startYear: number = new Date().getFullYear() + 1;
  static ANNUAL_CHILD_SUPPLY = new MonetaryAmount(12000);
  static MAX_CHILD_SUPPORT_AGE = 22;
  childCost(household: Household) {
    console.log("childCost calculation invoked");
    var childCost: MonetaryAmount[] = [];
    var maxYear = Math.max(
      ...household.children.map(child => child.yearOfBirth)
    );
    console.log("Maxyear: " + maxYear);
    //If there are any kids then calculate, otherwise return empty array.
    if (maxYear) {
      var endYear = maxYear + 22;
      for (let year: number = this.startYear; year <= endYear; year++) {
        var index = year - this.startYear;
        if (!childCost[index]) {
          childCost[index] = new MonetaryAmount();
        }
        for (let child of household.children) {
          console.log("New child analysed for year: " + year);
          if (
            child.yearOfBirth <= year &&
            child.yearOfBirth + Calculator.MAX_CHILD_SUPPORT_AGE >= year
          ) {
            childCost[index] = childCost[index].add(
              Calculator.ANNUAL_CHILD_SUPPLY
            );
          }
        }
        console.log(
          "Child cost for " +
            year +
            " after adding all children: " +
            childCost[index].amount
        );
      }
    }
    console.log("childCost for 2021: " + childCost[0].amount);
    return childCost;
  }
}
