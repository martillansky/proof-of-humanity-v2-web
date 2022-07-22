import ALink from "components/ALink";
import Steps from "components/Steps";
import useWeb3 from "hooks/useWeb3";
import { InfoStep, PhotoStep, ReviewStep, VideoStep } from "modules/Form";
import FormContext from "modules/Form/context";
import React, { useState } from "react";
import { injected } from "utils/connectors";

const STEPS_LIST = ["Info", "Selfie", "Video", "Review"];

const Claim: React.FC = () => {
  const { account, activate } = useWeb3();
  const tookNoticeState = useState(false);
  const photoUriState = useState("");
  const nameState = useState("");
  const bioState = useState("");
  const [step, setStep] = useState(0);

  return (
    <div className="mx-auto my-16 p-8 w-3/5 flex flex-col justify-center items-center border rounded shadow">
      {account ? (
        <>
          <Steps list={STEPS_LIST} current={step} />

          <FormContext.Provider
            value={{
              advance: () =>
                setStep((s) => Math.min(s + 1, STEPS_LIST.length - 1)),
              previous: () => setStep((s) => Math.max(0, s - 1)),
              tookNoticeState,
              photoUriState,
              nameState,
              bioState,
            }}
          >
            {step === 0 && <InfoStep />}
            {step === 1 && <PhotoStep />}
            {step === 2 && <VideoStep />}
            {step === 3 && <ReviewStep />}
          </FormContext.Provider>
        </>
      ) : (
        <>
          <span className="text-3xl font-bold mb-4">
            Create your Proof of Humanity profile
          </span>
          <span className="font-semibold">
            You don't have a wallet connected to the website
          </span>

          <button
            className="m-4 px-8 py-2 bg-orange text-white rounded-full shadow"
            onClick={() => activate(injected)}
          >
            Connect wallet
          </button>

          <span>
            Don't have a wallet? Click{" "}
            <ALink
              className="text-blue-500"
              href="https://ethereum.org/en/wallets/find-wallet/"
            >
              here
            </ALink>{" "}
            to learn on how to create one!
          </span>
        </>
      )}
    </div>
  );
};

export default Claim;
