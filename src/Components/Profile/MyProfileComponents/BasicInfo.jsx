import React from "react";
import "../Profile.css";

export default function BasicInfo(props) {
  return (
    <div className="basicInfo">
      <div class="row basicInfoRow">
        <div class="col-lg-4 col-sm-12">Hiring date:</div>
        <div class="col-lg-4 col-sm-12">ID:</div>
        <div class="col-lg-4 col-sm-12">Mobile number:</div>
      </div>
      <div class="row basicInfoRow">
        <div class="col-lg-4 col-sm-12">Direct manager:</div>
        <div class="col-lg-4 col-sm-12">Workgroup:</div>
        <div class="col-lg-4 col-sm-12">Function:</div>
      </div>
      <div class="row basicInfoRow">
        <div class="col-lg-4 col-sm-12">Cost Center:</div>
        <div class="col-lg-4 col-sm-12">Employment Type:</div>
      </div>
    </div>
  );
}
