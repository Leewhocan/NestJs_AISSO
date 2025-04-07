import { Controller } from '@nestjs/common';
import { FilterService } from './filter.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class FilterController {}
