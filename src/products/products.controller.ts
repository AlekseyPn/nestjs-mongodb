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
    getAll() {
        return this.productService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") params) {
        return this.productService.getById(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Delete(":id")
    remove(@Param("id")id: string) {
        return 'Remove ' + id;
    }

    @Put(":id")
    update(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string) {
        return "Update " + id
    }
}
