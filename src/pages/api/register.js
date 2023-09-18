import { MongoClient } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, teamName, projectIdea, techStack, githubLink } = req.body;
    const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db('hackathonDB');
      const collection = db.collection('submissions');
      const result = await collection.insertOne({ email, name, teamName, projectIdea, techStack, githubLink });
      res.status(201).json({ message: 'Submission successful!', result });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
};
