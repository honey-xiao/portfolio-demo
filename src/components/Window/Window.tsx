import Image from "next/image";
import type { ReactNode } from "react";
import ctrlMin from "@/assets/hero/ctrl-pos-min.svg";
import ctrlMax from "@/assets/hero/ctrl-pos-max.svg";
import ctrlClose from "@/assets/hero/ctrl-pos-close.svg";

export type WindowSize = "md" | "lg";

export type WindowProps = {
  /** Назва у смузі заголовка (info.exe, VSL.app, Error). */
  title: string;
  /** Вміст вікна під смугою заголовка. */
  children: ReactNode;
  /**
   * Розмір рамки. `md` — вікна проєктів і помилок (відступи 3, кнопки керування 6),
   * `lg` — велике вікно info.exe (відступи 4, вища смуга заголовка, кнопки керування 8).
   * @default "md"
   */
  size?: WindowSize;
  /** Якщо задано, хрестик стає справжньою кнопкою «Закрити». */
  onClose?: () => void;
  /** Підпис кнопки закриття для екранних читачів. @default "Close {title}" */
  closeLabel?: string;
  /** Рівень заголовка: `h2` для вікон-карток, `p` для декоративних. @default "p" */
  titleAs?: "h2" | "p";
};

const frame: Record<WindowSize, string> = {
  md: "gap-3 p-3",
  lg: "gap-4 p-4",
};
const titlebar: Record<WindowSize, string> = {
  md: "px-3",
  lg: "px-4 py-2",
};
const controlSize: Record<WindowSize, string> = {
  md: "size-6",
  lg: "size-8",
};

/** Кнопки керування вікном: згорнути, розгорнути, закрити (піксельні іконки). */
function WindowControls({
  onClose,
  closeLabel,
  size,
}: {
  onClose?: () => void;
  closeLabel: string;
  size: WindowSize;
}) {
  const icon = (src: typeof ctrlMin) => (
    <Image src={src} alt="" className={controlSize[size]} unoptimized />
  );
  return (
    <div className="flex shrink-0 items-center gap-1">
      <span aria-hidden="true">{icon(ctrlMin)}</span>
      <span aria-hidden="true">{icon(ctrlMax)}</span>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-on-accent"
        >
          {icon(ctrlClose)}
        </button>
      ) : (
        <span aria-hidden="true">{icon(ctrlClose)}</span>
      )}
    </div>
  );
}

/**
 * Вікно ретро-ОС у стилі Windows 98: рожеве тіло `surface`, світла рамка `line`,
 * смуга заголовка `accent` з піксельною назвою і кнопками керування.
 */
export function Window({
  title,
  children,
  size = "md",
  onClose,
  closeLabel,
  titleAs: Title = "p",
}: WindowProps) {
  return (
    <div
      className={`flex flex-col rounded-card border border-line bg-surface drop-shadow-window ${frame[size]}`}
    >
      <div className={`flex items-center justify-between gap-3 bg-accent text-on-accent ${titlebar[size]}`}>
        <Title className="font-pixel text-heading whitespace-nowrap">{title}</Title>
        <WindowControls onClose={onClose} closeLabel={closeLabel ?? `Close ${title}`} size={size} />
      </div>
      {children}
    </div>
  );
}
