import { sql } from "@/lib/db";

export async function GET() {
  try {
    const events = await sql`
      SELECT
        id,
        title,
        description,
        category,
        department,
        date,
        time,
        venue,
        registration_link,
        created_at
      FROM events
      ORDER BY date ASC
    `;

    return Response.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("GET events error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      title,
      description,
      category,
      department,
      date,
      time,
      venue,
      registration_link,
    } = body;

    if (
      !id ||
      !title ||
      !description ||
      !category ||
      !department ||
      !date ||
      !time ||
      !venue
    ) {
      return Response.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO events
      (
        id,
        title,
        description,
        category,
        department,
        date,
        time,
        venue,
        registration_link,
        created_at
      )
      VALUES
      (
        ${id},
        ${title},
        ${description},
        ${category},
        ${department},
        ${date},
        ${time},
        ${venue},
        ${registration_link || null},
        ${Date.now()}
      )
    `;

    return Response.json({
      success: true,
      message: "Event added successfully",
    });
  } catch (error) {
    console.error("POST events error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to add event",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      title,
      description,
      category,
      department,
      date,
      time,
      venue,
      registration_link,
    } = body;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Event ID is required",
        },
        { status: 400 }
      );
    }

    await sql`
      UPDATE events
      SET
        title = ${title},
        description = ${description},
        category = ${category},
        department = ${department},
        date = ${date},
        time = ${time},
        venue = ${venue},
        registration_link = ${registration_link || null}
      WHERE id = ${id}
    `;

    return Response.json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("PUT events error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update event",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Event ID is required",
        },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM events
      WHERE id = ${id}
    `;

    return Response.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("DELETE events error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete event",
      },
      { status: 500 }
    );
  }
}