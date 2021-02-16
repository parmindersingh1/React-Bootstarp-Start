import React from "react";

const SubmissionStep = (props) => {
  const { api } = props;
  console.log("apiData :: ", api);

  return (
    <div className="my-5 step">
      <div className="pb-5 mx-5">
        {/*begin::Section*/}
        <h4 className="mb-10 font-weight-bold text-dark">
          Review your Details and Submit
        </h4>
        <h6 className="font-weight-bolder mb-3">API Details:</h6>
        <div className="text-dark-50 line-height-lg">
          <div className="my-3">
            <strong className="mr-1">Api Name: </strong>
            {api.apiName}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api Version:</strong>{" "}
            {api.apiVersion}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api Path: </strong>
            {api.apiPath}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api Collection:</strong> {api.apiCollection}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api-Sub-Collection:</strong> {api.apiSubCollection}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api Input Types: </strong>
            {api.apiInputTypes.map((inputType, index) => (
              <span key={index}>
                {inputType.name}{" "}
                {index < api.apiInputTypes.length - 1 ? ",\u00A0" : ""}
              </span>
            ))}
          </div>
          <div className="my-3">
            <strong className="mr-1">Api Output Types:</strong>{" "}
            {api.apiOutputTypes.map((outputType, index) => (
              <span key={index}>
                {outputType.name}{" "}
                {index < api.apiOutputTypes.length - 1 ? ",\u00A0" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionStep;
