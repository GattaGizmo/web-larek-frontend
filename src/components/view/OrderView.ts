import { IEvents } from "../base/events";
import { Form } from "./FormView";
import { IOrderPayment } from '../../types';

export class OrderView extends Form<IOrderPayment> {
	protected _online: HTMLButtonElement;
	protected _uponReceipt: HTMLButtonElement;

	constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._online = this.getButtonByName('card');
		this._uponReceipt = this.getButtonByName('cash');

		this.setupButtonEvents();
	}

	private getButtonByName(name: string): HTMLButtonElement | null {
		return this.container.elements.namedItem(name) as HTMLButtonElement;
	}

	private setupButtonEvents() {
		if (this._uponReceipt) {
			this._uponReceipt.addEventListener('click', () => this.handleButtonClick(this._uponReceipt, this._online, 'uponReceipt'));
		}

		if (this._online) {
			this._online.addEventListener('click', () => this.handleButtonClick(this._online, this._uponReceipt, 'online'));
		}
	}

	private handleButtonClick(activeButton: HTMLButtonElement, inactiveButton: HTMLButtonElement, paymentType: string) {
		activeButton.classList.add('button_alt-active');
		inactiveButton.classList.remove('button_alt-active');
		this.onInputChange('payment', paymentType);
	}

	buttonsDisabled() {
		this.removeActiveClass(this._uponReceipt);
		this.removeActiveClass(this._online);
	}

	private removeActiveClass(button: HTMLButtonElement | null) {
		button?.classList.remove('button_alt-active');
	}
}