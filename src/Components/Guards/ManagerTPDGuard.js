/**
 * Display content only if user has admin role
 */
import React from "react";
import Guard from "./guard";
import { accountProperties } from "../../_helpers/accountProperties";

const ManagerTPDGuard = (props) => {
  return (
    <Guard
      condition={
        accountProperties().roles?.includes("Manager") ||
        accountProperties().roles?.includes("TPD Team")
      }
    >
      {props.children}
    </Guard>
  );
};
export default ManagerTPDGuard;
