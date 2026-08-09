import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT current_database() AS database,
             current_timestamp AS time
    `;

    return Response.json({
      success: true,
      message: "Database connection successful",
      database: result[0].database,
      time: result[0].time,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}