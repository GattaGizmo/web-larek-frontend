export interface IPage {
    items: IProduct[];
    basket: number;
}

export interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
}

export interface IOrder {
    payment: string;
    address: string;
    email: string;
    phone: string;
    items: string[];
    totalPrice: number;
}

export interface IBasket {
    items: IProduct[];
    totalPrice: number;
}

export type TProductList = Pick<IProduct, 'title' | 'image' | 'category' | 'price'>;

export type TProductModalInfo = Pick<IProduct, 'title' | 'price' | 'image' | 'category' | 'description'>;

export type TPaymentMethod = 'online' | 'offline';

export type TOrderDelivery = Pick<IOrder, 'payment' | 'address'>;

export type TOrderUserData = Pick<IOrder, 'email' | 'phone' | 'address'>;

export type TBasket = Pick<IBasket, 'totalPrice'>;

export type TSuccessOrder = Pick<IBasket, 'totalPrice'>;
