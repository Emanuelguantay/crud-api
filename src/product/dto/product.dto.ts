import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { IsNotBlank } from "src/decorator/is-not-blank-decorator";

export class ProductDto{
    
    @IsString()
    @IsNotEmpty()
    @IsNotBlank({message:"El name no puede estar vacio"})
    name?: string;
    
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price?: number;
}