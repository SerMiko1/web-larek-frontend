import { IEvents } from './events';

// Абстрактный класс View
export abstract class Component<T> {
	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLElement } container - HTML-элемент контейнера (шаблона)
	 * @param { IEvents } events - брокер событий
	 */
	protected constructor(
		protected readonly container: HTMLElement,
		protected events: IEvents
	) {}

	/**
	 * Переключить класс у элемента
	 * @param { HTMLElement } element - целевой HTML-элемент
	 * @param { string } className - имя класса
	 * @param { string } force - true - добавить класс, false - удалить класс
	 */
	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force);
	}

	/**
	 * Установить текстовое содержимое элемента
	 * @param { HTMLElement } element - целевой HTML-элемент
	 * @param { unknown } value - устанавливаемый текст
	 */
	protected setText(element: HTMLElement, value: unknown): void {
		if (element) {
			element.textContent = String(value);
		}
	}

	/**
	 * Изменить статус блокировки элемента
	 * @param { HTMLElement } element - целевой HTML-элемент
	 * @param { boolean } state - целевое состояние блокировки
	 */
	setDisabled(element: HTMLElement, state: boolean): void {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	/**
	 * Скрыть элемент
	 * @param { HTMLElement } element - скрываемый HTML-элемент
	 */
	protected setHidden(element: HTMLElement): void {
		element.style.display = 'none';
	}

	/**
	 * Показать элемент
	 * @param { HTMLElement } element - отображаемый HTML-элемент
	 */
	protected setVisible(element: HTMLElement): void {
		element.style.removeProperty('display');
	}

	/**
	 * Установить изображение с альтернативным текстом
	 * @param { HTMLImageElement } element - HTML-элемент изображения
	 * @param { string } src - путь до картинки
	 * @param { string } alt - альтернативный текст для изображения
	 */
	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt?: string
	): void {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	/**
	 * Вернуть корневой DOM-элемент
	 * @param { Partial<T> } data - используемые данные для заполнения макета
	 * @returns { HTMLElement } - заполненный шаблон
	 */
	render(data?: Partial<T>): HTMLElement {
		// Сливаем данные с текущим экземпляром класса, если они предоставлены
		Object.assign(this as object, data ?? {});
		// Возвращаем контейнер
		return this.container;
	}
}
