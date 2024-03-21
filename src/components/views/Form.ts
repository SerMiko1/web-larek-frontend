import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component'; 
import { IEvents } from '../base/events'; 

/**
 * Интерфейс состояния формы
 * @property { boolean } valid - признак валидности формы
 * @property { string[] } errors - список ошибок на форме
 */
interface IFormState {
	valid: boolean; // Признак валидности формы
	errors: string[]; // Список ошибок на форме
}

/**
 * View-класс формы
 */
class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement; // Кнопка отправки формы
	protected _errors: HTMLElement; // Элемент для отображения ошибок

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLFormElement } container - объект контейнера формы
	 * @param { IEvents } events - брокер событий
	 */
	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events); // Вызываем конструктор базового класса

		// Инициализируем элементы формы
		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		// Прослушиваем события ввода в поле формы
		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T; // Получаем имя поля из атрибута name элемента
			const value = target.value; // Получаем значение поля
			this.onInputChange(field, value); // Вызываем метод обработки изменения значения поля
		});

		// Прослушиваем событие отправки формы
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault(); // Предотвращаем стандартное действие отправки формы
			this.events.emit(`${this.container.name}:submit`); // Эмитируем событие отправки формы
		});
	}

	/**
	 * Метод для обработки изменения значения поля ввода
	 * @param { keyof T } field - имя поля
	 * @param { string } value - новое значение поля
	 */
	protected onInputChange(field: keyof T, value: string): void {
		const eventName = `${this.container.name}.${String(field)}:change`; // Генерируем имя события изменения поля
		this.events.emit(eventName, {
			field,
			value,
		}); // Эмитируем событие изменения поля
	}

	/**
	 * Устанавливаем состояние валидности формы
	 */
	set valid(value: boolean) {
		this.setDisabled(this._submit, !value); // Устанавливаем состояние активности кнопки отправки формы
	}

	/**
	 * Устанавливаем сообщения об ошибках на форме
	 */
	set errors(value: string[]) {
		this.setText(this._errors, value.join(', ')); // Устанавливаем текст ошибок на форме
	}

	/**
	 * Рендерим форму с указанным состоянием
	 */
	render(state: Partial<T> & IFormState): HTMLFormElement {
		const { valid, errors, ...inputs } = state; // Разделяем состояние на валидность, ошибки и остальные поля
		super.render({ valid, errors }); // Рендерим базовый компонент с валидностью и ошибками
		Object.assign(this, inputs); // Копируем остальные поля в текущий объект
		return this.container; // Возвращаем контейнер формы
	}
}

export { Form }; 
