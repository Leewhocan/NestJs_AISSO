import { PartialType } from '@nestjs/mapped-types';
import { CreateNichDto } from './create-nich.dto';

export class UpdateNichDto extends PartialType(CreateNichDto) {
    id: number;
}
