import { Content } from '@application/entities/Notification/content';
import {
  INotificationProps,
  Notification,
} from '@application/entities/Notification/notification';

type Override = Partial<INotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Voce recebeu uma notificacao!'),
    category: 'social',
    recipientId: 'recipient-2',
    ...override,
  });
}
