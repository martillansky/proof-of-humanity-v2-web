import React, { useState } from "react";
import CirclesLogo from "assets/images/circles-logo.png";
import Image from "components/Image";
import { HumanityQuery } from "generated/graphql";
import { useGCTMember } from "hooks/useGroupCurrencyToken";
import { usePoHIdToToken } from "hooks/usePoHTokenManager";
import NotRegisteredToken from "./NotRegisteredToken";
import RegisteredToken from "./RegisteredToken";

interface TokenAccordionProps {
  humanity: NonNullable<HumanityQuery["humanity"]>;
}

const TokenAccordion: React.FC<TokenAccordionProps> = ({ humanity }) => {
  const [showCircles, setShowCircles] = useState(false);

  const [confirmedToken] = usePoHIdToToken(humanity.id);
  const [isGroupMember] = useGCTMember(confirmedToken);

  return (
    <div className="w-full p-8">
      <div
        className="w-full flex justify-between items-center mt-4 py-2 px-4 bg-emerald-50 font-normal cursor-pointer"
        onClick={() => setShowCircles((o) => !o)}
      >
        <span className="flex items-center">
          <Image uri={CirclesLogo} className="h-8 w-8 mr-2" />
          PoH Group Currency
        </span>
        <span className="ml-auto text-3xl text-emerald-400">+</span>
      </div>

      {showCircles &&
        (isGroupMember ? (
          confirmedToken && (
            <RegisteredToken pohName={"Bob"} circlesToken={confirmedToken} />
          )
        ) : (
          <NotRegisteredToken humanityId={humanity.id} />
        ))}
    </div>
  );
};

export default TokenAccordion;
