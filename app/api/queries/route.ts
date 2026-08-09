import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO queries (
        id,
        name,
        email,
        department,
        message,
        answer,
        answered,
        created_at
      )
      VALUES (
        ${crypto.randomUUID()},
        ${name},
        ${email},
        ${subject},
        ${message},
        NULL,
        false,
        ${Date.now()}
      )
    `;

    return Response.json({
      success: true,
      message: "Query submitted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to submit query",
      },
      { status: 500 }
    );
  }
}