import { Button } from "@/components/Button/Button";
import { Window } from "@/components/Window/Window";

export type ErrorWindowProps = {
  /** Текст помилки. @default "Fatal error: designer not hired yet." */
  message?: string;
  /** Текст кнопки. @default "Fix it!" */
  actionLabel?: string;
  /** Куди веде кнопка (зазвичай mailto:). */
  href?: string;
  /** Закрити вікно (хрестик). Без нього хрестик декоративний. */
  onClose?: () => void;
};

/** Жартівливе вікно «Error» першого екрана: повідомлення і кнопка, що веде до контакту. */
export function ErrorWindow({
  message = "Fatal error: designer not hired yet.",
  actionLabel = "Fix it!",
  href,
  onClose,
}: ErrorWindowProps) {
  return (
    <Window title="Error" onClose={onClose} closeLabel="Close error">
      <p className="px-3 font-sans text-body text-ink">{message}</p>
      <div className="flex justify-center pb-2">
        <Button href={href}>{actionLabel}</Button>
      </div>
    </Window>
  );
}
