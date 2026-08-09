import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const queries = await sql`
      SELECT
        id,
        name,
        email,
        department,
        message,
        answer,
        answered,
        created_at
      FROM queries
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      queries,
    });
  } catch (error) {
    console.error("GET queries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load student queries.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, answer } = body;

    if (!id || !answer || !answer.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Query ID and answer are required.",
        },
        { status: 400 }
      );
    }

    const updated = await sql`
      UPDATE queries
      SET
        answer = ${answer.trim()},
        answered = true
      WHERE id = ${id}
      RETURNING
        id,
        name,
        email,
        department,
        message,
        answer,
        answered,
        created_at
    `;

    if (updated.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Query not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Answer submitted successfully.",
      query: updated[0],
    });
  } catch (error) {
    console.error("PUT queries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit answer.",
      },
      { status: 500 }
    );
  }
}