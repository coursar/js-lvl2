// A-A-A
// Arrange - подготовка
// Act - выполнение целевого действия
// Assert - сравнение фактический и ожидаемый результат
import { cashback } from '../lib.js';

test('should calculate cashback', () => {
  // Arrange
  const amount = 1000;
  // ожидаемый результат
  const expected = 30;

  // Act
  // actual - фактический результат
  const actual = cashback(amount);

  // Assert
  expect(actual).toBeCloseTo(expected, 2);
});
