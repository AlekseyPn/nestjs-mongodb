import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Header,
    Param,
    Post,
    Put,
    HttpStatus,
} from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {ProductsService} from "./products.service";
import {Product} from "./schemas/product.schema";

@Controller('products')
export class ProductsController {
    // @Get()
    // // @Redirect("https://google.com", 301)
    // getAll(@Req() req: Request, @Res() res: Response) {
    //     return "getAll";
    // }

    constructor(private readonly productService: ProductsService) {
    }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") params): Promise<Product> {
        return this.productService.getById(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Delete(":id")
    remove(@Param("id")id: string): Promise<Product> {
        return this.productService.remove(id);
    }

    @Put(":id")
    update(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string): Promise<Product> {
        return this.productService.update(id, updateProductDto);
    }
}
