export interface IPage {
    items: IProduct[];
    basket: number;
}

export  interface IAPIResponse {
    items: IProduct[];
}

export interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    picked: boolean;
}

export interface IOrder {
    payment: string;
    address: string;
    email: string;
    phone: string;
    items: string[];
    total: number;
}

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderPayment {
    payment: string;
    address: string;
}

export interface IUserContacts {
    email: string;
    phone: string;
}

export interface IBasket {
    items: HTMLElement[];
    totalPrice: number;
}

export interface IBasketActions {
    onClick: (event: MouseEvent) => void;
}

export interface IBasketWithProduct extends IProduct {
    id: string;
    index: number;
}

export interface IAppData {
    basket: IProduct[];
    catalog: IProduct;
    order: IOrder;
    formErrors: ErrorsInForm;
}

export interface ICardProduct {
    picked: boolean;
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
    description: string;
}

export interface ICardProductActions {
    onClick: (event: MouseEvent) => void;
}

export interface IForm {
    valid: boolean;
    errors: string[];
}

export interface IModal {
    content: HTMLElement;
}

export interface ISuccessOrder {
    description: number;
}
export interface ISuccessOrderActions {
    onClick: (event: MouseEvent) => void;
}

export type Category =  'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type CategoryChoice = {
    [key in Category]: string;
};

export type ErrorsInForm = Partial<Record<keyof IOrder, string>>;