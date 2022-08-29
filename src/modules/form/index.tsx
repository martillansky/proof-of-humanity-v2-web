import Steps from "components/Steps";
import React, { useReducer, useState } from "react";
import FormContext from "./context";
import { emptySubmission, submissionReducer } from "./reducer";
import InfoStep from "./Info";
import PhotoStep from "./Photo";
import ReviewStep from "./Review";
import VideoStep from "./Video";

const STEPS_LIST = ["Info", "Photo", "Video", "Review"];

const Form: React.FC = () => {
  const [tookNotice, setTookNotice] = useState(false);
  const [state, dispatch] = useReducer(submissionReducer, emptySubmission);
  const [step, setStep] = useState(3);

  return (
    <>
      <Steps list={STEPS_LIST} current={step} setCurrent={setStep} />

      <FormContext.Provider
        value={{
          state,
          dispatch,
          setStep,
          advance: () => setStep((s) => Math.min(s + 1, STEPS_LIST.length - 1)),
          tookNotice,
          setTookNotice,
        }}
      >
        {step === 0 && <InfoStep />}
        {step === 1 && <PhotoStep />}
        {step === 2 && <VideoStep />}
        {step === 3 && <ReviewStep />}
      </FormContext.Provider>
    </>
  );
};

export default Form;
