const template = document.createElement('template');
template.innerHTML = `
<div data-widget="cashback-calculator">
  <form data-id="form">
    <div>
      <input data-id="amount" name="amount">
      <span data-id="amount-error" class="input-error"></span>
    </div>
    <div>
      <input data-id="charity" name="charity">
      <span data-id="charity-error" class="input-error"></span>
    </div>
    <div>
      <input data-id="image" name="image" type="file">
      <span data-id="image-error" class="input-error"></span>
    </div>
    <div>
      <textarea data-id="comment" name="comment"></textarea>
      <span data-id="comment-error" class="input-error"></span>
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
    const formData = new FormData(ev.target);
    const urlSearchParams = new URLSearchParams(formData);

    const xhr = new XMLHttpRequest();
    // setup
    /* query string */
    xhr.open('GET', `http://localhost:9999/?${urlSearchParams.toString()}`, false);
    xhr.send(); // stop the world!

    /* x-www-... */
    // xhr.open('POST', `http://localhost:9999`, false);
    // xhr.send(urlSearchParams); // stop the world!

    /* multipart/form-data */
    // xhr.open('POST', `http://localhost:9999`, false);
    // xhr.send(formData); // stop the world!

    if (xhr.status >= 200 && xhr.status <= 299) {
      const response = xhr.responseText;
      debugger;
    }
  }

  render() {
    this.#parentEl.append(this.#el);
  }
}
