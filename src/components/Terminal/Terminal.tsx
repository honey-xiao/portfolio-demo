import Image from "next/image";
import ctrlMin from "@/assets/hero/ctrl-cmd-min.svg";
import ctrlMax from "@/assets/hero/ctrl-cmd-max.svg";
import ctrlClose from "@/assets/hero/ctrl-cmd-close.svg";
import statusDot from "@/assets/hero/status-dot.svg";
import { jetbrainsMono } from "@/app/fonts";

export type TerminalProps = {
  /** Пошта для рядка `email:` і кнопки «Send message». */
  email: string;
  /** Формат роботи. @default "full-time" */
  lookingFor?: string;
  /** Статус пошуку. @default "available" */
  status?: string;
};

/**
 * Темне вікно cmd.exe з контактом: формат роботи, статус, пошта і кнопка «Send message».
 * Рядки команд набрані декоративним JetBrains Mono (не токен).
 */
export function Terminal({ email, lookingFor = "full-time", status = "available" }: TerminalProps) {
  return (
    <div className="flex flex-col items-end gap-4 border border-line bg-surface-inverse p-1 pb-3 text-on-inverse drop-shadow-window">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-1" aria-hidden="true">
          <p className="flex-1 border border-line px-2 text-center font-terminal text-heading">cmd.exe</p>
          <Image src={ctrlMin} alt="" unoptimized className="size-8" />
          <Image src={ctrlMax} alt="" unoptimized className="size-8" />
          <span className="flex size-8 items-center justify-center border border-line">
            <Image src={ctrlClose} alt="" unoptimized className="size-6" />
          </span>
        </div>
        <div className={`flex flex-col gap-2 pl-6 text-caption ${jetbrainsMono.className}`}>
          <p>{"C:\\Alisa> hire_me"}</p>
          <p>{`> looking for: ${lookingFor}`}</p>
          <p className="flex items-center gap-1">
            {`> status: ${status}`}
            <Image src={statusDot} alt="" unoptimized />
          </p>
          <p>
            {"> email: "}
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </p>
          <p>
            {"> "}
            <span className="animate-caret motion-reduce:animate-none">_</span>
          </p>
        </div>
      </div>
      <a
        href={`mailto:${email}`}
        className={`pr-6 text-body whitespace-nowrap text-accent-on-inverse hover:text-on-inverse ${jetbrainsMono.className}`}
      >
        [ Send message ]
      </a>
    </div>
  );
}
