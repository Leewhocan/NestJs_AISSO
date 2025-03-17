import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NichesService } from './niches.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
import { AuthGuard } from '../guards/AuthGuard';

@Controller('niches')
export class NichesController {
    constructor(private readonly nichesService: NichesService) {}

    @Post()
    create(@Body() createNichDto: CreateNichDto) {
        return this.nichesService.create(createNichDto);
    }

    @Get()
    // @UseGuards(AuthGuard)
    findAll() {
        return this.nichesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.nichesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNichDto: UpdateNichDto) {
        return this.nichesService.update(+id, updateNichDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.nichesService.remove(+id);
    }
}
