import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { validateEnv } from './config/env.validation.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const env = config.get<string>('NODE_ENV');
        return {
          pinoHttp: {
            level: config.get<string>('LOG_LEVEL') ?? (env === 'test' ? 'silent' : 'info'),
            // Never log credentials.
            redact: ['req.headers.authorization', 'req.headers.cookie'],
            transport:
              env === 'development'
                ? { target: 'pino-pretty', options: { singleLine: true } }
                : undefined,
          },
        };
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
