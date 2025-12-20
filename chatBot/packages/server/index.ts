import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config(); //Загружает переменные окружения

const app = express(); //Создает экземпляр приложения Express
app.use(express.json()); //Подключает middleware для автоматического парсинга JSON из тела запроса
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
