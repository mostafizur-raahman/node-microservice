import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 1, max: 1000 }))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("stock", faker.number.int({ min: 1, max: 1000 }))
    .attr("price", +faker.number.int());

const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 10, max: 1000 }),
        ...rest,
    };
};
describe("catalogService", () => {
    let repository: ICatalogRepository;
    // set up
    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    //clean up
    afterEach(() => {
        repository = null as unknown as MockCatalogRepository;
    });

    // run the test for create product
    describe("createProduct", () => {
        test("should create product", async () => {
            const service = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });

            const result = await service.createProduct(requestBody);

            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        });

        test("should throw an error with unable to create product", async () => {
            const service = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest.spyOn(repository, "create").mockImplementationOnce(() =>
                Promise.resolve({} as Product)
            );

            await expect(service.createProduct(requestBody)).rejects.toThrow(
                "unable to create product"
            );
        });

        test("should throw an error with product already exists", async () => {
            const service = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest.spyOn(repository, "create").mockImplementationOnce(() =>
                Promise.reject(new Error("product already exist"))
            );

            await expect(service.createProduct(requestBody)).rejects.toThrow(
                "product already exist"
            );
        });
    });

    // run the test for update rpoduct
    describe("updateProduct", () => {
        test("should update product", async () => {
            const service = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({ min: 10, max: 1000 }),
            });

            const result = await service.updateProduct(requestBody);

            expect(result).toMatchObject(requestBody);
        });

        test("should throw an error with product does not exist", async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, "update").mockImplementationOnce(() =>
                Promise.reject(new Error("product does not exist"))
            );

            await expect(service.updateProduct({})).rejects.toThrow(
                "product does not exist"
            );
        });
    });

    // run the test for get products
    describe("getProducts", () => {
        test("should get products with offset and limit", async () => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({ min: 10, max: 100 });

            const products = productFactory.buildList(randomLimit);

            jest.spyOn(repository, "find").mockImplementationOnce(() =>
                Promise.resolve(products)
            );
            const result = await service.getProductList(randomLimit, 0);

            expect(result.length).toEqual(randomLimit);

            expect(result).toMatchObject(products);
        });

        test("should throw an error with products does not exist", async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, "find").mockImplementationOnce(() =>
                Promise.reject(new Error("products does not exist"))
            );

            await expect(service.getProductList(0, 0)).rejects.toThrow(
                "products does not exist"
            );
        });
    });

    // run the test for get product
    describe("getProduct", () => {
        test("should get product by id", async () => {
            const service = new CatalogService(repository);

            const product = productFactory.build();

            jest.spyOn(repository, "findOne").mockImplementationOnce(() =>
                Promise.resolve(product)
            );

            const result = await service.getProduct(product.id!);

            expect(result).toMatchObject(product);
        });
        test("should throw an error with products does not exist", async () => {
            const service = new CatalogService(repository);
            const product = mockProduct({
                id: faker.number.int({ min: 10, max: 1000 }),
            });

            jest.spyOn(repository, "findOne").mockImplementationOnce(() =>
                Promise.reject(new Error("product does not exist"))
            );

            await expect(service.getProduct(product.id)).rejects.toThrow(
                "product does not exist"
            );
        });
    });
});
