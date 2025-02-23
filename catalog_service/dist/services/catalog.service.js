"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
        this._catalogRepository = catalogRepository;
    }
    createProduct(data) { }
    updateProduct(data) { }
    deleteProduct(id) { }
    getProductList(limit, offset) { }
    getProductById(id) { }
}
exports.CatalogService = CatalogService;
