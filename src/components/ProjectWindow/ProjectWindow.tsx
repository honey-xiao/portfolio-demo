import Image from "next/image";
import type { ReactNode } from "react";
import computer from "@/assets/hero/computer.svg";
import computerMobile from "@/assets/hero/computer-mobile.svg";
import { Button } from "@/components/Button/Button";
import { Window } from "@/components/Window/Window";

export type ProjectKind = "web" | "mobile";

export type ProjectWindowProps = {
  /** Назва файлу проєкту в заголовку: LorryDesk.exe, Folio.app, VSL.app. */
  title: string;
  /** Шлях під заголовком: тип продукту і що це, напр. `mobile > book discussion app`. */
  path: string;
  /** Опис проєкту: що за продукт і моя роль, 1–2 речення. */
  description: ReactNode;
  /** Піксельна іконка: `web` — монітор, `mobile` — телефон. @default "web" */
  kind?: ProjectKind;
  /** Куди ведуть кнопки «View» і «Wanna see» (сторінка кейса). @default "#projects" */
  href?: string;
  /** Закрити вікно (хрестик у заголовку). Без нього хрестик декоративний. */
  onClose?: () => void;
};

const icons = { web: computer, mobile: computerMobile };

/** Картка кейса у вигляді вікна ретро-ОС: назва, шлях, іконка, опис і дві кнопки. */
export function ProjectWindow({
  title,
  path,
  description,
  kind = "web",
  href = "#projects",
  onClose,
}: ProjectWindowProps) {
  return (
    <Window title={title} titleAs="h2" onClose={onClose}>
      <p className="px-3 font-mono text-caption text-ink">{path}</p>
      <div className="flex items-start gap-3 px-3">
        <Image src={icons[kind]} alt="" unoptimized className="shrink-0" />
        <p className="font-sans text-lead text-ink">{description}</p>
      </div>
      <div className="flex justify-end gap-3 px-3">
        <Button href={href}>View</Button>
        <Button href={href}>Wanna see</Button>
      </div>
    </Window>
  );
}
