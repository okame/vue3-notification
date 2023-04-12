import mitt from 'mitt';

type EventType = {
  add: NotificationOptions;
  close: unknown;
  closeAll: unknown;
}

export const emitter = mitt<EventType>();
