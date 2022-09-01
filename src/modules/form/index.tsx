import {
  BigNumber,
  isBigNumberish,
} from "@ethersproject/bignumber/lib/bignumber";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Steps from "components/Steps";
import useWeb3 from "hooks/useWeb3";
import InfoStep from "./Info";
import PhotoStep from "./Photo";
import ReviewStep from "./Review";
import VideoStep from "./Video";
import FormContext from "./context";
import { emptySubmission, submissionReducer } from "./reducer";

const STEPS_LIST = ["Info", "Photo", "Video", "Review"];

const Form: React.FC = () => {
  const { soul } = useParams();
  const { account } = useWeb3();
  const nav = useNavigate();

  const [tookNotice, setTookNotice] = useState(false);
  const [state, dispatch] = useReducer(submissionReducer, emptySubmission);
  const [step, setStep] = useState(3);

  useEffect(() => {
    if (soul && BigNumber.from(soul).isZero()) nav("/claim");
  }, []);

  if (soul && !isBigNumberish(soul))
    return (
      <div className="m-auto flex flex-col text-center">
        <span className="font-semibold">Invalid soul ID:</span>
        <span className="text-6xl font-light text-[#ff9966]">{soul}</span>
      </div>
    );

  return (
    <>
      <Steps list={STEPS_LIST} current={step} setCurrent={setStep} />

      <FormContext.Provider
        value={{
          state: {
            ...state,
            soulId: soul || BigNumber.from(account).toString(),
          },
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
