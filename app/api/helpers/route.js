import dbConnect from "@/lib/db";
import Helper from "@/models/Helper";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    const verified = searchParams.get("verified");

    const excludeImage = searchParams.get("excludeImage") === "true";

    let query = {};
    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      query.$or = [
        { name: searchRegex },
        { skills: searchRegex },
        { category: searchRegex },
        { "tasks.name": searchRegex }
      ];
    }

    if (location && location !== 'All Locations') {
      query.location = { $regex: location, $options: "i" };
    }

    if (category && !category.includes('All Categories')) {
      query.category = { $regex: category, $options: "i" };
    }

    if (verified === "true") {
      query.nid = { $exists: true, $ne: "" };
    }

    const projection = excludeImage ? { image: 0 } : {};
    const helpers = await Helper.find(query, projection);
    console.log("Helper Query:", JSON.stringify(query));
    console.log("Found Helpers:", helpers.length, "| excludeImage:", excludeImage);
    return NextResponse.json({ success: true, data: helpers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    
    const { adminId } = body;
    if (adminId) {
      const adminUser = await User.findById(adminId);
      if (!adminUser || adminUser.role !== 'admin') {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
      }
    } else {
       return NextResponse.json({ success: false, message: "Admin ID required" }, { status: 403 });
    }

    const helper = await Helper.create(body);
    return NextResponse.json({ success: true, data: helper });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
