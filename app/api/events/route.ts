import { db } from "@/lib/firebaseAdmin"
import { NextResponse } from "next/server"

// GET all events
export async function GET() {
  try {
    const snapshot = await db.collection("events").get()

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
  try {
    const body = await request.json()

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