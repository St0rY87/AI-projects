import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config(); //Загружает переменные окружения

const app = express(); //Создает экземпляр приложения Express
const port = process.env.PORT || 3000;

app.use(express.json()); //Подключает middleware для автоматического парсинга JSON из тела запроса

app.get("/", (req: Request, res: Response) => {
  res.send('Hello, World!'); // При GET-запросе на / возвращает текст "Hello, World!"
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({message: 'Hello, World!'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
