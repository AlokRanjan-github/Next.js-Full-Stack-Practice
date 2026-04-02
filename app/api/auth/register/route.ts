import connectDb from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        await connectDb()
        const existUser = await User.findOne({ email })
        if (existUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists!"
                },
                { status: 409 }
            )
        }
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Passwrod must be atleast 6 characters!" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword
        })
        return NextResponse.json({ user, status: 400 })


    } catch (error) {
        return NextResponse.json(
            { message: "Registration Error: ", error },
            { status: 500 }
        )
    }
}