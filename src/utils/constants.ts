import { ILotCategory } from '../types';

const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

const settings = {};

const CATEGOTY_MAP: Record<ILotCategory, string> = {
	'софт-скил': 'soft',
	'другое': 'other',
	'дополнительное': 'additional',
	'кнопка': 'button',
	'хард-скил': 'hard',
};

export { API_URL, CDN_URL, CATEGOTY_MAP, settings };
