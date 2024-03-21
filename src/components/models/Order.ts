import { Events, IFormErrors, ILot, IOrder, IPaymentType } from '../../types'; // Импорт необходимых типов и интерфейсов
import { Model } from '../base/Model'; // Импорт базового класса Model

/**
 * Класс модели заказа
 */
class Order extends Model<IOrder> {
	protected _payment: IPaymentType = 'card'; // Тип оплаты заказа
	protected _address: string = ''; // Адрес доставки
	protected _email: string = ''; // Почта для связи
	protected _phone: string = ''; // Телефон для связи
	protected _items: ILot[] = []; // Список выбранных товаров
	protected _formErrors: IFormErrors = {}; // Ошибки валидации формы заказа

	//Проверка полей формы заказа
	validateOrder(): void {
		this.validatePayment(); // Проверка способа оплаты
		this.validateAddress(); // Проверка адреса доставки
		this.validateEmail(); // Проверка почты
		this.validatePhone(); // Проверка телефона

		this.emitChanges(Events.VALIDATE_ORDER, this._formErrors); // Эмитирование события валидации заказа
	}

	//Обнуление полей заказа
	clearOrder(): void {
		this._payment = 'card'; // Сброс типа оплаты на карту
		this._address = ''; // Сброс адреса доставки
		this._email = ''; // Сброс почты
		this._phone = ''; // Сброс телефона
	}

	//Установка типа оплаты
	set payment(value: IPaymentType) {
		this._payment = value; // Установка типа оплаты
		this.validateOrder(); // Повторная валидация формы
	}

	//Получение типа оплаты
	get payment() {
		return this._payment; // Возврат типа оплаты
	}

	//Проверка способа оплаты
	validatePayment(): void {
		if (!this._payment) {
			this._formErrors.payment = 'Необходимо выбрать способ оплаты';
		} else {
			this._formErrors.payment = '';
		}
	}

	//Установка адреса доставки
	set address(value: string) {
		this._address = value; // Установка адреса доставки
		this.validateOrder(); // Повторная валидация формы
	}

	//Получение адреса доставки
	get address() {
		return this._address; // Возврат адреса доставки
	}

	//Проверка адреса доставки
	validateAddress(): void {
		if (!this._address) {
			this._formErrors.address = 'Необходимо ввести адрес доставки';
		} else {
			this._formErrors.address = '';
		}
		this.emitChanges(Events.VALIDATE_ORDER, this._formErrors); // Эмитирование события валидации заказа
	}

	//Установка почты
	set email(value: string) {
		this._email = value.toLowerCase(); // Приведение почты к нижнему регистру
		this.validateOrder(); // Повторная валидация формы
	}

	//Получение почты
	
	get email() {
		return this._email; // Возврат почты
	}

	//Проверка почты
	validateEmail(): void {
		if (!this._email) {
			this._formErrors.email = 'Необходимо ввести почту';
		} else {
			this._formErrors.email = '';
		}
		this.emitChanges(Events.VALIDATE_ORDER, this._formErrors); // Эмитирование события валидации заказа
	}

	//Установка телефона
	 
	set phone(value: string) {
		this._phone = value; // Установка телефона
		this.validateOrder(); // Повторная валидация формы
	}

	//Получение телефона
	get phone() {
		return this._phone; // Возврат телефона
	}

	//Проверка телефона
	validatePhone(): void {
		if (!this._phone) {
			this._formErrors.phone = 'Необходимо ввести телефон';
		} else {
			this._formErrors.phone = '';
		}
		this.emitChanges(Events.VALIDATE_ORDER, this._formErrors); // Эмитирование события валидации заказа
	}

	//Установка списка товаров в заказе
	set items(value: ILot[]) {
		this._items = value; // Установка списка товаров
	}

	//Получение списка товаров в заказе
	get items() {
		return this._items; // Возврат списка товаров
	}

	//Отправка заказа
	postOrder(): void {
		this.clearOrder(); // Обнуление данных заказа
		this.emitChanges(Events.PLACE_ORDER); // Эмитирование события размещения заказа
	}
}

export { Order };
