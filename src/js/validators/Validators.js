const amountPattern = /^\s*[1-9][\d\s]*\.[\d\s]*$/;
export const amountValidatorFn = (inputEl) => {
  const result = amountPattern.test(inputEl.value);
  if (result) {
    return null;
  }
  return {code: 'valid.invalid_amount'};
};
