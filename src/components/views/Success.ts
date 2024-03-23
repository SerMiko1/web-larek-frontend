import { ensureElement, formatSinaps } from "../../utils/utils"; // Импорт функций ensureElement и formatSinaps из утилитной папки
import { Component } from "../base/Component"; // Импорт базового класса Component
import { IEvents } from "../base/Events"; // Импорт интерфейса IEvents из папки событий

/**
 * Интерфейс финальной страницы заказа
 * @property { number } total - общая стоимость заказа
 */
interface ISuccess {
    total: number; // Общая стоимость заказа
}

interface ISuccessActions {
    onClick: () => void; // Действие, выполняемое при клике на элемент
}

/**
 * View-класс страницы об успешном оформлении заказа
 */
class Success extends Component<ISuccess> {
    protected _close: HTMLElement; // Элемент для закрытия страницы
    protected _total: HTMLElement; // Элемент для отображения общей стоимости заказа

    /**
     * Базовый конструктор
     * @constructor
     * @param { HTMLElement } container - объект контейнера (темплейта)
     * @param { IEvents } events - брокер событий
     * @param { ICardActions } actions - доступные события для привязки
     */
    constructor(container: HTMLElement, events: IEvents, actions: ISuccessActions) {
        super(container, events); // Вызов конструктора родительского класса Component

        // Инициализация элементов на странице
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container); // Находим и сохраняем элемент общей стоимости заказа
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container); // Находим и сохраняем элемент для закрытия страницы

        // Привязываем событие закрытия страницы
        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick); // Добавляем слушатель события click на элемент закрытия
        }
    }

    /**
     * Setter для установки общей стоимости заказа
     * @param {number} value - новое значение общей стоимости заказа
     */
    set total(value: number) {
        this.setText(this._total, `Списано ${formatSinaps(value)}`); // Используем метод setText для установки текстового контента
    }
}

export { Success };
