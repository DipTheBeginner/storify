import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  try {
    // Clean existing data
    console.log('Cleaning existing data...');
    await prisma.follow.deleteMany({});
    await prisma.user.deleteMany({});
    
    // Reset sequence for PostgreSQL (important fix)
    await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    
    console.log('Creating users...');
    
    // Create three users
    const alice = await prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        username: 'alicej',
        bio: 'Software developer passionate about web technologies',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
    });

    const bob = await prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Smith',
        username: 'bobsmith',
        bio: 'UX designer with a focus on user-centered experiences',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    });

    const carol = await prisma.user.create({
      data: {
        email: 'carol@example.com',
        name: 'Carol Williams',
        username: 'carolw',
        bio: 'Product manager and tech enthusiast',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
    });

    console.log('Users created successfully:');
    console.log(`- Alice (ID: ${alice.id}): ${alice.name}`);
    console.log(`- Bob (ID: ${bob.id}): ${bob.name}`);
    console.log(`- Carol (ID: ${carol.id}): ${carol.name}`);

    console.log('Creating follow relationships...');

    // Create following relationships
    // Alice follows Bob and Carol
    await prisma.follow.create({
      data: {
        followerId: alice.id,
        followingId: bob.id,
      },
    });

    await prisma.follow.create({
      data: {
        followerId: alice.id,
        followingId: carol.id,
      },
    });

    // Bob follows Carol
    await prisma.follow.create({
      data: {
        followerId: bob.id,
        followingId: carol.id,
      },
    });

    console.log('Follow relationships created successfully:');
    console.log('- Alice follows Bob and Carol');
    console.log('- Bob follows Carol');
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Detailed error during seeding:', error);
    throw error; // Re-throw to be caught by the main catch block
  }
}

// Execute the main function
main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    // Close the Prisma client connection when done
    await prisma.$disconnect();
  });