import "../../../components/wizard/wizard.css";

import React, { useState } from "react";
import { Wizard, WizardStep } from "../../../components/wizard/Wizard";

import ApiForm from "./steps/ApiForm";
import ApiInput from "./steps/ApiInput";
import ApiOutput from "./steps/ApiOutput";
import SubmissionStep from "./steps/submission/SubmissionStep";
import { apiValidate } from "./steps/ApiFormValidate";
import { Link } from "react-router-dom";

// import Toast from "../../../../utils/Toast";
// import { createConfig } from "../store/apiCrud";

// class ApiCreatePage extends Component {
//   handleSubmit = (data) => {
//     console.log("data", data);
//     createConfig(data).then(response => {
//       console.log("response", response)
//       Toast.successMsg("Api saved successfully");
//       this.props.history.push('/apis')
//     }).catch((err) => {
//       console.error(err);
//       Toast.errorMsg("something went wrong");
//     })

const stepNames = [
  { name: "Api Registry", description: "Registry Information" },
  { name: "Input", description: "Input Information" },
  { name: "Output", description: "Output Information" },
  { name: "Submission", description: "Review and Submit" },
];

const ApiCreatePage = (props) => {
  console.log(props)
  const [stepNumber, setStepNumber] = useState(0);
  const [api, setApi] = useState(null);
  const [inputType, setInputType] = useState(props.apiInfo.apiInputTypes || []);
  const [inputData, setInputData] = useState("");
  const [outputType, setOutputType] = useState(props.apiInfo.apiOutputTypes || []);
  const [outputData, setOutputData] = useState("");
  const [isApiUnique, setIsApiUnique] = useState(true);

  const updateInputTypes = (tag, form) => {
    form.setFieldValue("inputTypeSearch", tag);
    if (tag) {
      const inputOption = {
        name: tag.value,
        required: false,
      };
      const tempInputType = [...form.values.apiInputTypes, inputOption];
      setInputType(tempInputType);
      form.setFieldValue("apiInputTypes", tempInputType);
      setInputData(tag);
    }
  };

  const onDeleteInputType = (row, index, form) => {
    const filteredTypes = form.values.apiInputTypes.filter(
      (type, i) => i !== index
    );
    setInputType(filteredTypes);
    form.setFieldValue("apiInputTypes", filteredTypes);
  };

  const onDeleteOutputType = (row, index, form) => {
    const filteredTypes = form.values.apiOutputTypes.filter(
      (type, i) => i !== index
    );
    setOutputType(filteredTypes);
    form.setFieldValue("apiOutputTypes", filteredTypes);
  };

  const updateOutputTypes = (tag, form) => {
    form.setFieldValue("outputTypeSearch", tag);
    if (tag) {
      const outPutOption = {name: tag.value};
      const tempOutputType = [...form.values.apiOutputTypes, outPutOption];
      setOutputType(tempOutputType);
      form.setFieldValue("apiOutputTypes", tempOutputType);
      setOutputData(tag);
    }
  };

  const { apiInfo, onSubmitApi } = props;

  return (
    <><div className="row mb-1">
        <div className="col-lg-12 text-right">
          <Link
            color="danger"
            className="btn btn-primary"
            to="/apis"
           >
            <i className="feather icon-arrow-left"></i> Cancel
          </Link>
        </div>
      </div>
      <div>
        <Wizard
          stepNames={stepNames}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          initialValues={{ ...apiInfo }}
          onSubmit={async (values, actions) => {
            // sleep(300).then(() => console.log("Wizard submit", values))
            console.log("subvalues", values);
            onSubmitApi(values, actions, setStepNumber);
          }}
        >
          {/* Step 1 */}
          <WizardStep
            // validate={(values) => apiValidate(values, isApiUnique)}
            onSubmit={(values) => setApi(values)}
          >
            <ApiForm apiInfo={apiInfo} isApiUnique={isApiUnique} setIsApiUnique={setIsApiUnique} />
          </WizardStep>
          {/* End Step 1 */}

          {/* Step 1 */}
          <WizardStep
            // onSubmit={setApi}
            // onSubmit={() => console.log("Step1 onSubmit")}
            onSubmit={(values) => setApi(values)}
          >
            <ApiInput
              updateInputTypes={updateInputTypes}
              inputType={inputType}
              inputData={inputData}
              onDeleteType={onDeleteInputType}
              
            />
          </WizardStep>
          {/* End Step 1 */}
          <WizardStep
            onSubmit={(values) => setApi(values)}
            // onSubmit={() => console.log("Step1 onSubmit")}
          >
            <ApiOutput
              updateOutputTypes={updateOutputTypes}
              outputType={outputType}
              outputData={outputData}
              onDeleteType={onDeleteOutputType}
              
            />
          </WizardStep>

          {/* Step 3 */}
          <WizardStep>
            <SubmissionStep api={api} />
          </WizardStep>
          {/* End Step 3 */}
        </Wizard>
      </div>
    </>
  );
};

export default ApiCreatePage;
