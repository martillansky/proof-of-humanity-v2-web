import { HttpStatusCode } from "axios";
import { SupportedChain, getChainRpc, paramToChain } from "config/chains";
import datalake from "config/supabase";
import { Contract } from "contracts";
import abis from "contracts/abis";
import { NextRequest, NextResponse } from "next/server";
import {
  Address,
  Hash,
  createPublicClient,
  getContract,
  http,
  verifyTypedData,
} from "viem";

const getProofOfHumanity = (chain: SupportedChain) =>
  getContract({
    abi: abis.ProofOfHumanity,
    address: Contract.ProofOfHumanity[chain.id],
    publicClient: createPublicClient({
      chain,
      transport: http(getChainRpc(chain.id)),
    }),
  });

interface RemoveVouchBody {
  pohId: Hash;
  claimer: Address;
  voucher: Address;
  expiration: number;
  signature: Hash;
}

interface RemoveVouchParams {
  chain: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: RemoveVouchParams }
) {
  try {
    const chain = paramToChain(params.chain);
    
    if (!chain) throw new Error("unsupported chain");

    const { pohId, claimer, voucher, expiration, signature }: RemoveVouchBody =
      await request.json();

    if (!claimer || !voucher || !pohId || !expiration || !signature)
      throw new Error("Invalid body");

          
    const poh = getProofOfHumanity(chain);

    const isVoucherHuman = await poh.read.isHuman([voucher]);
    if (!isVoucherHuman) throw new Error("Voucher is not human");

    const validSignature = await verifyTypedData({
      address: voucher,
      domain: {
        name: "Proof of Humanity",
        chainId: chain.id,
        verifyingContract: Contract.ProofOfHumanity[chain.id],
      },
      types: {
        IsHumanVoucher: [
          { name: "vouched", type: "address" },
          { name: "humanityId", type: "bytes20" },
          { name: "expirationTimestamp", type: "uint256" },
        ],
      },
      primaryType: "IsHumanVoucher",
      message: {
        vouched: claimer,
        humanityId: pohId,
        expirationTimestamp: BigInt(expiration),
      },
      signature,
    });
  
    if (!validSignature) throw new Error("Invalid signature");
  
    await datalake
      .from("poh-vouchdb")
      .delete()
      .eq("pohId", pohId)
      .eq("voucher", voucher);

    return NextResponse.json(
      { message: "Vouch removed" },
      { status: HttpStatusCode.Accepted }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
