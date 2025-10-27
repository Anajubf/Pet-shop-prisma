import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding de 50 pets...');

  // Deleta todos os pets existentes para evitar duplicatas em cada execução
  await prisma.pets.deleteMany();

  const pets = [];
  const especies = ['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Hamster'];

  for (let i = 0; i < 50; i++) { // 👈 Alterado de 20 para 50
    const especieAleatoria = faker.helpers.arrayElement(especies);
    let nomeAleatorio;

    // Adapta o nome gerado pelo faker à espécie do pet
    if (especieAleatoria === 'Cachorro') {
      nomeAleatorio = faker.animal.dog();
    } else if (especieAleatoria === 'Gato') {
      nomeAleatorio = faker.animal.cat();
    } else if (especieAleatoria === 'Pássaro') {
      nomeAleatorio = faker.animal.bird();
    } else if (especieAleatoria === 'Peixe') {
      nomeAleatorio = faker.animal.fish();
    } else {
      nomeAleatorio = faker.animal.rodent();
    }

    pets.push({
      nome: nomeAleatorio,
      especie: especieAleatoria,
      idade: faker.number.int({ min: 1, max: 15 }),
      dono: faker.person.fullName(),
    });
  }

  // Cria 50 pets de uma vez no banco de dados
  await prisma.pets.createMany({
    data: pets,
  });

  console.log('Seeding concluído! 50 pets foram criados.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });