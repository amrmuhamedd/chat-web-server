export enum STATUS_TYPES {
  ACTIVE = "Active",
  AWAY = "Away",
  DO_NOT_DISTURB = "Do not disturb",
}

export interface AttachedfileTypes {
  total: number;
  list: AttachedfileItemTypes[];
}

export interface AttachedfileItemTypes {
  id: number;
  fileName: string;
  size: string;
  downloadUrl: string;
  icon: string;
}

export interface AttachmentTypes {
  id: number;
  name: string;
  downloadLink: string;
  desc: string;
}
export interface ImageTypes {
  id: number;
  downloadLink: string;
}
export interface ChannelTypes {
  id: number | string;
  name: string;
  meta?: {
    unRead: number;
  };
}
export interface MediaListItemTypes {
  id: number;
  url: string;
}
export interface MediaTypes {
  total: number;
  list: MediaListItemTypes[];
}
