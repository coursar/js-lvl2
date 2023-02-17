import ErrorTranslator from './errors/ErrorsTranslator.js';
import CashbackService from './services/CashbackService/CashbackService.js';
import CashbackComponent from './components/Cashback/Cashback.js';

const errorTranslator = new ErrorTranslator();
const cashbackService = new CashbackService();

const rootEl = document.querySelector('#root');
const cashbackEl = new CashbackComponent(rootEl, cashbackService, errorTranslator);
