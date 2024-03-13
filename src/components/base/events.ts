// Создание алиасов для типов данных
type EventName = string | RegExp; // Имя события может быть строкой или регулярным выражением
type Subscriber = Function; // Подписчик - функция, обрабатывающая событие
type EmitterEvent = { // Тип данных для события, содержащего имя и данные
    eventName: string,
    data: unknown
};

// Интерфейс, определяющий методы для работы с событиями
export interface IEvents {
    // Метод для подписки на событие
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    // Метод для инициирования события
    emit<T extends object>(event: string, data?: T): void;
    // Метод для создания триггера события
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// Реализация класса для управления событиями
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>; // Хранилище событий и подписчиков

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>(); // Инициализация хранилища
    }

    // Метод для подписки на событие
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) { // Проверяем, есть ли уже подписчики на это событие
            this._events.set(eventName, new Set<Subscriber>()); // Если нет, создаем новый набор
        }
        this._events.get(eventName)?.add(callback); // Добавляем подписчика
    }

    // Метод для отписки от события
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) { // Проверяем, есть ли подписчики на это событие
            this._events.get(eventName)!.delete(callback); // Удаляем подписчика из набора
            if (this._events.get(eventName)?.size === 0) { // Если больше нет подписчиков, удаляем событие из хранилища
                this._events.delete(eventName);
            }
        }
    }

    // Метод для инициирования события
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            // Проверяем, подходит ли событие под переданный шаблон или является ли событие именно тем, которое нужно вызвать
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data)); // Вызываем всех подписчиков этого события
            }
        });
    }

    // Метод для подписки на все события
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback); // Добавляем обработчик ко всем событиям
    }

    // Метод для отписки от всех событий
    offAll() {
        this._events = new Map<string, Set<Subscriber>>(); // Очищаем хранилище событий и подписчиков
    }

    // Метод для создания триггера события
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, { ...(event || {}), ...(context || {}) }); // Инициируем событие с переданными данными
        };
    }
}
