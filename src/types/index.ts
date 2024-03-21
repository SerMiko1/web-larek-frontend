
import { IOrderContactsForm } from '../components/views/ContactsForm'; 
import { IOrderDeliveryForm } from '../components/views/DeliveryForm'; 

enum Events {
	LOAD_LOTS = 'catalog:changed', // подгружаем доступные лоты
	OPEN_LOT = 'card:open', // открываем карточку лота для просмотра
	OPEN_BASKET = 'basket:open', // открываем корзину
	CHANGE_LOT_IN_BASKET = 'lot:changed', // добавляем/удаляем лот из корзины
	VALIDATE_ORDER = 'formErrors:changed', // проверяем форму отправки
	OPEN_FIRST_ORDER_PART = 'order_payment:open', // начинаем оформление заказа
	FINISH_FIRST_ORDER_PART = 'order:submit', // заполнили первую форму
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', // продолжаем оформление заказа
	FINISH_SECOND_ORDER_PART = 'contacts:submit', // заполнили первую форму
	PLACE_ORDER = 'order:post', // завершаем заказ
	SELECT_PAYMENT = 'payment:changed', // выбираем способ оплаты
	INPUT_ORDER_ADDRESS = 'order.address:change', // изменили адрес доставки
	INPUT_ORDER_EMAIL = 'contacts.email:change', // изменили почту для связи
	INPUT_ORDER_PHONE = 'contacts.phone:change', // изменили телефон для связи
	OPEN_MODAL = 'modal:open', // блокировка при открытии модального окна
	CLOSE_MODAL = 'modal:close', // снятие блокировки при закрытии модального окна
}

/**
 * Доступные категории карточек
 */
type ILotCategory =
	| 'софт-скил'
	| 'другое' 
	| 'дополнительное' 
	| 'кнопка' 
	| 'хард-скил';

/**
 * Интерфейс лота из Postman
 * @property { string } id - идентификатор лота
 * @property { string } title - заголовок лота
 * @property { string } description - описание лота
 * @property { string } image - полный путь до файла картинки лота
 * @property { ILotCategory } category - категория лота
 * @property { number } price - цена лота
 */
interface ILotItem {
	id: string; // идентификатор лота
	title: string; // заголовок лота
	description: string; // описание лота
	image: string; // полный путь до файла картинки лота
	category: ILotCategory; // категория лота
	price: number | null; // цена лота
}

/**
 * Интерфейс отслеживания карточки
 * @property { boolean } isOrdered - признак включения в заказ
 * @method placeInBasket - добавляем лот в корзину
 * @method removeFromBasket - удаляем лот из корзины
 */
interface ILarek {
	isOrdered: boolean; // признак включения в заказ
	placeInBasket: () => void; // добавляем лот в корзину
	removeFromBasket: () => void; // удаляем лот из корзины
}

/**
 * Интерфейс карточки в приложении
 */
type ILot = ILotItem & ILarek;

type IPaymentType = 'card' | 'cash';

/**
 * Полный интерфейс формы
 */
type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

/**
 * Интерфейс API
 * @property { string[] } items - индексы покупаемых лотов
 * @property { number } total - общая стоимость заказа
 */
interface IOrderAPI extends IOrderForm {
	items: string[]; // индексы покупаемых лотов
	total: number; // общая стоимость заказа
}

/**
 * Полный интерфейс формы
 * @property { ILot[] } items - объекты лотов в корзине
 * @method validateOrder - проверка полей формы
 * @method clearOrder - обнуляем поля заказа
 * @method validatePayment - проверяем способ оплаты
 * @method validateAddress - проверяем адрес доставки
 * @method validateEmail - проверяем почту
 * @method validatePhone - проверяем телефон
 * @method postOrder - завершаем заказ
 */
interface IOrder extends IOrderForm {
	items: ILot[]; // объекты лотов в корзине
	validateOrder(): void; // проверка полей формы
	clearOrder(): void; // обнуляем поля заказа
	validatePayment(): void; // проверяем способ оплаты
	validateAddress(): void; // проверяем адрес доставки
	validateEmail(): void; // проверяем почту
	validatePhone(): void; // проверяем телефон
	postOrder(): void; // завершаем заказ
}

type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

type CatalogChangeEvent = {
	catalog: ILot[];
};

type IBasketItem = Pick<ILot, 'id' | 'title' | 'price'>;

/**
 * Интерфейс модели всего приложения
 * @property {ILot[]} catalog - список доступных лотов
 * @property {ILot[]} basket - список лотов в корзине
 * @property {IOrder} order - объект заказа
 * @property {ILot} preview - лот для модального окна
 * @method isLotInBasket - проверяем, что лот находится в каталоге
 * @method clearBasket - очищаем корзину
 * @method getTotalAmount - получить общую стоимость товаров в корзин
 * @method getBasketIds - получить список индексов в корзине
 * @method getBasketLength - получить количество товаров в корзине
 * @method initOrder - инициализируем объект заказа
 */
interface IAppState {
	catalog: ILot[]; // доступные лоты
	basket: ILot[]; // лоты в корзине
	order: IOrder; // заказ
	preview: ILot; // лот для модального окна
	isLotInBasket(item: ILot): boolean; // проверка находится ли лот в корзине
	clearBasket(): void; // очищаем корзину
	getTotalAmount(): number; // получить стоимость корзины
	getBasketIds(): number; // получить список индексов в корзине
	getBasketLength(): number; // получить количество товаров в корзине
	initOrder(): IOrder; // инициализируем объект заказа
}

export {
	ILotCategory,
	ILotItem,
	ILarek,
	ILot,
	IPaymentType,
	IOrderDeliveryForm,
	IOrderForm,
	IFormErrors,
	IOrder,
	IBasketItem,
	IAppState,
	CatalogChangeEvent,
	IOrderAPI,
	Events,
};
