import { HttpStatusCode } from "axios";
import { paramToChain } from "config/chains";
import datalake from "config/supabase";
import { NextRequest, NextResponse } from "next/server";
import {
  Address,
  Hash,
} from "viem";

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
