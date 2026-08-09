import { sql } from "@/lib/db";

export async function GET() {
  try {
    const announcements = await sql`
      SELECT
        id,
        title,
        description,
        category,
        department,
        date,
        urgent
      FROM announcements
      ORDER BY date DESC
    `;

    return Response.json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch announcements",
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
      urgent,
    } = body;

    if (
      !id ||
      !title ||
      !description ||
      !category ||
      !department ||
      !date
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
      INSERT INTO announcements
      (
        id,
        title,
        description,
        category,
        department,
        date,
        urgent
      )
      VALUES
      (
        ${id},
        ${title},
        ${description},
        ${category},
        ${department},
        ${date},
        ${urgent ?? false}
      )
    `;

    return Response.json({
      success: true,
      message: "Announcement added successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to add announcement",
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
      urgent,
    } = body;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Announcement ID is required",
        },
        { status: 400 }
      );
    }

    await sql`
      UPDATE announcements
      SET
        title = ${title},
        description = ${description},
        category = ${category},
        department = ${department},
        date = ${date},
        urgent = ${urgent ?? false}
      WHERE id = ${id}
    `;

    return Response.json({
      success: true,
      message: "Announcement updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update announcement",
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
          message: "Announcement ID is required",
        },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM announcements
      WHERE id = ${id}
    `;

    return Response.json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete announcement",
      },
      { status: 500 }
    );
  }
}