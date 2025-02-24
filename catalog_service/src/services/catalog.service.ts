import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
    private _repository: ICatalogRepository;
    constructor(private readonly catalogRepository: ICatalogRepository) {
        this._repository = catalogRepository;
    }
    async createProduct(data: any) {
        const result = await this._repository.create(data);
        if (!result.id) {
            throw new Error("unable to create product");
        }
        return result;
    }

    async updateProduct(data: any) {
        const result = await this._repository.update(data);
        //TODO: emit to update record on Elastic search
        return data;
    }

    async deleteProduct(id: number) {}

    async getProductList(limit: number, offset: number) {}

    async getProductById(id: number) {}
}
