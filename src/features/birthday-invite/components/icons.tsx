import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
    </Icon>
  );
}

export function Clock3(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8V12l2.8 1.7" />
    </Icon>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </Icon>
  );
}

export function Sparkles(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5l1.3 4.2L17.5 9l-4.2 1.3L12 14.5l-1.3-4.2L6.5 9l4.2-1.3L12 3.5Z" />
      <path d="M18.5 13.5l.8 2.6 2.6.8-2.6.8-.8 2.6-.8-2.6-2.6-.8 2.6-.8.8-2.6Z" />
    </Icon>
  );
}

export function Cake(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 18.5h16" />
      <path d="M6 18.5v-5h12v5" />
      <path d="M8 13.5V9.8c0-1.1.9-2 2-2h0" />
      <path d="M16 13.5V9.8c0-1.1-.9-2-2-2h0" />
      <path d="M12 7.8V5.2" />
      <path d="M12 5.2c0 .9.8 1.2.8 2s-.8 1.1-.8 2" />
    </Icon>
  );
}

export function Camera(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
      <path d="M8 7l1.4-2.2h5.2L16 7" />
      <circle cx="12" cy="13.5" r="3.2" />
    </Icon>
  );
}

export function PartyPopper(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 19l6.5-6.5" />
      <path d="M8 4l2 4" />
      <path d="M4 8l4 2" />
      <path d="M10 14l5.5 5.5" />
      <path d="M13 4l1.3 2.8L17 8l-2.7 1.2L13 12l-1.1-2.8L9 8l2.9-1.2L13 4Z" />
    </Icon>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function Music4(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 18V6l9-2v12" />
      <circle cx="8" cy="18" r="2.2" />
      <circle cx="17" cy="16" r="2.2" />
    </Icon>
  );
}

export function GlassWater(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 4h10l-1 10a4 4 0 0 1-4 3.5H12A4 4 0 0 1 8 14L7 4Z" />
      <path d="M8 8.5h8" />
      <path d="M10 17.5V20" />
    </Icon>
  );
}

export function Heart(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20s-7-4.5-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.5-7 10-7 10Z" />
    </Icon>
  );
}

export function Gift(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="9" width="16" height="4" rx="1.5" />
      <path d="M12 9v11" />
      <path d="M12 9c-2.5 0-4.5-1.2-4.5-3a2 2 0 0 1 4.1-.5L12 9Z" />
      <path d="M12 9c2.5 0 4.5-1.2 4.5-3a2 2 0 0 0-4.1-.5L12 9Z" />
      <path d="M5.5 13v5.5A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V13" />
    </Icon>
  );
}

export function MessageCircle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 12a7.5 7.5 0 0 1-7.5 7.5H8L4 22l1.2-4.5A7.5 7.5 0 1 1 20 12Z" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}