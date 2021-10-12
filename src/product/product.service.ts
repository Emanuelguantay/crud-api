import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
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
            throw new NotFoundException(new MessageDto("La lista esta vacia"));
        }
        return list;
    }

    async findById(id: number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne(id);
        if (!product){
            throw new NotFoundException(new MessageDto("No existe"));
        }
        return product;
    }

    async findByName(name: string): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({name: name});
        return product? product : null;
    }

    async create(dto: ProductDto): Promise<any>{
        const exist = await this.findByName(dto.name);
        if (exist) throw new BadRequestException(new MessageDto("Ese nombre ya existe"));
        const product = this.productRepository.create(dto);
        await this.productRepository.save(product);
        return new MessageDto(`Producto ${product.name} creado`);
    }

    async update(id:number, dto: ProductDto): Promise<any>{
        const product = await this.findById(id);
        if (!product) throw new BadRequestException(new MessageDto("Ese producto no existe"));

        const exist = await this.findByName(dto.name);
        if (exist && exist.id !== id) throw new BadRequestException(new MessageDto("Ese nombre ya existe"));

        dto.name? product.name = dto.name: product.name = await product.name;
        dto.price? product.price = dto.price: product.price = await product.price;
        await this.productRepository.save(product);
        return new MessageDto(`Producto ${product.name} actualizado`);
    }

    async deleted(id:number): Promise<any>{
        const product = await this.findById(id);
        await this.productRepository.delete(product);
        return new MessageDto(`Producto ${product.name} elimindo`);
    }
}
