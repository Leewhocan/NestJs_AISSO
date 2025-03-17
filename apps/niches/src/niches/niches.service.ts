import { Injectable } from '@nestjs/common';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
import { NichDto } from './dto/nich.dto';
@Injectable()
export class NichesService {
    private nichArray: NichDto[] = [
        { id: 1, name: 'Item 1', value: 100 },
        { id: 2, name: 'Item 2', value: 200 },
        { id: 3, name: 'Item 3', value: 300 },
        { id: 4, name: 'Item 4', value: 400 },
        { id: 5, name: 'Item 5', value: 500 },
    ];

    create(createNichDto: CreateNichDto) {
        const newNich: NichDto = {
            ...createNichDto,
            id: this.nichArray.length + 1,
        };
        this.nichArray.push(newNich);
        return 'This action adds a new nich';
    }

    findAll() {
        return this.nichArray;
        return `This action returns all niches`;
    }

    findOne(id: number) {
        return `This action returns a #${id} nich`;
    }

    update(id: number, updateNichDto: UpdateNichDto) {
        return `This action updates a #${id} nich`;
    }

    remove(id: number) {
        return `This action removes a #${id} nich`;
    }
}
