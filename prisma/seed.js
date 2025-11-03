import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const especies = ['Cachorro', 'Gato', 'Coelho', 'Pássaro'];
  const nomes = ['Rex', 'Luna', 'Milo', 'Bella', 'Toby', 'Lola', 'Simba', 'Nina', 'Max', 'Chloe'];
  const donos = ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Fernanda', 'Lucas', 'Juliana', 'Rafael', 'Camila'];

  for (let i = 0; i < 50; i++) {
    await prisma.pet.create({
      data: {
        nome: nomes[Math.floor(Math.random() * nomes.length)],
        especie: especies[Math.floor(Math.random() * especies.length)],
        idade: Math.floor(Math.random() * 15) + 1,
        dono: donos[Math.floor(Math.random() * donos.length)]
      }
    });
  }

  console.log('50 pets criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
