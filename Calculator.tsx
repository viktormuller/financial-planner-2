import {
  AFTER_SCHOOL_CARE_COST,
  CHILD_CARE_COST,
  K12_COST
} from "./ChildStrategyEnums";
import { Household } from "./Household";
import { MonetaryAmount } from "./MonetaryAmount";

export class Calculator {
  startYear: number = new Date().getFullYear() + 1;
  static ANNUAL_CHILD_SUPPLY = new MonetaryAmount(12000 / 12);
  static MAX_CHILD_SUPPORT_AGE = 22;
  static MAX_CHILD_CARE_AGE = 5;
  static MIN_K12_AGE: number = 6;
  static MAX_K12_AGE: number = 18;
  childCost(household: Household) {
    console.log("childCost calculation invoked");
    console.log(
      "Child care strategy: " + household.childStrategy.childCareStrategy
    );
    var childCost: MonetaryAmount[] = [];
    var maxYear = Math.max(
      ...household.children.map(child => child.yearOfBirth)
    );
    //If there are any kids then calculate, otherwise return empty array.
    if (maxYear) {
      var endYear = maxYear + 22;
      for (let year: number = this.startYear; year <= endYear; year++) {
        var index = year - this.startYear;
        if (!childCost[index]) {
          childCost[index] = new MonetaryAmount();
        }
        for (let child of household.children) {
          //Child supply cost
          if (
            child.yearOfBirth <= year &&
            child.yearOfBirth + Calculator.MAX_CHILD_SUPPORT_AGE >= year
          ) {
            childCost[index] = childCost[index].add(
              household.childStrategy.monthlySupply
            );
          }

          //ChildCare cost
          if (
            child.yearOfBirth <= year &&
            child.yearOfBirth + Calculator.MAX_CHILD_CARE_AGE >= year
          ) {
            childCost[index] = childCost[index].add(
              CHILD_CARE_COST[household.childStrategy.childCareStrategy]
            );
          }

          //K12 cost + after school care
          if (
            child.yearOfBirth + Calculator.MIN_K12_AGE <= year &&
            child.yearOfBirth + Calculator.MAX_K12_AGE >= year
          ) {
            childCost[index] = childCost[index].add(
              K12_COST[household.childStrategy.k12Strategy]
            );
            if (household.childStrategy.afterSchoolCare)
              childCost[index] = childCost[index].add(AFTER_SCHOOL_CARE_COST);
          }
        }
      }
    }
    return childCost;
  }
}
