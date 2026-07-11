import { getData } from "../apiBase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOfficeBranches = () => getData<any>("/office-branches");
