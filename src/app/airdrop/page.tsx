"use client";

import withClientConnected from "components/high-order/withClientConnected";
import useWeb3Loaded from "hooks/useWeb3Loaded";
import { formatEth } from "utils/misc";
import { Address, parseAbiItem } from "viem";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useToken,
} from "wagmi";

const AIRDROP_ADDRESS = "0xdFC61e593EaCce0C62d74C6Af95D3802D99940CC" as Address;

export default withClientConnected(function Airdrop({}) {
  const web3loaded = useWeb3Loaded();
  const { address } = useAccount();
  const { data: redeemable } = useContractRead({
    abi: [
      parseAbiItem(
        "function redeemable(address,bytes calldata) view returns (uint)"
      ),
    ],
    address: AIRDROP_ADDRESS,
    functionName: "redeemable",
    args: [address!, "0x"],
  });
  const { data: tokenAddress } = useContractRead({
    abi: [parseAbiItem("function token() external view returns (address)")],
    address: AIRDROP_ADDRESS,
    functionName: "token",
  });
  const { data: token } = useToken({ address: tokenAddress });
  const { data: total } = useBalance({
    address: AIRDROP_ADDRESS,
    token: tokenAddress,
  });
  const { data: balance } = useBalance({
    address,
    token: tokenAddress,
  });

  const { config } = usePrepareContractWrite({
    abi: [parseAbiItem("function redeem(bytes calldata data)")],
    address: AIRDROP_ADDRESS,
    functionName: "redeem",
    args: ["0x"],
    enabled: !!redeemable,
  });
  const { write } = useContractWrite(config);

  if (!web3loaded || !token) return null;

  return (
    <div className="my-16 font-bold centered flex-col text-slate-800">
      {redeemable
        ? `To claim: ${formatEth(redeemable)} ${token.symbol}`
        : balance &&
          `Redeemed. You own ${formatEth(balance.value)} ${token.symbol}!`}
      <button className="btn-main mt-8" onClick={write}>
        Redeem
      </button>
      {total && token && (
        <span className="mt-4">
          Total airdrop fund: {formatEth(total.value)} {token.symbol}
        </span>
      )}
    </div>
  );
});
