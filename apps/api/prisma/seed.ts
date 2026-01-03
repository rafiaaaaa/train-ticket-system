import { prisma } from "../src/lib/prisma";

async function seed() {
  const user = await prisma.user.upsert({
    where: { email: "demo@mail.com" },
    update: {},
    create: {
      email: "demo@mail.com",
      password: "secret",
      first_name: "Demo",
      last_name: "User",
    },
  });

  const origin = await prisma.station.upsert({
    where: { code: "JKT" },
    update: {},
    create: { name: "Jakarta", code: "JKT", city: "Jakarta" },
  });

  const destination = await prisma.station.upsert({
    where: { code: "SBY" },
    update: {},
    create: { name: "Surabaya", code: "SBY", city: "Surabaya" },
  });

  const route = await prisma.route.create({
    data: {
      originStationId: origin.id,
      destinationStationId: destination.id,
    },
  });

  const train = await prisma.train.create({
    data: {
      name: "Argo Bromo",
      code: "ARGO-01",
      totalSeats: 2,
      seats: {
        create: [{ number: "A1" }, { number: "A2" }],
      },
    },
  });

  const schedule = await prisma.schedule.create({
    data: {
      trainId: train.id,
      routeId: route.id,
      departureTime: new Date(),
      arrivalTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      price: 250000,
    },
  });

  console.log("✅ SEED DONE");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
