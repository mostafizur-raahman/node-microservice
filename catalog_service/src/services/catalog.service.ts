import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
    private _repository: ICatalogRepository;
    constructor(private readonly catalogRepository: ICatalogRepository) {
        this._repository = catalogRepository;
    }
    async createProduct(data: any) {
        const result = await this._repository.create(data);
        return result;
    }

    updateProduct(data: any) {}

    deleteProduct(id: number) {}

    getProductList(limit: number, offset: number) {}

    getProductById(id: number) {}
}
