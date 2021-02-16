import { Field, Formik, useFormikContext, useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { Input } from "../../../components/forms/Input";
import {
  allMainTypes,
  allSubTypes,
  getInputClasses,
  getInputNoPaddingClasses,
  isValidURL,
} from "../../../../utils/formUtils";
import Toast from "../../../../utils/Toast";
import axiosWithoutAuth from "../../../../store/axiosWithoutAuth";

const EventForm = ({
  // className,
  handleSubmit,
  loading,
  successMsg,
  event,
  isEdit,
}) => {
  const loadSchemaFile = async (schemaFile, setFieldValue) => {
    if (schemaFile) {
      if (!isValidURL(schemaFile)) {
        Toast.errorMsg("Invalid Url");
      }
      try {
        const { data } = await axiosWithoutAuth.get(schemaFile);
        console.log("data", data);
        populateSchema(data, setFieldValue);
        Toast.successMsg("Schema loaded succesfully");
      } catch (error) {
        console.log("errr1", error);
        Toast.errorMsg("Error fetching schema");
      }
    }
  };

  const populateSchema = (data, setFieldValue) => {
    const jsonData = {
      entities: [],
      entityProperties: {},
      properties: [],
    };

    data.properties.forEach((prop) => {
      jsonData.properties.push({
        name: prop.name,
        quantity: {
          type: prop.jfQuantity,
          subType: allSubTypes.includes(prop.jfQuantityChild)
            ? prop.jfQuantityChild
            : allMainTypes[prop.jfQuantity][0],
          SubTypes: allMainTypes[prop.jfQuantity],
        },
      });
    });

    data.entities.forEach((entity) => {
      jsonData.entities.push(entity.name);
      jsonData.entityProperties[entity.name] = entity.properties.map(
        (prop) => prop.name
      );
      entity.properties.forEach((prop) => {
        jsonData.properties.push({
          name: `${entity.name}.${prop.name}`,
          quantity: {
            type: prop.jfQuantity,
            subType: allSubTypes.includes(prop.jfQuantityChild)
              ? prop.jfQuantityChild
              : allMainTypes[prop.jfQuantity][0],
            SubTypes: allMainTypes[prop.jfQuantity],
          },
        });
      });
    });
    setFieldValue("logSchema", {
      ...jsonData,
    });
    setFieldValue("vertical", data.vertical);
    setFieldValue("interaction", data.interaction);
    setFieldValue("logName", data.log_name);
    setFieldValue(
      "input_topic",
      `${data.vertical}-${data.log_name}-${data.interaction}`
    );
  };

  const initialValues = () => {
    if (event) {
      return {
        name: event.name,
        schemaFile: event.schemaFile,
        vertical: event.vertical,
        interaction: event.interaction,
        logName: event.logName,
      };
    } else {
      return {
        name: "",
        schemaFile: "",
        vertical: "",
        interaction: "",
        logName: "",
        input_topic: "",
      };
    }
  };
  return (
    <>
      <Formik
        data-test="test-event-updated-Form"
        initialValues={initialValues()}
        validate={(values) => {
          const errors = {};

          if (!values.schemaFile) {
            errors.schemaFile = "Schema File is required";
          }
          if (!values.vertical) {
            errors.vertical = "Vertical is required";
          }
          if (!values.interaction) {
            errors.interaction = "Interaction is required";
          }

          if (!values.logName) {
            errors.logName = "Log name is required";
          }
          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          handleSubmit(values, setStatus, setSubmitting);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {status && (
              <div
                role="alert"
                className="mb-10 alert alert-custom alert-light-danger alert-dismissible"
              >
                <div className="alert-text font-weight-bold">{status}</div>
              </div>
            )}

            {successMsg && (
              <div
                role="alert"
                className="mb-10 alert alert-custom alert-light-primary alert-dismissible"
              >
                <div className="alert-text font-weight-bold">{successMsg}</div>
              </div>
            )}

            <Card>
              <CardHeader
                subheader="All fields are required"
                title="Create Event Registry"
              >
                <div className="d-flex align-items-center">
                  <div>
                    <CardTitle>
                      {isEdit ? "Update" : "Create"} Event Registry
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardBody>
                <div className="row">
                  <div className="col-lg-6 col-md-12 m-auto">
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Schema File
                      </label>
                      <div className="col-lg-9 col-xl-9 col-md-9 ">
                        <Field type="text" name="schemaFile" component={Input}>
                          {({ field, form, meta }) => (
                            <div>
                              <div className="d-flex">
                                <input
                                  type="url"
                                  {...field}
                                  className={`${getInputNoPaddingClasses(
                                    meta
                                  )}`}
                                  placeholder="Enter Url"
                                />

                                <label className="col-xl-3 col-lg-3 col-md-3 col-form-label">
                                  <button
                                    type="button"
                                    className="btn btn-info btn-sm"
                                    onClick={() =>
                                      loadSchemaFile(field.value, setFieldValue)
                                    }
                                  >
                                    Load File
                                  </button>
                                </label>
                              </div>
                              {meta.touched && meta.error && (
                                <div
                                  className="error invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Name
                      </label>
                      <div className="col-lg-9 col-xl-9">
                        <Field type="text" name="name" component={Input}>
                          {({ field, form, meta }) => (
                            <div>
                              <input
                                type="text"
                                {...field}
                                className={`${getInputClasses(meta)}`}
                                placeholder="Enter template name"
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

                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Vertical
                      </label>
                      <div className="col-lg-9 col-xl-9">
                        <Field
                          type="text"
                          name="vertical"
                          component={Input}
                          data-test="test-vertical"
                        >
                          {({ field, form, meta }) => (
                            <div>
                              <input
                                type="text"
                                {...field}
                                className={`${getInputClasses(meta)}`}
                                placeholder="Enter Vertical"
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

                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Interaction
                      </label>
                      <div className="col-lg-9 col-xl-9">
                        <Field
                          type="text"
                          name="interaction"
                          component={Input}
                          data-test="test-interaction"
                        >
                          {({ field, form, meta }) => (
                            <div>
                              <input
                                type="text"
                                {...field}
                                className={`${getInputClasses(meta)}`}
                                placeholder="Enter interaction"
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

                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Log Name
                      </label>
                      <div className="col-lg-9 col-xl-9">
                        <Field
                          type="text"
                          name="logName"
                          component={Input}
                          data-test="test-logName"
                        >
                          {({ field, form, meta }) => (
                            <div>
                              <input
                                type="text"
                                {...field}
                                className={`${getInputClasses(meta)}`}
                                placeholder="Enter log name"
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
                </div>
              </CardBody>
              <CardFooter>
                <div className="row">
                  <div className="col-md-12 text-right">
                    <Button type="submit" color="primary" variant="contained">
                      Save details
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EventForm;
