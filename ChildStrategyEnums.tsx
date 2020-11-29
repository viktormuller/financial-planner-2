import { MonetaryAmount } from "./MonetaryAmount";

export class ChildStrategy {
  childCareStrategy: ChildCareStrategy;
  k12Strategy: K12Strategy;
  afterSchoolCare: boolean;
  monthlySupply: MonetaryAmount;
}

export enum ChildCareStrategy {
  FAMILY,
  IN_HOME,
  DAYCARE,
  AU_PAIR,
  NANNY,
  NANNY_BIG_CITY
}

export const CHILD_CARE_TEXT = [
  "Family",
  "In-home daycare",
  "Daycare",
  "Au-pair",
  "Nanny",
  "Nanny in major city"
];

export const CHILD_CARE_COST = [
  new MonetaryAmount(0),
  new MonetaryAmount(7000 / 12),
  new MonetaryAmount(10000 / 12),
  new MonetaryAmount(14000 / 12),
  new MonetaryAmount(25000 / 12),
  new MonetaryAmount(40000 / 12)
];

export enum K12Strategy {
  PUBLIC,
  PRIVATE_REGULAR,
  PRIVATE_EXPENSIVE
}

export const K12_TEXT = ["Public", "Typical private", "High-end private"];

export const K12_COST = [
  new MonetaryAmount(0),
  new MonetaryAmount(12000 / 12),
  new MonetaryAmount(30000 / 12)
];

export const AFTER_SCHOOL_CARE_COST = new MonetaryAmount(10000 / 12);

export const MONTHLY_CHILD_SUPPLY_MIN = new MonetaryAmount(12000 / 12);
export const MONTHLY_CHILD_SUPPLY_MAX = new MonetaryAmount(24000 / 12);
