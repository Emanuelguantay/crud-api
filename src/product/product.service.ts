import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity) private productRepository: ProductRepository
    ){}

    async getAll(): Promise<ProductEntity[]>{
        const list = await this.productRepository.find();
        if (!list.length){
            throw new NotFoundException({message: "La lista esta vacia"});
        }
        return list;
    }

    async findById(id: number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne(id);
        if (!product){
            throw new NotFoundException({message: "No existe"});
        }
        return product;
    }

    async findByName(name: string): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({name: name});
        return product? product : null;
    }

    async create(dto: ProductDto): Promise<any>{
        const product = this.productRepository.create(dto);
        await this.productRepository.save(product);
        return {message: `Producto ${product.name} creado`};
    }

    async update(id:number, dto: ProductDto): Promise<any>{
        const product = await this.findById(id);
        dto.name? product.name = dto.name: product.name = await product.name;
        dto.price? product.price = dto.price: product.price = await product.price;
        await this.productRepository.save(product);
        return {message: `Producto ${product.name} actualizado`};
    }

    async deleted(id:number): Promise<any>{
        const product = await this.findById(id);
        await this.productRepository.delete(product);
        return {message: `Producto ${product.name} elimindo`};
    }
}
