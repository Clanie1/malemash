import { PrismaClient } from '@prisma/client';
import { readFileSync, readdirSync } from 'fs';

async function main() {
  const prisma = new PrismaClient();
  prisma.$connect();

  const dirPath = './src/user/Male Faces';

  await prisma.user.deleteMany();

  readdirSync(dirPath).forEach(async (file) => {
    const filePath = `${dirPath}/${file}`;

    const imageData = readFileSync(filePath);
    const base64Image = imageData.toString('base64');

    const name = generateRandomSpanishName();

    try {
      await prisma.user.create({
        data: {
          name: name,
          email: `${name.replace(' ', '.').toLowerCase()}@gmail.com`,
          elo: calculateRandomEloBetween(1000, 2000),
          image: base64Image,
        },
      });
    } catch (err) {
      console.error(`Failed to create user with name: ${name}`);
    }
    console.log(`Created user with name: ${name}`);
  });
}

function calculateRandomEloBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomSpanishName() {
  const firstNames = [
    'Antonio',
    'José',
    'Manuel',
    'Francisco',
    'David',
    'Juan',
    'Javier',
    'José Antonio',
    'Jesús',
    'Carlos',
    'Miguel',
    'Ángel',
    'Alejandro',
    'Miguel Ángel',
    'Pedro',
    'Pablo',
    'Sergio',
    'Fernando',
    'Jorge',
    'Alberto',
    'Luis',
    'Rafael',
    'Diego',
    'Adrián',
    'Raúl',
  ];

  const lastNames = [
    'García',
    'Martínez',
    'Rodríguez',
    'López',
    'Sánchez',
    'Pérez',
    'Gómez',
    'Fernández',
    'González',
    'Muñoz',
    'Hernández',
    'Díaz',
    'Álvarez',
    'Moreno',
    'Jiménez',
    'Ruiz',
    'Hernando',
    'Suárez',
    'Ramírez',
    'Blanco',
    'Molina',
    'Morales',
    'Ortega',
    'Delgado',
    'Castro',
  ];

  const firstName = getRandomElement(firstNames);
  const lastName1 = getRandomElement(lastNames);

  return `${firstName} ${lastName1}`;
}

main();
