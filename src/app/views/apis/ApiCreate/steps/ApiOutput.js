import React, { useState } from "react";

import AsyncSelect from "react-select/async";
import { Field } from "formik";
import { Input } from "../../../../components/forms/Input";
import OutputTypeTable from "../steps/types-table/OutputTypeTable";
import PropTypes from "prop-types";
import { getInputClasses } from "../../../../../utils/formUtils";
import { searchInputType } from "../../store/apiCrud";

const ApiOutput = (props) => {
  const [tableLength, setTableLength] = useState(false);

  const { updateOutputTypes, outputType, outputData, onDeleteType } = props;

  // const updateOutputTypes = (tags, setFieldValue) => {
  //   setFieldValue('outputTypeSearch', tags);
  //   setOutputType([tags.value])
  // };

  const handleSearchOutput = (inputValue) => {
    if (!inputValue || inputValue.length < 3) return Promise.resolve([]);
    return new Promise((resolve) => {
      console.log(inputValue);

      searchInputType(inputValue)
        .then((resp) => {
          console.log("resp for search expert", resp);
          // resolve(
          //   resp.data.map((protoName) => ({
          //     label: protoName,
          //     value: protoName,
          //   }))
          const result = Array.isArray(resp.data) ? resp.data : [resp.data];
          resolve(
            result.map((proto) => ({
              label: proto,
              value: proto,
            }))
          );
        })
        .catch((err) => {
          resolve([]);
        });
    });
  };
  return (
    <>
      <div className=" mt-5 mx-5" data-test="apiOutput">
        <div className="form-group row">
          <label className="col-xl-3 col-lg-3 col-md-3">Output Type</label>
          <div className=" col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <Field
              name="outputTypeSearch"
              placeholder="Search output type"
              label="Search output type"
            >
              {({ field, form, meta }) => (
                <>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={handleSearchOutput}
                    //   onChange={setExpert}
                    // isMulti
                    value={""}
                    onChange={(tags) => updateOutputTypes(tags, form)}
                    placeholder="Search..."
                    noOptionsMessage={() => "No match"}
                    isSearchable
                  />
                  {meta.touched && meta.error && (
                    <div className="error invalid-feedback">{meta.error}</div>
                  )}
                </>
              )}
            </Field>
          </div>
        </div>
        {outputType && outputType.length > 0 && (
          <div className="mt-5 mb-5">
            <OutputTypeTable
              outputType={outputType}
              onDeleteType={onDeleteType}
            />
          </div>
        )}
        {outputType && outputType.length > 1 && (
          <div className="mt-5 mb-5" data-test="splitterStrategy">
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Splitter Strategy
              </label>
              <div className="col-lg-9 col-xl-9">
                <Field type="text" name="splitterStrategy" component={Input}>
                  {({ field, form, meta }) => (
                    <div>
                      <select
                        data-placeholder="Splitter Strategy"
                        // className="form-control"
                        {...field}
                        className={`${getInputClasses(meta)}`}
                      >
                        <option value="">Select</option>
                        <option value="SIMPLE_SPLIT">SIMPLE SPLIT</option>
                        <option value="COMPLEX_SPLIT">COMPLEX SPLIT</option>
                      </select>
                      {meta.touched && meta.error && (
                        <div className="error invalid-feedback">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
ApiOutput.propTypes = {
  updateOutputTypes: PropTypes.func,
  outputType: PropTypes.array,
  outputData: PropTypes.string,
  onDeleteType: PropTypes.func,
};

export default ApiOutput;
