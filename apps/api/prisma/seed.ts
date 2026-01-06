import { prisma } from "../src/lib/prisma";
import { bcryptHash } from "../src/utils/bcrypt";

const IDS = {
  user: "11111111-1111-4111-8111-111111111111",

  station: {
    JKT: "22222222-2222-4222-8222-222222222221",
    SBY: "22222222-2222-4222-8222-222222222222",
  },

  route: "33333333-3333-4333-8333-333333333333",

  train: "44444444-4444-4444-8444-444444444444",

  seat: {
    A1: "55555555-5555-4555-8555-555555555551",
    A2: "55555555-5555-4555-8555-555555555552",
    A3: "55555555-5555-4555-8555-555555555553",
    A4: "55555555-5555-4555-8555-555555555554",
  },

  schedule: "66666666-6666-4666-8666-666666666666",
};

async function seed() {
  await prisma.user.upsert({
    where: { id: IDS.user },
    update: {},
    create: {
      id: IDS.user,
      email: "test@example.com",
      password: await bcryptHash("password"),
      first_name: "Demo",
      last_name: "User",
    },
  });

  const origin = await prisma.station.upsert({
    where: { id: IDS.station.JKT },
    update: {},
    create: {
      id: IDS.station.JKT,
      name: "Jakarta",
      code: "JKT",
      city: "Jakarta",
    },
  });

  const destination = await prisma.station.upsert({
    where: { id: IDS.station.SBY },
    update: {},
    create: {
      id: IDS.station.SBY,
      name: "Surabaya",
      code: "SBY",
      city: "Surabaya",
    },
  });

  await prisma.route.upsert({
    where: { id: IDS.route },
    update: {},
    create: {
      id: IDS.route,
      originStationId: origin.id,
      destinationStationId: destination.id,
    },
  });

  await prisma.train.upsert({
    where: { id: IDS.train },
    update: {},
    create: {
      id: IDS.train,
      name: "Argo Bromo",
      code: "ARGO-01",
      totalSeats: 2,
    },
  });

  await prisma.seat.upsert({
    where: { id: IDS.seat.A1 },
    update: {},
    create: {
      id: IDS.seat.A1,
      trainId: IDS.train,
      number: "A1",
    },
  });

  await prisma.seat.upsert({
    where: { id: IDS.seat.A2 },
    update: {},
    create: {
      id: IDS.seat.A2,
      trainId: IDS.train,
      number: "A2",
    },
  });

  await prisma.schedule.upsert({
    where: { id: IDS.schedule },
    update: {},
    create: {
      id: IDS.schedule,
      trainId: IDS.train,
      routeId: IDS.route,
      departureTime: new Date("2026-01-01T08:00:00.000Z"),
      arrivalTime: new Date("2026-01-01T12:00:00.000Z"),
      price: 250000,
    },
  });

  console.log("✅ SEED DONE (STABLE IDS)");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
