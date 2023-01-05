import { Content } from './content';

describe('Notification Entite', () => {
  test('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma notificacao');

    expect(content).toBeTruthy();
  });

  test('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Cara')).toThrow();
  });

  test('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('z'.repeat(241))).toThrow();
  });
});
