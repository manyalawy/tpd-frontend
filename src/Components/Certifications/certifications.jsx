import React, { useState } from "react";
import Providers from "./CertificationCompnents/providers";
import Certification from "./CertificationCompnents/certificates";

export default function Certifications() {
  return (
    <div>
      <Providers />
      <Certification />
    </div>
  );
}
