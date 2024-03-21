import { Api, ApiListResponse } from './base/api';
import { ILot, IOrderAPI } from '../types'; 

/**
 * Интерфейс API для сервиса web-larek
 * @method getLotItem - получить информацию по конкретному лоту
 * @method getLotList - выгрузить все доступные лоты
 * @method postOrderLots - отправить на сервер запрос на оформление заказа
 */
interface ILarekAPI {
	getLotItem: (id: string) => Promise<ILot>; // Метод для получения информации по конкретному лоту
	getLotList: () => Promise<ILot[]>; // Метод для выгрузки всех доступных лотов
	postOrderLots: (order: IOrderAPI) => Promise<IOrderResult>; // Метод для отправки запроса на оформление заказа
}

/**
 * Интерфейс ответа на post запроса на оформление заказа
 * @property {string} id - идентификатор заказа
 * @property {number} total - общая стоимость заказа
 */
interface IOrderResult {
	id: string; // Идентификатор заказа
	total: number; // Общая стоимость заказа
}

/**
 * Класс API для сервиса web-larek
 */
class LarekAPI extends Api implements ILarekAPI {
	private readonly cdn: string; // URL для CDN

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { string } cdn используемый домен со статикой
	 * @param { string } baseUrl используемый домен сервера
	 * @param { RequestInit } options параметры запроса
	 */
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options); // Вызов конструктора родительского класса Api
		this.cdn = cdn; // Присвоение значения для URL CDN
	}

	/**
	 * Получить информацию по конкретному лоту
	 * @param { string } id идентификатор лота
	 * @returns { Promise<ILot> } объект лота
	 */
	getLotItem(id: string): Promise<ILot> {
		return this.get(`/product/${id}`).then((item: ILot) => ({
			...item,
			image: this.cdn + item.image, // Добавление URL CDN к изображению лота
		}));
	}

	/**
	 * Выгрузить все доступные лоты
	 * @returns { Promise<ILot[]> } объекты лотов
	 */
	getLotList(): Promise<ILot[]> {
		return this.get('/product/').then((data: ApiListResponse<ILot>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image, // Добавление URL CDN к изображению лота
			}))
		);
	}

	/**
	 * Отправить на сервер запрос на оформление заказа
	 * @param { IOrderAPI } order данные запроса
	 * @returns { Promise<IOrderResult> } результат запроса
	 */
	postOrderLots(order: IOrderAPI): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}

export { LarekAPI }; 
