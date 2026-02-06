import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Prisma from '@prisma/client';

@Injectable()
export class PrismaService extends (Prisma as any).PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }
}
