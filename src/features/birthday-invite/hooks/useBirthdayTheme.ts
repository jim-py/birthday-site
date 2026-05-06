import { useEffect } from "react";
import { colors, theme } from "../constants";

export function useBirthdayTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const prev = {
      colorScheme: root.style.colorScheme,
      background: body.style.background,
      color: body.style.color,
      fontFamily: body.style.fontFamily,
      margin: body.style.margin,
      minHeight: body.style.minHeight,
      overflowX: body.style.overflowX,
      overflowY: body.style.overflowY,
      webkitTextSizeAdjust: root.style.getPropertyValue("-webkit-text-size-adjust"),
      touchAction: body.style.touchAction,
    };

    root.style.colorScheme = theme;
    root.style.background = colors.bg;
    root.style.minHeight = "100dvh";
    root.style.overflowX = "hidden";
    root.style.setProperty("-webkit-text-size-adjust", "100%");

    body.style.background = colors.bg;
    body.style.color = colors.text;
    body.style.fontFamily = "'Montserrat', sans-serif";
    body.style.margin = "0";
    body.style.minHeight = "100dvh";
    body.style.overflowX = "hidden";
    body.style.overflowY = "auto";
    body.style.touchAction = "manipulation";

    return () => {
      root.style.colorScheme = prev.colorScheme;
      root.style.background = prev.background;
      root.style.minHeight = "";
      root.style.overflowX = "";
      if (prev.webkitTextSizeAdjust) {
        root.style.setProperty("-webkit-text-size-adjust", prev.webkitTextSizeAdjust);
      } else {
        root.style.removeProperty("-webkit-text-size-adjust");
      }

      body.style.background = prev.background;
      body.style.color = prev.color;
      body.style.fontFamily = prev.fontFamily;
      body.style.margin = prev.margin;
      body.style.minHeight = prev.minHeight;
      body.style.overflowX = prev.overflowX;
      body.style.overflowY = prev.overflowY;
      body.style.touchAction = prev.touchAction;
    };
  }, []);
}