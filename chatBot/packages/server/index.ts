import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { z } from 'zod';

dotenv.config(); //Загружает переменные окружения

const client = new OpenAI({
   apiKey: process.env.OPEN_AI_KEY,
});

const app = express(); //Создает экземпляр приложения Express
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.json()); //Подключает middleware для автоматического парсинга JSON из тела запроса

app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World'); // При GET-запросе на / возвращает текст "Hello, World!"
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!!!!!hello' });
});

const conversations = new Map<string, string>();

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   try {
      const { prompt, conversationId } = req.body;
      const response = await client.responses.create({
         model: 'gpt-4o-mini!',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 512,
         previous_response_id: conversations.get(conversationId),
      });
      conversations.set(conversationId, response.id);

      res.json({ message: response.output_text });

   } catch (error) {
      res.status(500).json({ error: 'Failed to generate response' });
   }

   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
