import express, { Request, Response, NextFunction, Application } from 'express';
import fs from 'fs/promises';
import path from 'path';

import cors from 'cors';

interface Item {
  id: number;
  title?: string;
  description?: string;
  [key: string]: any;
}

interface Database {
  items: Item[];
}

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '4000', 10);
const DB_PATH: string = path.join(__dirname, '..', 'db.json');

app.use(cors());
app.use(express.json());

// helper: read DB
async function readDB(): Promise<Database> {
  try {
    const txt: string = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(txt);
  } catch (err: any) {
    if (err.code === 'ENOENT') return { items: [] };
    throw err;
  }
}

// helper: write DB
async function writeDB(data: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// list items
app.get('/api/items', async (req: Request, res: Response): Promise<void> => {
  try{
    const db: Database = await readDB();
    console.log(db);
    const { items } = db;
    res.status(200).json({ data:items });
  } catch(err){
    res.status(500).json({ 
      statusCode:500, 
      message:"Internal Server Error" 
    });
  }
});

// get item
app.get('/api/items/:id', async (req: Request, res: Response): Promise<void> => {
  // PUT YOUR CODE HERE
});

// create item
app.post('/api/items', async (req: Request, res: Response): Promise<void> => {
  // PUT YOUR CODE HERE
});

// update item
app.put('/api/items/:id', async (req: Request, res: Response): Promise<void> => {
  // PUT YOUR CODE HERE
});

// delete item
app.delete('/api/items/:id', async (req: Request, res: Response): Promise<void> => {
  // PUT YOUR CODE HERE
});

app.listen(PORT, (): void => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

