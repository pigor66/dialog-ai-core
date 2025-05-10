import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      await this.$connect();
      console.log('Connected to database!');
    } catch (error) {
      console.error('Error connecting to database', error);
    }
  }
}