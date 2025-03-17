import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NichesService } from './niches.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';

@Controller()
export class NichesController {
    constructor(private readonly nichesService: NichesService) {}

    @MessagePattern('niches.create')
    create(@Payload() createNichDto: CreateNichDto) {
        return this.nichesService.create(createNichDto);
    }

    @MessagePattern('niches.findAll')
    findAll() {
        return this.nichesService.findAll();
    }

    @MessagePattern('niches.findOne')
    findOne(@Payload() id: number) {
        return this.nichesService.findOne(id);
    }

    @MessagePattern('niches.update')
    update(@Payload() updateNichDto: UpdateNichDto) {
        return this.nichesService.update(updateNichDto.id, updateNichDto);
    }

    @MessagePattern('niches.remove')
    remove(@Payload() id: number) {
        return this.nichesService.remove(id);
    }
}
