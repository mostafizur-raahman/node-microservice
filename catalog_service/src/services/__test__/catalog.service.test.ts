import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

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

    // run the test
    describe("createProduct", () => {
        test("should create product", async () => {
            const service = new CatalogService(repository);

            const requestBody = {
                name: "Phone",
                description: "This is good phone",
                stock: 100,
                price: 100,
            };
            const result = await service.createProduct(requestBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        });

        test("should product alreday exists", () => {});
    });
});
