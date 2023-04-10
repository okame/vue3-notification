
export interface NotificationsOptions {
  id?: number;
  title?: string;
  text?: string;
  type?: string;
  group?: string;
  duration?: number;
  speed?: number;
  data?: unknown;
  clean?: boolean;
  clear?: boolean;
  ignoreDuplicates?: boolean;
  closeOnClick?: boolean;
  color?: string
  backgroundColor?: string
}
export interface NotificationsPluginOptions {
  name?: string;
  componentName?: string;
  velocity?: any;
}

export type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data' | 'color' | 'backgroundColor'> & {
  length: number;
}
