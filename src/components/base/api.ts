export type ApiListResponse<Type> = {
	total: number; // Общее количество элементов
	items: Type[]; // Массив элементов указанного типа
};

// Определяем типы HTTP-методов, поддерживаемых API
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Базовый класс для работы с API
export class Api {
	readonly baseUrl: string; // URL базового адреса API
	protected options: RequestInit; // Опции запроса

	/**
	 * Создает новый экземпляр класса Api
	 * @constructor
	 * @param {string} baseUrl - Базовый URL API
	 * @param {RequestInit} options - Опции запроса
	 */
	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для запросов в формате JSON
				...((options.headers as object) ?? {}), // Объединяем дополнительные заголовки из параметров конструктора
			},
		};
	}

	/**
	 * Обрабатывает ответ от сервера
	 * @param {Response} response - Ответ от сервера
	 * @returns {Promise<object>} - Обработанный JSON-объект или сообщение об ошибке
	 */
	protected handleResponse(response: Response): Promise<object> {
		if (response.ok)
			return response.json(); // Если ответ успешный (статус код 2xx), возвращаем JSON
		else
			return response
				.json() // Иначе, обрабатываем JSON ответа, который может содержать ошибку, или возвращаем текст ошибки по умолчанию
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	/**
	 * Выполняет GET-запрос к API
	 * @param {string} uri - Путь к конечной точке API
	 * @returns {Promise<object>} - Обработанный ответ от сервера
	 */
	get(uri: string): Promise<object> {
		return fetch(this.baseUrl + uri, {
			// Выполняем GET-запрос к указанной конечной точке API
			...this.options, // Передаем опции запроса (заголовки и др.)
			method: 'GET', // Устанавливаем метод запроса GET
		}).then(this.handleResponse); // Обрабатываем полученный ответ от сервера
	}

	/**
	 * Выполняет POST-запрос к API
	 * @param {string} uri - Путь к конечной точке API
	 * @param {object} data - Данные, передаваемые в теле запроса (в формате JSON)
	 * @param {ApiPostMethods} method - HTTP-метод запроса (по умолчанию 'POST')
	 * @returns {Promise<object>} - Обработанный ответ от сервера
	 */
	post(
		uri: string,
		data: object,
		method: ApiPostMethods = 'POST'
	): Promise<object> {
		return fetch(this.baseUrl + uri, {
			// Выполняем POST-запрос к указанной конечной точке API
			...this.options, // Передаем опции запроса (заголовки и др.)
			method, // Устанавливаем метод запроса (может быть POST, PUT или DELETE)
			body: JSON.stringify(data), // Передаем данные запроса в виде JSON-строки
		}).then(this.handleResponse); // Обрабатываем полученный ответ от сервера
	}
}
