import {IConfigService} from "./config.service.interface";
import {config, DotenvConfigOutput, DotenvPopulateInput} from 'dotenv'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";


@injectable()
export class ConfigService implements IConfigService {
    private config: DotenvConfigOutput

    constructor(
        @inject(TYPES.LoggerService) private logger: ILogger
    ) {
        const result: DotenvConfigOutput = config();
        if (result.error) {
            this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
        } else {
            this.logger.log('[ConfigService] Конфигурация .env загружена');
            this.config = result.parsed as DotenvConfigOutput;
        }
    }

    get(key: string): string {
        // @ts-ignore
        return this.config[key];
    }

}