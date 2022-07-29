import ALink from "components/ALink";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import useWeb3 from "hooks/useWeb3";
import React from "react";
import { useFormContext } from "./context";

const Info: React.FC = () => {
  const { account } = useWeb3();
  const { tookNoticeState, nameState, bioState, advance } = useFormContext();
  const [tookNotice, setTookNotice] = tookNoticeState;

  const [name, setName] = nameState;
  const [bio, setBio] = bioState;

  return (
    <>
      <span className="text-3xl font-bold my-8">
        Create your Proof of Humanity profile
      </span>

      <span className="mb-8">
        Submitting your profile to Proof of Humanity takes an average of 5-10
        minutes, an existing Ethereum account and requires you to record a video
        of yourself talking.
      </span>

      <span>Your connected wallet is:</span>
      <div className="px-4 py-2 border-2 border-orange rounded-full font-bold">
        {account}
      </div>

      <ALink className="font-bold text-blue-500" href="https://tornado.cash">
        Learn how to increase your privacy with Tornado Cash
      </ALink>

      <div>
        <Checkbox
          id="notice"
          checked={tookNotice}
          handler={() => setTookNotice((c) => !c)}
        />
        <label htmlFor="notice" className="">
          I understand this wallet will be irreversebly linked to my real world
          person and I will not use that wallet for any private or sensitive
          information.
        </label>
      </div>

      {/* {tookNotice && ( */}
      <>
        <span className="text-3xl font-bold my-8">Basic information</span>

        <span>
          Registering to Proof of Humanity requires you to set a name. You can
          use a pseudonym if you feel more comfortable.
        </span>

        <span className="mt-4 mb-2 font-bold">Display Name</span>
        <input
          className="p-2 border rounded"
          placeholder="Name in which you are known"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <span className="mt-4 mb-2 font-bold">Short bio</span>
        <input
          className="p-2 border rounded"
          placeholder="short bio (ex: Cypherpunk, smart contract developer)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <div className="m-4">
          <Button onClick={advance}>Advance</Button>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default Info;
