import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

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
});
