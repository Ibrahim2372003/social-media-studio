import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

export interface HealthResponse {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  /**
   * Liveness only: confirms the API process is up. Database and Redis
   * readiness checks are added when those dependencies are introduced.
   */
  @Get()
  @ApiOkResponse({ description: 'The API process is running.' })
  check(): HealthResponse {
    return {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
