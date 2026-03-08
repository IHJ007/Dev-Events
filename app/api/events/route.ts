import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

// GET all events
export async function GET() {
  try {
    const eventsRef = collection(db, "events")
    const snapshot = await getDocs(eventsRef)
    
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST a new event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const eventsRef = collection(db, "events")
    
    const docRef = await addDoc(eventsRef, {
      ...body,
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}