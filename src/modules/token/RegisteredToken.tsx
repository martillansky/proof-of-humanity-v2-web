import { PoHContract } from "enums/PoHContract";
import { parseEther } from "ethers/lib/utils";
import { useState } from "react";
import Field from "components/Field";
import Label from "components/Label";
import { TOKEN_CHAIN } from "constants/chains";
import { CONTRACT } from "constants/contracts";
import {
  useGCTAllowance,
  useGCTApprove,
  useGCTBalanceOf,
  useGCTMint,
} from "hooks/useGroupCurrencyToken";
import { useHubTokenToUser } from "hooks/useHub";
import { usePoHRedeem } from "hooks/usePoHTokenManager";
import {
  useTokenAllowance,
  useTokenApprove,
  useTokenBalanceOf,
} from "hooks/useToken";
import useWeb3 from "hooks/useWeb3";
import { formatEth } from "utils/misc";

interface RegisteredTokenProps {
  pohName: string;
  circlesToken: string;
}

const RegisteredToken: React.FC<RegisteredTokenProps> = ({
  pohName,
  circlesToken,
}) => {
  const { account } = useWeb3();

  const [myCirclesBalance] = useTokenBalanceOf(circlesToken, account);
  const [treasuryCirclesBalance] = useTokenBalanceOf(
    circlesToken,
    CONTRACT[PoHContract.POH_TOKEN_MANAGER][TOKEN_CHAIN]
  );

  const [circlesWallet] = useHubTokenToUser(circlesToken);

  const [myPoHBalance] = useGCTBalanceOf(account);
  const [otherPoHBalance] = useGCTBalanceOf(circlesWallet);

  const [tokensToMint, setTokensToMint] = useState(0);
  const [tokensToRedeem, setTokensToRedeem] = useState(0);

  const gctContract = CONTRACT[PoHContract.GROUP_CURRENCY_TOKEN][TOKEN_CHAIN];
  const pohtmContract = CONTRACT[PoHContract.POH_TOKEN_MANAGER][TOKEN_CHAIN];

  const [crcAllowance] = useTokenAllowance(circlesToken, account, gctContract);
  const [gctAllowance] = useGCTAllowance(account, pohtmContract);

  const mint = useGCTMint();
  const redeem = usePoHRedeem();
  const crcApprove = useTokenApprove(circlesToken);
  const gctApprove = useGCTApprove();

  const isSelf = !!account && account === circlesWallet;

  console.log({
    myPoHBalance: myPoHBalance?.toString(),
  });

  return (
    <div className="p-4 flex flex-col bg-emerald-50">
      <div className="p-6 bg-white">
        <div className="flex flex-col">
          {otherPoHBalance && (
            <span className="font-bold">
              {isSelf ? "You own " : pohName + " owns "}
              <code className="text-emerald-400 font-bold">
                {formatEth(otherPoHBalance, 2)}
              </code>{" "}
              <code className="font-bold">POH</code> Tokens
            </span>
          )}

          {myCirclesBalance && (
            <>
              <Label>
                You have{" "}
                <code className="font-bold">
                  {formatEth(myCirclesBalance, 2)}
                </code>{" "}
                {isSelf ? "" : "of " + pohName + "'s"} personal{" "}
                <code className="font-bold">CRC</code> you can use to mint{" "}
                <code className="font-bold">POH</code>.
              </Label>
              <div className="mb-4 flex">
                <Field
                  type="number"
                  placeholder="Number of tokens"
                  value={tokensToMint}
                  onChange={(e) => setTokensToMint(+e.target.value)}
                />
                {crcAllowance &&
                  (crcAllowance.gte(parseEther(tokensToMint.toString())) ? (
                    <button
                      className="btn-main ml-2 px-2 font-bold"
                      onClick={async () =>
                        await mint(
                          circlesToken,
                          parseEther(tokensToMint.toString())
                        )
                      }
                      disabled={!tokensToMint}
                    >
                      MINT
                    </button>
                  ) : (
                    <button
                      className="btn-main ml-2 px-2 font-bold"
                      onClick={async () =>
                        await crcApprove(
                          gctContract,
                          parseEther(tokensToMint.toString())
                        )
                      }
                    >
                      APPROVE
                    </button>
                  ))}
              </div>
            </>
          )}

          {treasuryCirclesBalance && myPoHBalance && (
            <>
              <Label>
                There are{" "}
                <code className="font-bold">
                  {formatEth(treasuryCirclesBalance, 2)}
                </code>{" "}
                of {isSelf ? "your" : pohName + "'s"} personal{" "}
                <code className="font-bold">CRC</code> in the treasury. You can
                use some of your{" "}
                <code className="font-bold">
                  {formatEth(myPoHBalance, 2)} POH
                </code>{" "}
                to redeem some.
              </Label>
              <div className="mb-4 flex">
                <Field
                  type="number"
                  placeholder="Number of tokens"
                  value={tokensToRedeem}
                  onChange={(e) => setTokensToRedeem(+e.target.value)}
                />

                {gctAllowance &&
                  (gctAllowance.gte(parseEther(tokensToRedeem.toString())) ? (
                    <button
                      className="btn-main ml-2 px-2 font-bold"
                      onClick={async () =>
                        await redeem(
                          circlesToken,
                          parseEther(tokensToRedeem.toString())
                        )
                      }
                      disabled={!tokensToRedeem}
                    >
                      REDEEM
                    </button>
                  ) : (
                    <button
                      className="btn-main ml-2 px-2 font-bold"
                      onClick={async () =>
                        await gctApprove(
                          pohtmContract,
                          parseEther(tokensToRedeem.toString())
                        )
                      }
                    >
                      APPROVE
                    </button>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredToken;
