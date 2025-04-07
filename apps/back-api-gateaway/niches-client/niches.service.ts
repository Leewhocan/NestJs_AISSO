import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';

@Injectable()
export class NichesService {
    constructor(@Inject('NICHES_CLIENT') private nichesClient: ClientProxy) {}
    create(createNichDto: CreateNichDto) {
        return this.nichesClient.send('niches.create', createNichDto);
    }

    findAll() {
        return this.nichesClient.send('niches.findAll', {});
    }

    findOne(id: number) {
        return this.nichesClient.send('niches.findOne', id);
    }

    update(id: number, updateNichDto: UpdateNichDto) {
        return this.nichesClient.send('niches.update', { id, updateNichDto });
    }

    remove(id: number) {
        return this.nichesClient.send('niches.remove', id);
    }
}
