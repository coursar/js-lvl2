const template = document.createElement('template');
template.innerHTML = `
<div data-widget="cashback-calculator">
  <form data-id="form">
    <div>
      <input data-id="amount" name="amount" type="number">
    </div>
    <button>Calculate</button>
    <div data-id="result"></div>
  </form>
</div>
`;

export default class CashbackComponent {
  #parentEl;
  #el;
  #formEl;

  constructor(parentEl) {
    this.#parentEl = parentEl;
    this.#el = template.content.cloneNode(true).firstElementChild;

    this.#formEl = this.#el.querySelector('[data-id="form"]');
    // TODO: потеря контекста (обсудить)
    this.#formEl.addEventListener('submit', (ev) => this.handleFormSubmit(ev));

    this.render();
  }

  handleFormSubmit(ev) {
    debugger;
  }

  render() {
    this.#parentEl.append(this.#el);
  }
}
