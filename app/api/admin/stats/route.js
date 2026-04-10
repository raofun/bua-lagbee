import dbConnect from "@/lib/db";
import User from "@/models/User";
import Helper from "@/models/Helper";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    
    
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId");
    
    if (!adminId || adminId === 'null' || adminId === 'undefined') {
      return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 401 });
    }

    try {
      const adminUser = await User.findById(adminId);
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 403 });
      }
    } catch(e) {
       return NextResponse.json({ success: false, message: "Invalid Security Context" }, { status: 403 });
    }

    
    const [totalUsers, totalAdmins, totalHelpers, platformBalanceAgg, recentTransactions] = await Promise.all([
      User.countDocuments({ role: "user" }).lean(),
      User.countDocuments({ role: "admin" }).lean(),
      Helper.countDocuments({}).lean(),
      Transaction.aggregate([
        { $match: { type: "Recharge" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Transaction.find({})
        .select("userId type amount description status date")
        .sort({ date: -1 })
        .limit(5)
        .populate("userId", "name email")
        .lean()
    ]);

    const platformBalance = platformBalanceAgg.length > 0 ? platformBalanceAgg[0].total : 0;

    return NextResponse.json({ 
      success: true, 
      stats: {
        totalUsers,
        totalAdmins,
        totalHelpers,
        platformBalance
      },
      recentTransactions
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
