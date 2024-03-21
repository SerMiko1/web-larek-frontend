import { Events, IPaymentType } from '../../types';
import { ensureElement } from '../../utils/utils'; 
import { IEvents } from '../base/events';
import { Form } from './Form'; 

/**
 * Интерфейс формы оплатой и доставкой
 * @property { IPaymentType } payment - способ оплаты
 * @property { string } address - адрес доставки
 */
interface IOrderDeliveryForm {
	payment: IPaymentType; // Способ оплаты
	address: string; // Адрес доставки
}

/**
 * View-класс формы выбора способа оплаты и адреса доставки
 */
class DeliveryForm extends Form<IOrderDeliveryForm> {
	protected _paymentContainer: HTMLDivElement; // Контейнер для кнопок выбора способа оплаты
	protected _paymentButtons: HTMLButtonElement[]; // Кнопки выбора способа оплаты

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLFormElement } container - объект контейнера формы
	 * @param { IEvents } events - брокер событий
	 */
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events); // Вызываем конструктор родительского класса Form

		// Инициализируем элементы на форме
		this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
		this._paymentButtons = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));

		// Подписываемся на событие клика по кнопке выбора способа оплаты
		this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
			const target = e.target as HTMLButtonElement;
			this.setClassPaymentMethod(target.name); // Вызываем метод установки класса для выбранного способа оплаты
			events.emit(Events.SELECT_PAYMENT, { target: target.name }); // Эмитируем событие выбора способа оплаты
		});
	}

	/**
	 * Управляем выделением кнопки в зависимости от выбранного способа оплаты
	 * @param { string } className - имя класса для выбранного способа оплаты
	 */
	setClassPaymentMethod(className: string): void {
		this._paymentButtons.forEach((btn) => {
			// TODO: возможно тут сравнивать с data-атрибутом
			if (btn.name === className) {
				this.toggleClass(btn, 'button_alt-active', true); // Добавляем класс активности выбранной кнопке
			} else {
				this.toggleClass(btn, 'button_alt-active', false); // Удаляем класс активности у остальных кнопок
			}
		});
	}

	/**
	 * Устанавливаем выбранный способ оплаты
	 * @param { string } value - выбранный способ оплаты
	 */
	set payment(value: string){
		this.setClassPaymentMethod(value); // Вызываем метод установки класса для выбранного способа оплаты
	}

	/**
	 * Устанавливаем адрес доставки
	 * @param { IPaymentType } value - адрес доставки
	 */
	set address(value: IPaymentType) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value; // Устанавливаем значение в поле адреса доставки
	}
    
}

export { DeliveryForm, IOrderDeliveryForm }; 
