import dbConnect from "@/lib/db";
import Helper from "@/models/Helper";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const helper = await Helper.findById(id);
    if (!helper) {
      return NextResponse.json({ success: false, message: "Helper not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: helper });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId");
    
    if (adminId) {
      const adminUser = await User.findById(adminId);
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
      }
    } else {
       return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 403 });
    }

    const deletedHelper = await Helper.findByIdAndDelete(id);
    if (!deletedHelper) {
      return NextResponse.json({ success: false, message: "Helper not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Helper deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const { adminId, ...updateData } = body;

    
    if (adminId) {
      const adminUser = await User.findById(adminId);
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
      }
    } else {
       return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 403 });
    }

    const helper = await Helper.findById(id);
    if (!helper) {
      return NextResponse.json({ success: false, message: "Helper not found" }, { status: 404 });
    }

    Object.assign(helper, updateData);
    await helper.save();

    return NextResponse.json({ success: true, data: helper });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
