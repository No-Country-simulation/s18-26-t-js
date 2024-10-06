Paso 1:
instalar Next14
npx create-next-app@latest

Paso 2:
instalar Prisma
npm install prisma --save-dev
npm install @prisma/client
npx prisma init

Paso 3:
Definir los Modelos
migrate: npx prisma migrate dev --name init

Paso 4:
Crear carpeta "api" en src/app

Paso 5:
Deploy - Para evitar, sopresas a futuro



