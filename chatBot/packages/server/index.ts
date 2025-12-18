import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config(); //Загружает переменные окружения

const client = new OpenAI({
   apiKey: process.env.OPEN_AI_KEY,
});

const app = express(); //Создает экземпляр приложения Express
app.use(express.json())
const port = process.env.PORT || 3000;

app.use(express.json()); //Подключает middleware для автоматического парсинга JSON из тела запроса

app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World'); // При GET-запросе на / возвращает текст "Hello, World!"
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!!!!!hello' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;

   const response = await client.responses.create({
      model: 'gpt-5-nano',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 512,
   });

   res.json({ message: response.output_text });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
