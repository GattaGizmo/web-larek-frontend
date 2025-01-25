import { Api } from "../components/base/api";
import { EventEmitter } from "../components/base/events";
import { ContactsData} from '../components/model/ContactsData';
import { AppData } from '../components/model/AppData';
import { Page } from "../components/view/PageView";
import { Modal } from "../components/view/ModalView";
import { BasketView } from '../components/view/BasketView';
import { OrderView } from "../components/view/OrderView";
import { Success } from "../components/view/SuccessView";
import { CategoryChoice } from "../types";
import { cloneTemplate } from "./utils";
import { ensureElement } from "./utils";

export const successTemplate = ensureElement<HTMLTemplateElement>('#success');
export const cardCatalogueTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
export const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
export const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
export const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
export const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
export const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');



export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;
export const api = new Api(API_URL);
export const events = new EventEmitter();
export const appData = new AppData({}, events);
export const page = new Page(document.body, events);
export const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
// @ts-ignore
export const basket = new BasketView(cloneTemplate(basketTemplate), events);
export const order = new OrderView('order', cloneTemplate(orderTemplate), events);
export const contacts = new ContactsData(cloneTemplate(contactsTemplate), events);
export const categoryChoice: CategoryChoice = { 'софт-скил': 'card__category_soft', 'другое': 'card__category_other', 'дополнительное': 'card__category_additional', 'кнопка': 'card__category_button', 'хард-скил': 'card__category_hard' }
export const success = new Success('order-success', cloneTemplate(successTemplate), {onClick: () => {events.emit('modal:close'), modal.closeModal()}})
