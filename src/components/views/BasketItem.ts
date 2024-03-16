import { ensureElement, formatSinaps } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ICardActions } from './Card';
import { Component } from '../base/Component';

// Интерфейс для элементов в корзине
interface IBasketCard {
	index: number; // Индекс лота в корзине
	title: string; // Название лота
	price: number; // Цена лота
	delete: () => void; // Функция для удаления лота из корзины
}

class BasketItem extends Component<IBasketCard> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteBtn: HTMLButtonElement;

	/**
	 * Конструктор класса
	 * @constructor
	 * @param { HTMLElement } container - HTML-элемент контейнера (шаблона) карточки в корзине
	 * @param { IEvents } events - брокер событий для обработки событий карточки
	 * @param { ICardActions } actions - доступные действия для привязки
	 */
	constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
		super(container, events);

		// Находим необходимые элементы карточки в корзине
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._deleteBtn = container.querySelector('.card__button');

		// Подписываемся на событие удаления элемента из корзины
		this._deleteBtn.addEventListener('click', (event: MouseEvent) => {
			actions?.onClick?.(event);
		});
	}

	// Устанавливает индекс лота в корзине
	set index(value: number) {
		this.setText(this._index, value + 1); // Индекс начинается с 0, поэтому добавляем 1 для отображения
	}

	// Устанавливает название лота
	set title(value: string) {
		this.setText(this._title, value);
	}

	// Устанавливает цену лота
	set price(value: number) {
		this.setText(this._price, formatSinaps(value));
	}
}

export { BasketItem };
