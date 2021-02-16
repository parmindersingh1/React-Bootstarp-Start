import React from "react";
import { Formik } from "formik";

export function ApisFilter({ applyFilter, initialValues }) {
  return (
    <>
      <Formik
        data-test="ApisFilter"
        initialValues={initialValues}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row mb-0">
              <div className="col-lg-1  align-self-center text-center">
                <label className="font-weight-bold">Filter:</label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="query"
                  placeholder="Search..."
                  autoComplete="off"
                  onBlur={handleBlur}
                  value={values.query}
                  onChange={(e) => {
                    setFieldValue("query", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
