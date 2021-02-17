import { Field } from "formik";
import React, { useEffect, useState } from "react";
import Creatable from "react-select/creatable";
import { Input } from "../../../../components/forms/Input";
import { Select } from "../../../../components/forms/Select";
import { getInputClasses } from "../../../../../utils/formUtils";
import { checkIfApiExists } from "../../../../../store/api-registry/apiRegistryCrud";
import PropTypes from "prop-types";

const ApiForm = ({ apiInfo, isApiUnique, setIsApiUnique }) => {
  const [subCollection, setSubCollection] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const customStyles = {
    control: () => ({
      display: "flex",
      flexDirection: "row",
    }),
  };

  useEffect(() => {
    if (apiInfo && apiInfo.tags)
      setTags(apiInfo.tags.map((tag) => ({ label: tag, value: tag })));

    if (apiInfo && apiInfo.apiCollection)
      getSubApiCollection(apiInfo.apiCollection);
  }, [apiInfo]);

  const updateTags = (tags, setFieldValue) => {
    setTags(tags);
    setFieldValue("tags", tags);
  };

  const getSubApiCollection = (value) => {
    if (value === "common") {
      setSubCollection([
        {
          id: "2",
          value: "vision",
          name: "Vision",
        },
        {
          id: "3",
          value: "language",
          name: "Language",
        },
        {
          id: "4",
          value: "text",
          name: "Text",
        },
      ]);
    } else if (value === "health") {
      setSubCollection([
        {
          id: "5",
          value: "xray",
          name: "X-Ray",
        },
        {
          id: "6",
          value: "irishScan",
          name: "Irish Scan",
        },
      ]);
    } else {
      setSubCollection([
        {
          id: "7",
          value: "callDrop",
          name: "Call Drop",
        },
        {
          id: "8",
          value: "paymentFraud",
          name: "Payment Fraud",
        },
      ]);
    }
  };

  return (
    <>
      <div className="row mt-5 mx-5" data-test="apiForm">
        <div className="col-lg-9 col-md-12 m-auto">
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Api Name</label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="apiName" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)} ${
                        isApiUnique ? "" : "is-invalid"
                      }`}
                      placeholder="Enter api name"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Api Version
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="apiVersion" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)} ${
                        isApiUnique ? "" : "is-invalid"
                      }`}
                      placeholder="Enter Api Version"
                      onBlur={(ev) => {
                        form.handleBlur(ev);
                        checkIfApiExists(
                          form.values.apiName,
                          form.values.apiVersion,
                          apiInfo.id
                        )
                          .then((response) => {
                            console.log("response", response);
                            if (!response.data) {
                              setIsApiUnique(false);
                              form.setErrors({
                                apiName: "Api and version already exists",
                                apiVersion: "Api and version already exists",
                              });
                            } else {
                              setIsApiUnique(true);
                            }
                          })
                          .catch((err) => {
                            console.log("err", err);
                          });
                      }}
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Api Path</label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="apiPath" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter api path"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Git Url</label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="gitUrl" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter git url"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Git Folder
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="gitFolder" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter git folder"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Git Token
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="gitToken" component={Input}>
                {({ field, form, meta }) => (
                  <div>
                    <input
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter git token"
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Api Collection
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="apiCollection" component={Select}>
                {({ field, form, meta }) => (
                  <div>
                    <select
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                      // onClick={(e) => getSubApiCollection(e)}
                      onChange={(e) => {
                        getSubApiCollection(e.currentTarget.value);
                        form.setFieldValue(
                          "apiCollection",
                          e.currentTarget.value
                        );
                      }}
                    >
                      <option value="" disabled>
                        Select api collection
                      </option>
                      <option value="common">Common</option>
                      <option value="health">Health</option>
                      <option value="telecom">Telecom</option>
                    </select>
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Api Sub Collection
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="apiSubCollection" component={Select}>
                {({ field, form, meta }) => (
                  <div>
                    <Select
                      type="text"
                      {...field}
                      className={`${getInputClasses(meta)}`}
                    >
                      <option value="" disabled>
                        Select sub collection
                      </option>
                      {subCollection && subCollection.length > 0 ? (
                        subCollection.map((collection) => (
                          <option key={collection.id} value={collection.value}>
                            {collection.name}
                          </option>
                        ))
                      ) : (
                        <option>Select api selection first</option>
                      )}
                    </Select>
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Search tags
            </label>
            <div className="col-lg-9 col-xl-9">
              <Field type="text" name="tags" component={Creatable}>
                {({ field, form: { setFieldValue }, meta }) => (
                  <div>
                    <Creatable
                      {...field}
                      styles={customStyles}
                      components={{
                        DropdownIndicator: null,
                      }}
                      // menuIsOpen={false}
                      isMulti
                      className={`${getInputClasses(meta)}`}
                      placeholder="Enter tags"
                      value={tags}
                      inputValue={inputValue}
                      onInputChange={setInputValue}
                      onChange={(tags) => updateTags(tags, setFieldValue)}
                    />
                    {meta.touched && meta.error && (
                      <div className="error invalid-feedback">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ApiForm.propTypes = {
  apiInfo: PropTypes.object,
  isApiUnique: PropTypes.bool,
  setIsApiUnique: PropTypes.func,
};

export default ApiForm;
