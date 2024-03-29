# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

Проект структурирован следующим образом для лучшей организации и поддерживаемости кода.

- `src/`: основная директория исходных файлов проекта
  - `src/components/`: директория с JavaScript компонентами
    - `src/components/base/`: директория с базовым кодом
    - `src/components/models/`: директория с классами Model, используемыми в приложении
    - `src/components/views/`: директория с классами View, отвечающими за отображение данных и пользовательский интерфейс

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

# Описание классов базового кода

### 1. Класс Api

Класс `Api` представляет собой основной инструмент доступа к веб-серверу. Он обеспечивает два основных типа операций: безопасные операции, которые используют метод GET для получения данных, и небезопасные операции, которые включают методы POST и DELETE для изменения данных на сервере.

### 2. Класс Component

Класс `Component<T>`
Абстрактный базовый класс, предназначенным для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления(View)

`constructor(container: HTMLElement)` - принимает элемент контейнера, в который будет помещен компонент.

Методы:
  - `toggleClass` - переключается класс для переданного элемента.
  - `setText` - устанавливает текстовое содержимое для переданного элемента.
  - `setImage` - устанавливает изображения и альтернативный текст для изображения (опционально) для переданного элемента типа HTMLImageElement
  - `setDisabled` - изменяет статус блокировки для переданного элемента.
  - `setHidden`, `setVisible` - скрывает, отображает переданный элемент.
  - `render` - рендерит компонент, используя переданные данные. Метод должен быть переназначен в дочерних классах.

### 3. Класс EventEmitter

Класс `EventEmitter` 
реализует интерфейс IEvents для управления событиями. Он предоставляет методы для подписки на события, инициирования событий, создания триггеров событий, а также отписки от событий.

`constructor() { this._events = new Map<EventName, Set<Subscriber>>(); }` - инициализация хранилища событий и подписчиков.

Методы:

- `on<T extends object>(eventName: EventName, callback: (data: T) => void): void` - Этот метод используется для подписки на событие. Принимает имя события eventName и функцию обратного вызова callback, которая будет вызываться при наступлении события.
- `off(eventName: EventName, callback: Subscriber): void` - Метод для отписки от события. Принимает имя события eventName и функцию обратного вызова callback, которая была использована при подписке на событие.
- `emit<T extends object>(eventName: string, data?: T): void` - Метод для инициирования события. Принимает имя события eventName и опциональные данные data, связанные с этим событием.
- `onAll(callback: (event: EmitterEvent) => void): void` - Метод для подписки на все события. Принимает функцию обратного вызова callback, которая будет вызываться при любом событии.
- `offAll(): void` - Метод для отписки от всех событий. Удаляет все подписки на события и очищает хранилище событий и подписчиков.
- `trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void` - Метод для создания триггера события. Принимает имя события eventName и опциональный контекст context, который будет добавлен к данным события при инициировании. Возвращает функцию, которая инициирует событие с переданными данными.

### 4. Класс Model

Класс `Model<T>` 
является абстрактным базовым классом, предназначенным для создания моделей данных в приложении. Он предоставляет базовый функционал для работы с данными и уведомлений о изменениях в данных. Класс наследуется другими классами, которые представляют конкретные модели данных.

`constructor(data: Partial<T>, protected events: IEvents)` -   Принимает частичные данные типа и объект брокера событий events, который используется для уведомления об изменениях в данных.

Метод:
- `emitChanges` - используется для сообщения о изменениях в модели. Принимает идентификатор события (event) и данные (payload), связанные с этим событием. Затем метод эмитирует событие с переданными данными через объект брокера событий.

## Классы модели данных
### 1. Класс AppState

Класс `AppState` представляет данные всего приложения и позволяет отслеживать его состояние. Внутри себя он содержит следующие свойства:

- `catalog`: для отслеживания списка доступных лотов. Установка данного свойства вызывает событие `catalog:changed`.
- `basket`: для отслеживания лотов, находящихся в корзине.
- `order`: отслеживает состояние заказа.
- `preview`: отслеживает лот, который используется для подробного изучения в модальном окне.

Класс `AppState` также реализует дополнительные методы для доступа к методам перечисленных выше свойств.

### 2. Класс LotItem

Класс `LotItem` представляет данные отдельной карточки лота. Его структура определяется ответом от API-сервера с добавлением свойств и методов, реализующих логику взаимодействия с корзиной через вызов события `lot:changed`.

### 3. Класс Order

Класс `Order` представляет данные процесса оформления заказа. Он содержит свойства, соответствующие полям формы оформления заказа, а также реализует простейшую логику валидации этих свойств на наличие значений. Изменения в любом из свойств вызывают проверку всех полей и генерацию события `formErrors:changed`.

## Компоненты представления

### 1. Класс Basket

Класс `Basket` представляет собой представление корзины. Он позволяет задать следующие элементы:

- `list`: список отображаемых элементов в корзине.
- `total`: общую ценность корзины.
- `button`: кнопку открытия формы оформления заказа. Вызов этой кнопки вызывает событие `order_payment:open`.

### 2. Класс BasketItem

Класс `BasketItem` представляет элементы корзины. Он позволяет задать следующие свойства:

