const template = document.createElement('template');
template.innerHTML = `
<div data-widget="cashback-calculator">
  <form data-id="form">
    <div>
      <input data-id="amount" name="amount">
      <span data-id="amount-error" class="input-error"></span>
    </div>
    <button>Calculate</button>
    <div data-id="result"></div>
  </form>
</div>
`;

export default class CashbackComponent {
  #parentEl;
  #el;

  #cashbackService;

  #formEl;
  #amountInputEl;
  #amountErrorEl;
  #resultEl;

  constructor(parentEl, cashbackService) {
    this.#parentEl = parentEl;
    this.#el = template.content.cloneNode(true).firstElementChild;

    this.#cashbackService = cashbackService;

    // !мы не ищем элементы в обработчиках
    this.#formEl = this.#el.querySelector('[data-id="form"]');
    // TODO: потеря контекста (обсудить)
    this.#formEl.addEventListener('submit', (ev) => this.handleFormSubmit(ev));

    this.#amountInputEl = this.#formEl.querySelector('[data-id="amount"]');
    this.#amountErrorEl = this.#formEl.querySelector('[data-id="amount-error"]');

    this.#resultEl = this.#formEl.querySelector('[data-id="result"]');

    this.render();
  }

  handleFormSubmit(ev) {
    // default behaviour
    ev.preventDefault();

    // sync validation
    const trimmedValue = this.#amountInputEl.value.trim();
    const numberValue = Number.parseInt(trimmedValue, 10);
    if (Number.isNaN(numberValue)) {
      this.#amountErrorEl.textContent = 'Please, enter a number';
      this.#amountInputEl.focus();
      // TODO: show error
      return;
    }
    this.#amountErrorEl.textContent = '';

    debugger;
  }

  render() {
    this.#parentEl.append(this.#el);
  }
}
