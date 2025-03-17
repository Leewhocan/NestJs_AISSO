# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .
RUN npx prisma generate

# Открываем порты, которые будут использоваться приложениями
EXPOSE 3002 3005 3000

# Команда для запуска приложения
CMD ["npm", "run", "start", "--", "user"]