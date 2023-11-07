import { HttpStatusCode } from "axios";
import { paramToChain } from "config/chains";
import datalake from "config/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Address, Hash } from "viem";

interface RequestParams {
  chain: string;
  claimer: Address;
  pohid: Hash;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: RequestParams }
) {
  try {
    if (!params.chain || !params.claimer || !params.pohid)
      throw new Error("Invalid query");

    const chain = paramToChain(params.chain);

    if (!chain) throw new Error("unsupported chain");

    const { data, error } = await datalake
      .from("poh-vouchdb")
      .select("*")
      .eq("chainId", chain.id)
      .eq("pohId", params.pohid)
      .eq("claimer", params.claimer);

    if (error) throw new Error(error.message);

    return NextResponse.json(data, { status: HttpStatusCode.Ok });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
