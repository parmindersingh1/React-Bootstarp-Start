import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import { Button } from 'reactstrap';
import WizardNav from './WizardNav';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
export const Wizard = ({
  children,
  initialValues,
  onSubmit,
  stepNames,
  stepNumber,
  setStepNumber,
  hideStepNames,
}) => {
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <div
      className={`wizard wizard-container wizard-${totalSteps}`}
      id='kt_wizard'
      data-wizard-clickable='true'
    >
      {!hideStepNames && (
        <WizardNav stepNumber={stepNumber} stepNames={stepNames} />
      )}
      <div className='card card-custom card-shadowless rounded-top-0'>
        <div className='card-body p-0'>
          <div className='row justify-content-center py-8 px-8 py-lg-15 px-lg-10'>
            <div className='col-xl-12 col-xxl-10'>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={step.props.validationSchema}
                validate={step.props.validate}
              >
                {(formik) => (
                  <Form className='form' noValidate={true} autoComplete='off'>
                    <div className='row justify-content-center'>
                      <div className='col-xl-9'>
                        {formik.status && (
                          <div
                            role='alert'
                            className='mb-10 alert alert-custom alert-light-danger alert-dismissible'
                          >
                            <div className='alert-text font-weight-bold'>
                              {formik.status}
                            </div>
                          </div>
                        )}
                        {/* <p>
                          Step {stepNumber + 1} of {totalSteps}
                        </p> */}
                        {step}
                        <div
                          style={{ display: 'flex' }}
                          className='d-flex justify-content-between border-top mt-5'
                        >
                          <div className='mr-2'>
                            {stepNumber > 0 && (
                              <Button
                                color='light-primary'
                                variant='contained'
                                className='mx-3 my-3'
                                onClick={() => previous(formik.values)}
                                type='button'
                              >
                                Back
                              </Button>
                            )}
                          </div>
                          <div>
                            <div>
                              <Button
                                color='primary'
                                variant='contained'
                                className='mx-3 my-3'
                                disabled={formik.isSubmitting}
                                type='submit'
                              >
                                {isLastStep ? 'Submit' : 'Next'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WizardStep = ({ children }) => children;
