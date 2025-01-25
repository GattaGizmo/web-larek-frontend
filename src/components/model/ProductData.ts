import { Model } from "../base/Model";
import { IProduct } from '../../types';
import { IEvents } from '../base/events';

export class ProductData extends Model<IProduct> {
	picked: boolean;
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;

	constructor(picked: Partial<IProduct>, events: IEvents) {
		super(picked, events);
		this.events = events;
	}
}