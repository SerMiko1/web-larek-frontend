import { Events } from '../../types'; 
import { ensureElement } from '../../utils/utils'; 
import { Component } from '../base/Component'; 
import { IEvents } from '../base/Events'; 

/**
 * Интерфейс данных модального окна
 * @property { HTMLElement } content - отображаемое содержимое
 */
interface IModalData {
	content: HTMLElement; // Содержимое модального окна
}

/**
 * View-класс модального окна
 */
class Modal extends Component<IModalData> {
	private _closeButton: HTMLButtonElement; // Кнопка закрытия модального окна
	private _content: HTMLElement; // Содержимое модального окна

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLElement } container - родительский контейнер для элементов модального окна
	 * @param { IEvents } events - брокер событий
	 */
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events); // Вызываем конструктор базового класса

		// Инициализируем элементы модального окна
		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		// Подписываемся на клики для закрытия модального окна
		[this._closeButton, this.container].forEach((element) => {
			element.addEventListener('click', () => {
				this.close(); // Вызываем метод закрытия модального окна
			});
		});
		this._content.addEventListener('click', (event) => event.stopPropagation()); // Предотвращаем закрытие модального окна при клике на содержимое
	}

	/**
	 * Устанавливаем новое содержимое модального окна
	 */
	set content(value: HTMLElement) {
		this._content.replaceChildren(value); // Заменяем содержимое модального окна
	}

	/**
	 * Показываем модальное окно
	 */
	open(): void {
		this.toggleClass(this.container, 'modal_active', true); // Добавляем класс для отображения модального окна
		this.events.emit(Events.OPEN_MODAL); // Эмитируем событие открытия модального окна
	}

	/**
	 * Закрываем модальное окно
	 */
	close(): void {
		this.toggleClass(this.container, 'modal_active', false); // Удаляем класс для скрытия модального окна
		this.content = null; // Сбрасываем содержимое модального окна
		this.events.emit(Events.CLOSE_MODAL); // Эмитируем событие закрытия модального окна
	}

	/**
	 * Рендерим модальное окно с данными
	 */
	render(data: IModalData): HTMLElement {
		super.render(data); // Вызываем метод рендеринга базового класса
		this.open(); // Открываем модальное окно
		return this.container; // Возвращаем контейнер модального окна
	}
}

export { Modal };
