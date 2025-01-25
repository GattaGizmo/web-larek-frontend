import { formatNumberWithSpaces } from "../../utils/utils";
import { Component } from "../base/Component";
import { ISuccessOrderActions, ISuccessOrder } from "../../types";

export class Success extends Component<ISuccessOrder> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessOrderActions) {
		super(container);

		this._description = container.querySelector(`.${blockName}__description`);
		this._button = container.querySelector(`.${blockName}__close`);
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick)
			}
		}
	}
	set description(value: number) {
		this._description.textContent = 'Списано ' + formatNumberWithSpaces(value) + ' синапсов'
	}
}