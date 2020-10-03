/**
 * Display content only if user has admin role
 */
import React from "react";
import Guard from "./guard";
import { accountProperties } from "../../_helpers/accountProperties";

const ManagerGuard = (props) => {
  return (
    <Guard condition={accountProperties().roles?.includes("Manager")}>
      {props.children}
    </Guard>
  );
};
export default ManagerGuard;
