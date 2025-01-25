import { Form } from '../view/FormView';
import { IUserContacts } from '../../types';
import { IEvents } from '../base/events';

export class ContactsData extends Form<IUserContacts> {
	constructor(container: HTMLFormElement,events: IEvents) {
		super(container, events);
	}
}