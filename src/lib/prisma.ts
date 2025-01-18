import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export default prisma;
