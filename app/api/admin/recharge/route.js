import dbConnect from "@/lib/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { adminId, targetUserId, amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    
    if (adminId && adminId !== 'null' && adminId !== 'undefined') {
      try {
        const adminUser = await User.findById(adminId);
        if (!adminUser || adminUser.role !== 'admin') {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }
      } catch(e) {
         return NextResponse.json({ success: false, message: "Invalid Admin ID" }, { status: 403 });
      }
    } else {
       return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 403 });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      targetUserId,
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    
    await Transaction.create({
      userId: targetUserId,
      type: "Recharge",
      amount: amount,
      description: `Manual Wallet Recharge`,
      status: "Successful"
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
