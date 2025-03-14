import {PrismaClient} from "@prisma/client";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";

@injectable()
export class PrismaService {
    client: PrismaClient

    constructor(
        @inject(TYPES.LoggerService) private logger: ILogger
    ) {
        this.client = new PrismaClient();
    }

    async connect(): Promise<void> {
        try {
            await this.client.$connect()
            this.logger.log('[Prisma Service] Успешно подключили к базе данных')
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error('[Prisma Service] Ошибка подключения к базе данных: ' + e.message)
            }
        }

    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect()
        this.logger.log('[Prisma Service] Соединение закрыто')
    }

}