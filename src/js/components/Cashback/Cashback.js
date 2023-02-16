const template = document.createElement('template');
template.innerHTML = `
<div data-widget="cashback-calculator">
  <form data-id="form">
    <div data-id="form-progress" class="progress">0%</div>
    <fieldset data-id="form-fields">
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
    </fieldset>
  </form>
</div>
`;

export default class CashbackComponent {
  #parentEl;
  #el;

  #cashbackService;

  #formEl;
  #formProgressEl;
  #formFieldsEl;
  #formProgress = 0;

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
    this.#formProgressEl = this.#formEl.querySelector('[data-id="form-progress"]');
    this.#formFieldsEl = this.#formEl.querySelector('[data-id="form-fields"]');

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

    // TODO: sync validation
    this.#formFieldsEl.disabled = true;
    this.#formProgressEl.style.visibility = 'visible';
    this.#setProgress(10);
    this.#scheduleProgress();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:9999/?${urlSearchParams.toString()}`);
    setTimeout(() => {
      // TODO...
    }, 500);
    // setInterval(cb, 1000);
    xhr.send();

    // response from server
    // 200, 400, 500, etc
    xhr.onload = (ev) => {
      if (ev.target.status >= 200 && xhr.status <= 299) {
        // TODO:
      }
      // TODO:
    };
    // network error
    xhr.onerror = () => {
      // TODO:
    };
    xhr.onloadend = () => {
      // Bad practice (refactor)
      this.#formProgressEl.style.transitionTimingFunction = 'ease';
      this.#setProgress(100);
      setTimeout(() => {
        this.#formFieldsEl.disabled = false;
        this.#formProgressEl.style.visibility = 'hidden';
        this.#setProgress(0);
      }, 2000);
    };
    xhr.send(); // stop the world!
  }

  #scheduleProgress() {
    setTimeout(() => {
      if (this.#formProgress < 90) {
        this.#formProgressEl.style.transitionTimingFunction = 'linear';
        this.#setProgress(this.#formProgress + 5);
        this.#scheduleProgress();
      }
    }, 500);
  }

  #setProgress(progress) {
    this.#formProgress = progress;
    this.#updateProgress();
  }

  #updateProgress() {
    this.#formProgressEl.style.width = `${this.#formProgress}%`;
    this.#formProgressEl.textContent = `${this.#formProgress}%`;
  }

  render() {
    this.#parentEl.append(this.#el);
  }
}
