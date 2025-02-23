import { Product } from "../models/product.model";

export interface ICatalogRepository {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any): Boolean;
    find(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
}
