import { Model } from "../base/Model";
import { IAppData, IOrder, IOrderForm, ErrorsInForm, IProduct } from '../../types';
import { ProductData } from './ProductData';

export class AppData extends Model<IAppData> {
	catalog: ProductData[];
	order: IOrder = {
		items: [],
		total: null,
		payment: '',
		address: '',
		email: '',
		phone: '',
	};

	basket: ProductData[] = [];
	formErrors: ErrorsInForm = {};

	basketItemsLength() {
		return this.basket.length;
	}

	setItems(): void {
		this.order.items = this.basket.map(({ id }) => id);
	}

	addToBasket(item: ProductData) {
		this.basket.push(item);
	}

	removeFromBasket(id: string): void {
		this.basket = this.basket.filter(({ id: itemId }) => itemId !== id);
	}

	clearBasket() {
		this.basket = [];
	}

	totalPrice() {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	setCatalogue(products: IProduct[]) {
		this.catalog = products.map(item => new ProductData({ ...item, picked: false }, this.events));
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}

	resetPicked(): void {
		this.catalog.forEach(product => (product.picked = false));
	}

	validateOrder(): boolean {
		const errors: ErrorsInForm = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = Object.keys(errors).length > 0 ? errors : {};
		this.events.emit('orderFormErrors:change', this.formErrors);
		return Object.keys(this.formErrors).length === 0;
	}

	validateContacts(): boolean {
		const errors: ErrorsInForm = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = Object.keys(errors).length > 0 ? errors : {};
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(this.formErrors).length === 0;
	}

	validation(field: keyof IOrderForm, value: string): void {
		this.order[field] = value;

		const isContactsValid = this.validateContacts();
		const isOrderValid = this.validateOrder();

		if (isContactsValid) {
			this.events.emit('contacts:ready', this.order);
		}
		if (isOrderValid) {
			this.events.emit('order:ready', this.order);
		}
	}

	resetOrder() {
		this.order = {
			items: [],
			total: null,
			address: '',
			email: '',
			phone: '',
			payment: '',
		};
	}
}