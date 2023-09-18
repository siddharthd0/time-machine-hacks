import { MongoClient } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db('hackathonDB');
      const collection = db.collection('submissions');
      const submissions = await collection.find().toArray();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!', error });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
};
