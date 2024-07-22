export class User {
    name!: string;
    mobNumber!: string;
    age!: number;
    dob!: string;
    email!: string;
    password!: string;
    address!: Address;
    language!: string;
    gender!: string;
    aboutYou!: string;
    uploadPhoto!: string;
    agreetc!: boolean;
    role!: string;
}

export class Address {
    id!: string;
    addLine1!: string;
    addLine2!: string;
    city!: string;
    state!: string;
    zipCode!: string;
}

export class Product {
    id!: string;
    name!: string;
    uploadPhoto!: string;
    productDesc!: string;
    mrp!: number;
    dp!: number;
    status!: boolean;
}
export class Order {
    id!: string;
    userId!: number;
    sellerId!: number;
    product!: Product;
    deliveryAddress!: Address;
    contact!: string;
    dateTime!: string;
}