export interface Product {
    status: boolean;
    result: Result[];
}

export interface Result {
    pid:   number;
    title: string;
    brand: string;
    price: number;
    stock: number;
    cid:   number;
}