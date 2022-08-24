import ALink from "components/ALink";
import useWeb3 from "hooks/useWeb3";
import SubmissionForm from "modules/Form";
import React from "react";
import { injected } from "utils/connectors";

const Claim: React.FC = () => {
  const { account, activate } = useWeb3();

  return (
    <div
      className="mx-auto mt-8 mb-16 px-4 py-4 w-11/12
                 sm:mt-12 sm:px-8 sm:py-6 sm:w-5/6
                 lg:mt-16 lg:px-10 lg:py-6 lg:w-3/5
                 flex flex-col
                 border rounded bg-white shadow"
    >
      {account ? (
        <SubmissionForm />
      ) : (
        <>
          <span className="text-3xl font-bold mb-4">
            Create your Proof of Humanity profile
          </span>
          <span className="font-semibold">
            You don't have a wallet connected to the website
          </span>

          <button
            className="m-4 px-8 py-2 bg-orange-500 text-white rounded-full shadow"
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
