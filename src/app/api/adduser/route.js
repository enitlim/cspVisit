import { NextResponse, NextRequest } from "next/server";
var admin = require("firebase-admin");

var serviceAccount = require("../../csp_service_key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const result = await admin.auth().createUser({
      email: email,
      password:password
    });
    console.log("Email=>", email, "Password=>", password);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      databody: result,
    });
  } catch (error) {
    console.log("Error here");
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
