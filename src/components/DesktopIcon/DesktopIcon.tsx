import Image, { type StaticImageData } from "next/image";
import type { Ref } from "react";

export type DesktopIconProps = {
  /** Підпис під іконкою (назва проєкту). */
  label: string;
  /** Піксельна іконка папки (імпорт з `src/assets`). */
  icon: StaticImageData;
  /** Ширина іконки на екрані, px. Висота пропорційна. @default 71 */
  iconWidth?: number;
  /** Дія по кліку: відкрити вікно проєкту. */
  onClick?: () => void;
  /** Чи відкрите вікно цього проєкту (для екранних читачів). @default false */
  expanded?: boolean;
  /** Посилання на картинку іконки, щоб вікно «вилітало» з неї. */
  iconRef?: Ref<HTMLImageElement>;
};

/** Іконка-папка на «робочому столі» info.exe: картинка і підпис, натискання відкриває проєкт. */
export function DesktopIcon({
  label,
  icon,
  iconWidth = 71,
  onClick,
  expanded = false,
  iconRef,
}: DesktopIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className="group flex flex-col items-center gap-2 font-sans text-body whitespace-nowrap text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-accent"
    >
      <Image
        ref={iconRef}
        src={icon}
        alt=""
        unoptimized
        width={iconWidth}
        height={(iconWidth * icon.height) / icon.width}
        className="group-hover:-translate-y-1"
      />
      <span>{label}</span>
    </button>
  );
}
