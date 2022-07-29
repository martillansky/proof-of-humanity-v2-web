import { createContext, useContext } from "react";

interface FormContextValues {
  advance: () => void;
  previous: () => void;
  tookNoticeState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  photoUriState: [string, React.Dispatch<React.SetStateAction<string>>];
  videoUriState: [string, React.Dispatch<React.SetStateAction<string>>];
  nameState: [string, React.Dispatch<React.SetStateAction<string>>];
  bioState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const FormContext = createContext<FormContextValues>({
  advance: () => {},
  previous: () => {},
  tookNoticeState: [false, () => {}],
  photoUriState: ["", () => {}],
  videoUriState: ["", () => {}],
  nameState: ["", () => {}],
  bioState: ["", () => {}],
});

export const useFormContext = () => useContext(FormContext);
export default FormContext;
