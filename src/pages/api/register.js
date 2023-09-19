import { MongoClient } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, team_name, project_idea, tech_stack, github_link } = req.body;

    console.log("Received data: ", req.body);  // Debug log
    const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
      await client.connect();
      console.log("Connected to MongoDB");  // Debug log
      const db = client.db('hackathonDB');
      const collection = db.collection('submissions');
      const result = await collection.insertOne({ email, name, team_name, project_idea, tech_stack, github_link });
      console.log("Insert result: ", result);  // Debug log
      res.status(201).json({ message: 'Submission successful!', result });
    } catch (error) {
      console.error("Error during database operation: ", error);  // Debug log
      res.status(500).json({ message: 'Something went wrong!', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
};
