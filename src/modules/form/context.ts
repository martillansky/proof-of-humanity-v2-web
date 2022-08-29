import { SetStateAction } from "jotai";
import { createContext, Dispatch, useContext } from "react";
import { emptySubmission, SubmissionAction, SubmissionInfo } from "./reducer";

interface FormContextValues {
  state: SubmissionInfo;
  dispatch: Dispatch<SubmissionAction>;
  advance: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  tookNotice: boolean;
  setTookNotice: Dispatch<SetStateAction<boolean>>;
}

const FormContext = createContext<FormContextValues>({
  state: emptySubmission,
  dispatch: () => {},
  advance: () => {},
  setStep: () => {},
  tookNotice: false,
  setTookNotice: () => {},
});

export const useFormContext = () => useContext(FormContext);
export default FormContext;