- `index`: порядковый номер элемента в корзине.
- `title`: название элемента в корзине.
- `price`: стоимость элемента в корзине.
- `deleteBtn`: кнопку удаления элемента из корзины.

### 3. Класс Card

Класс `Card` представляет отдельную карточку лота.

### 4. Класс ContactsForm

Класс `ContactsForm` также наследуется от класса `Form` и представляет форму оформления заказа с контактной информацией.

Он позволяет задать следующие свойства:

- `email`: почта для связи.
- `phone`: телефон для связи.

### 5. Класс DeliveryForm

Класс `DeliveryForm` наследуется от класса `Form` и представляет форму оформления заказа с информацией об способе оплаты и адресом доставки.

Он позволяет задать следующие свойства:

- `payment`: способ оплаты.
- `address`: адрес доставки.

### 6. Класс Form

Класс `Form` представляет базовую форму. Он позволяет задать следующие элементы:

- `submit`: кнопку отправки формы.
- `errors`: блок отображения ошибок в форме.

В данном классе на весь контейнер отображения привязывается событие отслеживания input для вызова событий вида `container.field:change` и событие `container:submit`.

### 7. Класс Modal

Класс `Modal` представляет собой представление модального окна. Он позволяет задать следующие элементы:

- `content`: для отображения внутреннего содержания модального окна.
- `closeButton`: для отображения кнопки закрытия модального окна.

Класс также привязывает событие закрытия модального окна (`modal:close`) к кликам по кнопке закрытия формы и по родительскому контейнеру модального окна.

### 8. Класс Page

Класс `Page` представляет собой представление всей страницы. Он позволяет задать следующие элементы:

- `counter`: элемент отображения количества товаров в корзине.
- `gallery`: элемент отображения всех доступных карточек.
- `wrapper`: обёртка, позволяющая блокировать прокрутку страницы при открытии модального окна.
- `basket`: кнопка для отображения корзины. Клик по кнопке вызывает событие `basket:open`.

### 9. Класс Success

Класс `Success` определяет отображение основной информации об оформленном заказе, такой как общая сумма заказа (забираем из ответа сервера).

## Внешние связи

### LarekAPI

Взаимодействие с конкретным API-сервером.

**Методы:**
- `getLotItem`: Получение информации по конкретному лоту.
- `getLotList`: Получение информации по всем доступным лотам.
- `postOrderLots`: Оформление заказа через запрос на сервер.

## Ключевые типы данных
```typescript
Модель лота (ILot)

interface ILot {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ILotCategory;
	price: number;
	isOrdered: boolean;
	placeInBasket: () => void;
	removeFromBasket: () => void;
}

Модель приложения (IAppState)

interface IAppState {
    catalog: ILot[]; // Каталог лотов
    basket: ILot[]; // Лоты в корзине
    order: IOrder; // Заказ
    preview: ILot; // Предпросмотр лота
    isLotInBasket(item: ILot): boolean; // Проверка находится ли лот в корзине
    clearBasket(): void; // Очищаем корзину
    getTotalAmount(): number; // Получить стоимость корзины
    getBasketIds(): number[]; // Получить список индексов в корзине
    getBasketLength(): number; // Получить количество товаров в корзине
    initOrder(): IOrder; // Инициализируем объект заказа
}

Модель заказа (IOrder)

interface IOrder {
    payment: IPaymentType; // Тип оплаты заказа
    address: string; // Адрес доставки
    email: string; // Почта для связи
    phone: string; // Телефон для связи
    items: ILot[]; // Объекты лотов в корзине
    formErrors: IFormErrors; // Ошибки валидации формы заказа
    validateOrder(): void; // Проверка полей формы
    clearOrder(): void; // Обнуляем поля заказа
    validatePayment(): void; // Проверка способа оплаты
    validateAddress(): void; // Проверка адреса доставки
    validateEmail(): void; // Проверка почты
    validatePhone(): void; // Проверка телефона
    postOrder(): void; // Отправка заказа
}

События приложения (Events)

enum Events {
	LOAD_LOTS = 'catalog:changed', // подгружаем доступные лоты
	OPEN_LOT = 'card:open', // открываем карточку лота для просмотра
	OPEN_BASKET = 'basket:open', // открываем корзину
	CHANGE_LOT_IN_BASKET = 'lot:changed', // добавляем/удаляем лот из корзины
	VALIDATE_ORDER = 'formErrors:changed', // проверяем форму отправки
	OPEN_FIRST_ORDER_PART = 'order_payment:open', // начинаем оформление заказа
	FINISH_FIRST_ORDER_PART = 'order:submit', // заполнили первую форму
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', // продолжаем оформление заказа
	FINISH_SECOND_ORDER_PART = 'contacts:submit', // заполнили первую форму
	PLACE_ORDER = 'order:post', // завершаем заказ
	SELECT_PAYMENT = 'payment:changed', // выбираем способ оплаты
	INPUT_ORDER_ADDRESS = 'order.address:change', // изменили адрес доставки
	INPUT_ORDER_EMAIL = 'contacts.email:change', // изменили почту для связи
	INPUT_ORDER_PHONE = 'contacts.phone:change', // изменили телефон для связи
	OPEN_MODAL = 'modal:open', // блокировка при открытии модального окна
	CLOSE_MODAL = 'modal:close', // снятие блокировки при закрытии модального окна
}
