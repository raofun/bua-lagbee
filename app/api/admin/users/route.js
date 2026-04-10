import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect();


        const { searchParams } = new URL(req.url);
        const adminId = searchParams.get("adminId");
        const excludeImage = searchParams.get("excludeImage") === "true";

        if (!adminId || adminId === 'null' || adminId === 'undefined') {
            return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 401 });
        }

        try {
            const adminUser = await User.findById(adminId);
            if (!adminUser || adminUser.role !== 'admin') {
                return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 403 });
            }
        } catch (e) {
            return NextResponse.json({ success: false, message: "Invalid Security Context" }, { status: 403 });
        }

        const users = await User.find({})
            .select(excludeImage ? "name email role balance createdAt" : "name email role balance createdAt image")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await dbConnect();
        const { adminId, targetUserId, newRole } = await req.json();


        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            targetUserId,
            { role: newRole },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
