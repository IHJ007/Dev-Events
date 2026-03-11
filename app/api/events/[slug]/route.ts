import { db } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { EventItem } from "@/lib/constants";

export async function GET(request: NextRequest) {
    try {
        const slug = request.nextUrl.pathname.split("/").pop();
        
        const snapshot = await db.collection("events")
        .where("slug", "==", slug).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        const doc = snapshot.docs[0];
        const data = doc.data() as EventItem 

        return NextResponse.json({ id: doc.id, ...data })

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}