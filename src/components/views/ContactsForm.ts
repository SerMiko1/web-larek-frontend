import { IEvents } from '../base/Events'; 
import { Form } from './Form'; 

/**
 * Интерфейс формы с контактной информацией
 * @property { string } email - почта для связи
 * @property { string } phone - телефон для связи
 */
interface IOrderContactsForm {
	email: string; // Почта для связи
	phone: string; // Телефон для связи
}

/**
 * View-класс формы с контактной информацией
 */
class ContactsForm extends Form<IOrderContactsForm> {
	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLFormElement } container - объект контейнера формы
	 * @param { IEvents } events - брокер событий
	 */
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events); // Вызываем конструктор родительского класса Form
	}

	/**
	 * Устанавливаем значение телефона в форме
	 * @param { string } value - значение телефона для установки
	 */
	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value; // Устанавливаем значение в поле телефона
	}

	/**
	 * Устанавливаем значение почты в форме
	 * @param { string } value - значение почты для установки
	 */
	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value; // Устанавливаем значение в поле почты
	}
}

export { IOrderContactsForm, ContactsForm }; 
