import { ILotCategory } from '../../types';
import { CATEGOTY_MAP } from '../../utils/constants';
import { ensureElement, formatSinaps } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Интерфейс для действий, доступных на карточке
interface ICardActions {
	onClick: (event: MouseEvent) => void; // Функция, вызываемая при клике на карточку
}

/**
 * Интерфейс карточки
 * @property { string } category - категория лота
 * @property { string } title - заголовок лота
 * @property { string } image - полный путь до файла картинки лота
 * @property { number } price - цена лота
 * @property { string } description - описание лота
 * @property { string } button - текст на кнопке добавления лота в заказ
 */
interface ICard {
	category: string; // Категория лота
	title: string; // Заголовок лота
	image: string; // Полный путь до файла картинки лота
	price: number; // Цена лота
	description: string; // Описание лота
	button?: string; // Текст на кнопке добавления лота в заказ
}

/**
 * View-класс карточки
 */
class Card extends Component<ICard> {
	private _category: HTMLElement; // Элемент для отображения категории
	private _title: HTMLElement; // Элемент для отображения заголовка
	private _image?: HTMLImageElement; // Элемент для отображения изображения
	private _description?: HTMLElement; // Элемент для отображения описания
	private _button?: HTMLButtonElement; // Элемент кнопки
	private _price?: HTMLElement; // Элемент для отображения цены

	/**
	 * Конструктор класса Card
	 * @constructor
	 * @param { string } blockName - название блока
	 * @param { HTMLElement } container - контейнер, в котором будет отображаться карточка
	 * @param { IEvents } events - брокер событий
	 * @param { ICardActions } actions - действия, доступные для привязки
	 */
	constructor(
		protected blockName: string,
		container: HTMLElement,
		events: IEvents,
		actions?: ICardActions
	) {
		super(container, events);

		// Инициализация элементов карточки
		this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._price = container.querySelector(`.${blockName}__price`);

		// Привязка события к кнопке или всей карточке
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	// Методы установки значений для различных свойств карточки

	set category(value: ILotCategory) {
		// Устанавливаем категорию и применяем класс стилей на основе категории
		this.setText(this._category, value);
		this._category.className = '';
		const mainClass = `${this.blockName}__category`;
		const additionalClass = CATEGOTY_MAP[value];
		this._category.classList.add(mainClass, `${mainClass}_${additionalClass}`);
	}

	set title(value: string) {
		// Устанавливаем заголовок карточки
		this.setText(this._title, value);
	}

	set image(value: string) {
		// Устанавливаем изображение и alt текст
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		// Устанавливаем описание карточки
		this.setText(this._description, value);
	}

	set price(value: number) {
		// Устанавливаем цену и активируем/деактивируем кнопку на основе цены
		this.setText(this._price, formatSinaps(value));
		this.setDisabled(this._button, value == null);
	}

	set button(value: string) {
		// Устанавливаем текст на кнопке
		this.setText(this._button, value);
	}
}

export { Card, ICardActions };
