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
  voucher: Address;
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

    const { pohId, voucher }: RemoveVouchBody =
      await request.json();

    if (!voucher || !pohId)
      throw new Error("Invalid body");

    const poh = getProofOfHumanity(chain);

    const isVoucherHuman = await poh.read.isHuman([voucher]);
    if (!isVoucherHuman) throw new Error("Voucher is not human");

    await datalake
      .from("poh-vouchdb")
      .delete()
      .eq("pohId", pohId.toLowerCase())
      .eq("voucher", voucher.toLowerCase());

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
