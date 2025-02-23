export class Product {
    constructor(
        public readonly name: string,
        public readonly description: number,
        public readonly price: number,
        public readonly stock: number,
        public readonly id?: number
    ) {}
}
