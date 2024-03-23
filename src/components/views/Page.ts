import { Events } from '../../types'; 
import { ensureElement, formatNumber } from '../../utils/utils'; 
import { Component } from '../base/Component'; 
import { IEvents } from '../base/Events'; 

/**
 * Интерфейс страницы
 * @property { number } counter - счётчик элементов в корзине
 * @property { HTMLElement[] } galery - список лотов для отображения
 * @property { boolean } locked - признак блокировки прокрутки
 */
interface IPage {
	counter: number; // счётчик элементов в корзине
	galery: HTMLElement[]; // список лотов для отображения
	locked: boolean; // признак блокировки прокрутки
}

/**
 * View-класс основной страницы
 */
class Page extends Component<IPage> {
	private _counter: HTMLElement; // Элемент счётчика корзины
	private _gallery: HTMLElement; // Элемент галереи
	private _wrapper: HTMLElement; // Основной контейнер страницы
	private _basket: HTMLButtonElement; // Кнопка корзины

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLElement } container Родительский контейнер для элементов
	 * @param { IEvents } events Брокер событий
	 */
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events); // Вызываем конструктор базового класса

		// Инициализируем элементы страницы
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLButtonElement>('.header__basket');

		// Прослушиваем событие открытия корзины и эмитируем соответствующее событие
		this._basket.addEventListener('click', () => {
			this.events.emit(Events.OPEN_BASKET);
		});
	}

	/**
	 * Устанавливаем количество лотов в корзине
	 */
	set counter(value: number) {
		this.setText(this._counter, formatNumber(value)); // Устанавливаем текст с отформатированным числом
	}

	/**
	 * Обновляем список карточек в галерее
	 */
	set galery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items); // Заменяем дочерние элементы в галерее новыми элементами
	}

	/**
	 * Обрабатываем блокировку прокрутки страницы
	 */
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value); // Добавляем/удаляем класс блокировки в зависимости от значения
	}
}

export { Page };
