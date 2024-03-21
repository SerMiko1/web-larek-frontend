import { Events, ILot, ILotCategory } from '../../types';
import { Model } from '../base/Model';

/**
 * Класс модели лота
 */
class LotItem extends Model<ILot> {
	id: string; // Идентификатор лота
	title: string; // Название лота
	description: string; // Описание лота
	image: string; // URL изображения лота
	category: ILotCategory; // Категория лота
	price: number; // Цена лота
	isOrdered: boolean; // Флаг, указывающий, добавлен ли лот в корзину

	/**
	 * Добавляет лот в корзину и отправляет событие об изменении состояния лота в корзине
	 */
	placeInBasket(): void {
		this.isOrdered = true; // Устанавливаем флаг isOrdered в true
		// Отправляем событие об изменении состояния лота в корзине
		this.emitChanges(Events.CHANGE_LOT_IN_BASKET, { isOrdered: this.isOrdered });
	}

	/**
	 * Удаляет лот из корзины и отправляет событие об изменении состояния лота в корзине
	 */
	removeFromBasket() {
		this.isOrdered = false; // Устанавливаем флаг isOrdered в false
		// Отправляем событие об изменении состояния лота в корзине
		this.emitChanges(Events.CHANGE_LOT_IN_BASKET, { isOrdered: this.isOrdered });
	}
}

export { LotItem };
