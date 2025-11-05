import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("study_tracker");
  const tasks = await db.collection("tasks").find({}).toArray();
  return Response.json(tasks);
}

export async function POST(req) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db("study_tracker");
  const result = await db.collection("tasks").insertOne(data);
  return Response.json({ insertedId: result.insertedId });
}
