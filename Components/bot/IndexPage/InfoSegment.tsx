import React, { ReactElement } from "react";

interface Props {}

export default function InfoSegment({}: Props): ReactElement {
  return (
    <div
      style={{ height: "100vh", backgroundColor: "rgba(127,255,242,1)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="row">
        <div className="column ">
          <h1>Heading</h1>
        </div>
      </div>
    </div>
  );
}
