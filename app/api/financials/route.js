import dbConnect from "@/lib/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "UserId is required" }, { status: 400 });
    }

    
    const mongoose = (await import("mongoose")).default;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, message: "Invalid User ID format" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found in database. Please log in again." }, { status: 404 });
    }

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ 
      success: true, 
      balance: user.balance || 0, 
      transactions: transactions || []
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, type, amount, description } = await req.json();

    if (!userId || !type || !amount) {
       return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const mongoose = (await import("mongoose")).default;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, message: "Invalid User ID format" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    
    if (type === "Release" || type === "Tip" || type === "Short Hire") {
      if (user.balance < amount) {
        return NextResponse.json({ success: false, message: "Insufficient balance" }, { status: 400 });
      }
      user.balance -= amount;
    } else if (type === "Recharge") {
      user.balance += amount;
    }

    await user.save();

    const transaction = await Transaction.create({
      userId,
      type,
      amount,
      description,
      status: "Successful"
    });

    return NextResponse.json({ success: true, balance: user.balance, transaction });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
