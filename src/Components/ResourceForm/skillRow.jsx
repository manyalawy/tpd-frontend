import React from "react";

export default function Row(props) {
  return (
    <tr>
      <td>{props.cat}</td>
      <td>{props.sub}</td>
    </tr>
  );
}
