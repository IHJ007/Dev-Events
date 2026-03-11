import { db } from "@/lib/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

// GET all events
export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search");

    let snapshot;

    if(search) {
      snapshot = await db.collection("events")
        .where("title", ">=", search)
        .where("title", "<=", search + "\uf8ff")
        .get();
    } else {
      snapshot = await db.collection("events").get();
    }

    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

// POST a new event
export async function POST(request: Request) {

  const body = await request.json();
  const { title, image, slug, location, date, time } = body;

  if (!title || !image || !slug || !location || !date || !time) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const docRef = await db.collection("events").add({
      ...body,
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({
      id: docRef.id,
      success: true
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}
