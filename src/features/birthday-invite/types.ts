import type { ElementType } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type IconComponent = ElementType;

export type HighlightItem = {
  icon: IconComponent;
  title: string;
  text: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  text: string;
};

export type WishlistItem = {
  id: string;
  title: string;
  note: string;
};