import CashbackService from '../CashbackService.js';

test('should calculate cashback under limit', () => {
  // Arrange
  const service = new CashbackService();
  const amount = 1000;
  // ожидаемый результат
  const expected = 50;

  // Act
  // actual - фактический результат
  const actual = service.calculate(amount);

  // Assert
  expect(actual).toBeCloseTo(expected, 2);
});

test('should calculate cashback over limit', () => {
  // Arrange
  const service = new CashbackService();
  const amount = 100_000;
  // ожидаемый результат
  const expected = 1000;

  // Act
  // actual - фактический результат
  const actual = service.calculate(amount);

  // Assert
  expect(actual).toBeCloseTo(expected, 2);
});
