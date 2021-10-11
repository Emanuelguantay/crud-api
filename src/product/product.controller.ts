import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor( private readonly ProductService: ProductService){

    }

    @Get()
    async getAll(){
        return await this.ProductService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.ProductService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ProductDto){
        return await this.ProductService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto){
        return await this.ProductService.update(id, dto);
    }

    @Delete(':id')
    async deleted(@Param('id', ParseIntPipe) id: number){
        return await this.ProductService.deleted(id);
    }
}
