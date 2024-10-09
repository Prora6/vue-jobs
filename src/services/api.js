import axios from 'axios';
import { decodeText } from '../utils/decodeText';

export async function fetchVacancies() {
    try {
        const response = await axios.get('https://gsr-rabota.ru/api/v2/Vacancies/All/List');
        const vacancies = response.data.map(vacancy => {
            return {
                ...vacancy,
                proftitle: decodeText(vacancy.proftitle),
                placetitle: decodeText(vacancy.placetitle),
                directiontitle: decodeText(vacancy.directiontitle),
                clientname: decodeText(vacancy.clientname),
            };
        });
        return vacancies;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}
