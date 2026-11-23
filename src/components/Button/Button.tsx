import type { ReactNode } from "react";

export type ButtonSize = "md" | "lg";

export type ButtonProps = {
  /** Текст кнопки. */
  children: ReactNode;
  /**
   * Розмір. `md` — кнопки в картках і вікнах помилки (text-body),
   * `lg` — головні кнопки першого екрана (text-lead).
   * @default "md"
   */
  size?: ButtonSize;
  /** Якщо задано, кнопка стає посиланням `<a>` (перехід на секцію, mailto:). */
  href?: string;
  /** Дія по кліку для кнопки без `href`. */
  onClick?: () => void;
  /**
   * Недоступна кнопка: пласка, без фаски, текст `ink-muted`, не натискається.
   * Для кнопки з `href` теж працює: тоді рендериться `<button disabled>`.
   * @default false
   */
  disabled?: boolean;
  /** Тип для кнопки у формі. @default "button" */
  type?: "button" | "submit";
};

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control font-sans text-ink " +
  "bg-button shadow-bevel hover:bg-button-light active:shadow-bevel-pressed " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-accent " +
  "disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted disabled:shadow-none";

const sizes: Record<ButtonSize, string> = {
  md: "px-4 py-2 text-body",
  lg: "px-6 py-3 text-lead",
};

/**
 * Піксельна кнопка в стилі Windows 98: світла фаска зверху-зліва, темна знизу-справа.
 * При натисканні фаска інвертується, на фокусі з клавіатури — пунктирний контур `accent`.
 */
export function Button({
  children,
  size = "md",
  href,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const className = `${base} ${sizes[size]}`;

  if (href && !disabled) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
