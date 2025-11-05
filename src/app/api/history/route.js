// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   const client = await clientPromise;
//   const db = client.db("study_tracker");
//   const history = await db.collection("history").find({}).toArray();
//   return Response.json(history);
// }

// export async function POST(req) {
//   const data = await req.json();
//   const client = await clientPromise;
//   const db = client.db("study_tracker");

//   await db.collection("history").updateOne(
//     { date: data.date },
//     { $set: { records: data.records } },
//     { upsert: true }
//   );

//   return Response.json({ success: true });
// }
























import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("study_tracker");
    const history = await db.collection("history").find({}).toArray();

    // Clean up _id field and return proper structure
    const cleaned = history.map(({ _id, ...rest }) => rest);
    console.log("✅ History fetched from DB:", cleaned);

    return Response.json(cleaned);
  } catch (err) {
    console.error("❌ Error fetching history:", err);
    return Response.json({ error: "Failed to load history" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { date, records } = await req.json();
    const client = await clientPromise;
    const db = client.db("study_tracker");

    await db.collection("history").updateOne(
      { date },
      { $set: { records } },
      { upsert: true }
    );

    console.log("✅ History saved:", { date, records });
    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Error saving history:", err);
    return Response.json({ error: "Failed to save history" }, { status: 500 });
  }
}
