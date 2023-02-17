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
  <div data-id="form-error" class="form-error"></div>
</div>
`;

export default class CashbackComponent {
  #parentEl;
  #el;

  #cashbackService;

  #formEl;
  #formFieldsEl;
  #formInputErrorEls;

  #formProgressEl;
  #formProgress = 0;
  #formErrorEl;
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
    this.#formInputErrorEls = [...this.#formEl.querySelectorAll('[data-id$="-error"]')]
    this.#resultEl = this.#formEl.querySelector('[data-id="result"]');

    this.#formErrorEl = this.#el.querySelector('[data-id="form-error"]');

    this.render();
  }

  handleFormSubmit(ev) {
    // default behaviour
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const urlSearchParams = new URLSearchParams(formData);

    // TODO: sync validation
    this.#clearErrors();

    this.#formFieldsEl.disabled = true;
    this.#formProgressEl.style.visibility = 'visible';
    this.#setProgress(10);
    this.#scheduleProgress();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:9999/?${urlSearchParams.toString()}`);

    // response from server
    // 200, 400, 500, etc
    xhr.onload = (ev) => {
      if (ev.target.status >= 200 && xhr.status <= 299) {
        // TODO:
      }
      // TODO: 4xx-5xx
      
    };
    // network error
    xhr.onerror = (ev) => {
      this.#formErrorEl.textContent = 'Error, please try again later';
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

  #clearErrors() {
    this.#formErrorEl.textContent = '';
    this.#formInputErrorEls.forEach((el) => el.textContent = '');
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
