import { Events } from '../../types';
import { createElement, ensureElement, formatSinaps } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

// Интерфейс для представления корзины
interface IBasketView {
	items: HTMLElement[];
	total: number;
	valid: boolean;
}

// Класс представления корзины
class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	// Конструктор класса
	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);

		// Находим необходимые элементы корзины
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		// Подписываемся на событие нажатия кнопки оформления заказа
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit(Events.OPEN_FIRST_ORDER_PART);
			});
		}

		// Инициализируем массив элементов корзины
		this.items = [];
	}

	// Устанавливает элементы корзины
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	// Устанавливает общую стоимость корзины
	set total(total: number) {
		this.setText(this._total, formatSinaps(total));
	}

	// Устанавливает флаг валидности корзины и обновляет состояние кнопки оформления заказа
	set valid(value: boolean) {
		this.setDisabled(this._button, !value);
	}
}

export { Basket };
