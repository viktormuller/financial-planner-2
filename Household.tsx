import { Child } from "./Child";
import {
  ChildCareStrategy,
  ChildStrategy,
  K12Strategy
} from "./ChildStrategyEnums";
import { MonetaryAmount } from "./MonetaryAmount";

export class Household {
  children: Child[] = [];
  childStrategy: ChildStrategy = {
    childCareStrategy: ChildCareStrategy.DAYCARE,
    k12Strategy: K12Strategy.PRIVATE_REGULAR,
    afterSchoolCare: false,
    annualSupply: new MonetaryAmount(18000)
  };
}
