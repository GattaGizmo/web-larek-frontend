import "./scss/styles.scss";
import { ApiListResponse } from "./components/base/api";
import { IAPIResponse, IOrderForm } from './types';
import { ProductData } from './components/model/ProductData';
import { BasketWithProduct } from './components/view/BasketView';
import { CatalogueItem, CatalogueItemPreview } from "./components/view/CardProductView";
import { basket } from "./utils/constants";
import { order } from "./utils/constants";
import { contacts } from "./utils/constants";
import { success } from "./utils/constants";
import { api, events, appData, page, modal, cardCatalogueTemplate, cardPreviewTemplate, cardBasketTemplate } from "./utils/constants";
import { cloneTemplate } from "./utils/utils";


api.get('/product')
  .then((response: IAPIResponse) => {
    appData.setCatalogue(response.items);
    console.log("Продукты загружены и сохранены:", response.items);
  })
  .catch((error) => {
    console.error("Ошибка при загрузке продуктов:", error);
  });

events.on('catalog:changed', () => {
  const updatedCatalogue = appData.catalog.map((item) => {
    const itemConfig = {
      onClick: () => events.emit('card:open', item),
    };
    const catalogueItem = new CatalogueItem(cloneTemplate(cardCatalogueTemplate), itemConfig);

    return catalogueItem.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });
  page.catalogue = updatedCatalogue;
});

events.on('modal:close', () => {
  page.locked = false;
});


events.on('card:open', (selectedItem: ProductData) => {
  page.locked = true;

  const previewItem = new CatalogueItemPreview(
    cloneTemplate(cardPreviewTemplate),
    {
      onClick: () => events.emit('card:toBasket', selectedItem),
    }
  );

  modal.render({
    content: previewItem.render({
      picked: selectedItem.picked,
      id: selectedItem.id,
      title: selectedItem.title,
      description: selectedItem.description,
      image: selectedItem.image,
      category: selectedItem.category,
      price: selectedItem.price,
    }),
  });
});

events.on('card:toBasket', (item: ProductData) => {
  item.picked = true;
  appData.addToBasket(item);
  page.totalCount = appData.basketItemsLength();
  modal.closeModal();
});

events.on('basket:open', () => {
  page.locked = true;

  const basketContent = {
    items: appData.basket.map((item, index) => {
      const basketProductConfig = { onClick: () => events.emit('basket:remove', item) };
      const newBasketProduct = new BasketWithProduct('card', cloneTemplate(cardBasketTemplate), basketProductConfig);

      return newBasketProduct.render({
        index: index + 1,
        title: item.title,
        price: item.price,
      });
    }),
    totalPrice: appData.totalPrice(),
  };

  modal.render({ content: basket.render(basketContent) });
});

events.on('basket:remove', (item: ProductData) => {
  appData.removeFromBasket(item.id);
  item.picked = false;

  basket.totalPrice = appData.totalPrice();
  page.totalCount = appData.basketItemsLength();
  basket.indexReset();

  if (!appData.basket.length) {
    basket.disableButton();
  }
});

events.on('basket:order', () => {
  modal.render({
    content: order.render({
      address: '',
      valid: false,
      errors: [],
    }),
  });
});

events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { payment, address } = errors;
  order.valid = !(payment || address);
  order.errors = [payment, address].filter(Boolean).join('; ');
});

events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  contacts.valid = !(email || phone);
  contacts.errors = [email, phone].filter(Boolean).join('; ');
});

events.on('input:change', ({ field, value }: { field: keyof IOrderForm, value: string }) => {
  appData.validation(field, value);
});

events.on('order:submit', () => {
  const totalPrice = appData.totalPrice();
  appData.order.total = totalPrice;
  appData.setItems();
  modal.render({
    content: contacts.render({
      valid: false,
      errors: [],
    }),
  });
});

events.on('contacts:submit', () => {
  api.post('/order', appData.order)
    .then((response) => {
      events.emit('order:success', response);
      appData.clearBasket();
      appData.resetOrder();
      order.buttonsDisabled();
      page.totalCount = 0;
      appData.resetPicked();
    })
    .catch((error) => {
      console.error(error);
    });
});

events.on('order:success', (response: ApiListResponse<string>) => {
  const { total } = response;
  modal.render({
    content: success.render({
      description: total,
    }),
  });
});