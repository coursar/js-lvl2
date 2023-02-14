export default class CashbackService {
  #percent = 0.05;
  #limit = 1000;

  calculate(amount) {
    const cashback = amount * this.#percent;
    if (cashback > this.#limit) {
      return this.#limit;
    }

    return cashback;
  }
}
