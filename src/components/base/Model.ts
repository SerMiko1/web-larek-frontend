import { IEvents } from './events';

// класс модели

export abstract class Model<T> {
	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { Partial<T>} data используемые моделью данные
	 * @param { IEvents } events объект брокера событий
	 */
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	/**
	 * Сообщаем об изменении в модели
	 * @param { string } event - идентификатор события
	 * @param { object } payload - данные, которые связаны с событием
	 */
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
