import { sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

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
      WHERE email = ${email}
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      queries,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch queries",
      },
      { status: 500 }
    );
  }
}