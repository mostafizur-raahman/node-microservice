import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
    private _catalogRepository: ICatalogRepository;
    constructor(private readonly catalogRepository: ICatalogRepository) {
        this._catalogRepository = catalogRepository;
    }
    createProduct(data: any) {}

    updateProduct(data: any) {}

    deleteProduct(id: number) {}

    getProductList(limit: number, offset: number) {}

    getProductById(id: number) {}
}
