/**
 * Display content only if user has admin role
 */
import React from "react";
import Guard from "./guard";
import { accountProperties } from "#Helpers";

const TPDGuard = (props) => {
  return (
    <Guard condition={accountProperties().roles?.includes("TPD Team")}>
      {props.children}
    </Guard>
  );
};
export default TPDGuard;
