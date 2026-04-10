import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const { credential } = await req.json();

        if (!credential) {
            return NextResponse.json({ success: false, message: "No credential provided" }, { status: 400 });
        }


        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const googleUser = await googleRes.json();

        if (!googleRes.ok || googleUser.error) {
            return NextResponse.json({ success: false, message: "Invalid Google token" }, { status: 401 });
        }

        const { email, name, picture, sub: googleId } = googleUser;


        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({
                name,
                email,
                image: picture,
                googleId,
                role: "user",
                balance: 0
            });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                balance: user.balance
            }
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
