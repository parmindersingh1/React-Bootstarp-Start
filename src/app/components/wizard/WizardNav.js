import React from 'react';

const WizardNav = (props) => {
    const { stepNumber, stepNames } = props;
    const currentStep = stepNames[stepNumber]
    return (
        // data-wizard-state="current"
        <div className="wizard-nav" >
            <div className="wizard-steps">
                {stepNames.map((step, index) => (
                    <div className="wizard-step" key={step.name}
                        data-wizard-type="step"
                        data-wizard-state={currentStep === step ? "current" : ""}>
                        <div className="wizard-wrapper">
                            <div className="wizard-number">{index + 1}</div>
                            <div className="wizard-label">
                                <div className="wizard-title">{step.name}</div>
                                <div className="wizard-desc">{step.description}</div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    );
}

export default WizardNav;