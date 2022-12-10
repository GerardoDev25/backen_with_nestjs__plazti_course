export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly stock: number;
}
export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly price?: number;
  readonly stock?: number;
}
