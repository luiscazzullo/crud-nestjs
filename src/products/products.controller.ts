import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productsService.createProduct(createProductDTO);
    res.status(HttpStatus.OK).json({ product });
  }

  @Get()
  async getProducts(@Res() res) {
    const products = await this.productsService.getProducts();
    res.status(HttpStatus.OK).json({ products });
  }

  @Get('/:productId')
  async getProductById(@Res() res, @Param('productId') productId) {
    const product = await this.productsService.getProduct(productId);
    if(!product) throw new NotFoundException('El producto no existe');
    res.status(HttpStatus.OK).json({ product });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productId') productId) {
    const product = await this.productsService.deleteProduct(productId);
    if(!product) throw new NotFoundException('El producto no existe');
    res.status(HttpStatus.OK).json({
      message: 'Producto eliminado',
      product
    });
  }
  @Put('/edit/:productId')
  async updateProduct(@Res() res, @Body() createProductDto: CreateProductDTO, @Param('productId') productId) {
    const product = await this.productsService.updateProduct(productId, createProductDto);
    if(!product) throw new NotFoundException('El producto no existe');
    res.status(HttpStatus.OK).json({ product });
  }
}
