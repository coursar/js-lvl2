import CashbackService from './services/CashbackService/CashbackService.js';
import CashbackComponent from './components/Cashback/Cashback.js';

const cashbackService = new CashbackService();

const rootEl = document.querySelector('#root');
const cashbackEl = new CashbackComponent(rootEl, cashbackService);

