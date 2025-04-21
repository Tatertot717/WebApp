import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/config/mongodb";
import UserModel from "@/src/models/userSchema";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "All fields (email, password, username) are required." },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashed, username });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}