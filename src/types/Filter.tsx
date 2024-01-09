import ReadonlyCar from "./ReadonlyCar";

export type Filter = {
    field: keyof ReadonlyCar;
    isDesc: boolean;
};
