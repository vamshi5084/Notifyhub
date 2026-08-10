import { sql } from "@/lib/db";

export async function GET() {
  try {
    const database = await sql`
      SELECT current_database() AS database
    `;

    const admins = await sql`
      SELECT id, username
      FROM admins
      ORDER BY id
    `;

    return Response.json({
      success: true,
      database: database[0].database,
      admins: admins,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Database error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}