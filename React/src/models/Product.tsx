export interface Product {
    products: Product[];
    content : Product[]
}

export interface Product {
    pid:   number;
    title: string;
    brand: string;
    price: number;
    stock: number;
    cid:   number;
    oid: number;
    quantity:number
    email:string
}