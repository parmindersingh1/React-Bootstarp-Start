import React, { useState } from "react";

import AsyncSelect from "react-select/async";
import { Field } from "formik";
import { Input } from "../../../../components/forms/Input";
import InputTypeTable from "../steps/types-table/InputTypeTable";
import PropTypes from "prop-types";
import { getInputClasses } from "../../../../../utils/formUtils";
import { searchInputType } from "../../store/apiCrud";

const ApiInput = (props) => {
  const [tableLength, setTableLength] = useState(false);

  const { updateInputTypes, inputType, inputData, onDeleteType } = props;

  // const updateInputTypes = (tags, setFieldValue) => {
  //   // console.log(tags.length);
  //   // if (tags) {
  //   //   setTableLength();
  //   //   console.log(tags);
  //   //   setInputType([
  //   //     {
  //   //       type: 'Plain Text',
  //   //       required: 'Yes',
  //   //     },
  //   //     {
  //   //       type: 'Upper case',
  //   //       required: 'Yes',
  //   //     },
  //   //   ]);
  //   // } else {
  //   //   setInputType(false);
  //   // }
  //   setFieldValue('inputTypeSearch', tags);
  //   setInputType([tags.value])
  //   console.log("hdhhd", tags)
  // };

  const handleSearchInput = (inputValue) => {
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
          console.log(result);
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
      <div className=" mt-5 mx-5" data-test="apiInput">
        <div className="form-group row">
          <label className="col-xl-3 col-lg-3 col-md-3">Input Type</label>
          <div className=" col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <Field
              name="inputTypeSearch"
              placeholder="Search input type"
              label="Search input type"
            >
              {({ field, form, meta }) => (
                <>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={handleSearchInput}
                    // isMulti
                    value={""}
                    placeholder="Search..."
                    noOptionsMessage={() => "No match"}
                    isSearchable
                    onChange={(tags) => updateInputTypes(tags, form)}
                  />

                  {meta.touched && meta.error && (
                    <div className="error invalid-feedback">{meta.error}</div>
                  )}
                </>
              )}
            </Field>
          </div>
        </div>
        {inputType && inputType.length > 0 && (
          <div className="mt-5 mb-5">
            <InputTypeTable inputType={inputType} onDeleteType={onDeleteType} />
          </div>
        )}
        {inputType && inputType.length > 1 && (
          <>
            <div className="mt-5 mb-5" data-test="joiningStrategy">
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Joining Strategy
                </label>
                <div className="col-lg-9 col-xl-9">
                  <Field type="text" name="joiningStrategy" component={Input}>
                    {({ field, form, meta }) => (
                      <div>
                        <select
                          data-placeholder="Joining Strategy"
                          // className="form-control"
                          {...field}
                          className={`${getInputClasses(meta)}`}
                        >
                          <option value="">Select</option>
                          <option value="SIMPLE_JOIN">SIMPLE JOIN</option>
                          <option value="COMPLEX_JOIN">COMPLEX JOIN</option>
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
            <div className="mt-5 mb-5" data-test="jfJoinerTimeOut">
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Joiner timeout (Secs)
                </label>
                <div className="col-lg-9 col-xl-9">
                  <Field type="number" name="jfJoinerTimeOut" component={Input}>
                    {({ field, form, meta }) => (
                      <div>
                        <input
                          type="number"
                          {...field}
                          className={`${getInputClasses(meta)}`}
                        />
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
          </>
        )}
      </div>
    </>
  );
};
ApiInput.propTypes = {
  updateInputTypes: PropTypes.func,
  inputType: PropTypes.array,
  inputData: PropTypes.string,
  onDeleteType: PropTypes.func,
};

export default ApiInput;
