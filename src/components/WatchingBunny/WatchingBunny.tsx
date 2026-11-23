"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bunny from "@/assets/hero/bunny.svg";
import bunnyBlink from "@/assets/hero/bunny-blink.svg";
import bunnyScared from "@/assets/hero/bunny-scared.svg";
import bunnyZ from "@/assets/hero/bunny-z.svg";

/** Art size of the bunny frames (bunny.svg is 186×181); everything below is in these units. */
const ART_W = 186;
const ART_H = 181;
/** One pixel of the bunny art. */
const PX = 4.67219;
/** Top-left of each eye's highlight: the third eye on the forehead and the right eye. */
const EYES = [
  { x: 77.5583, y: 56.0669 },
  { x: 103.2548, y: 74.7551 },
];
/** Where the sleeping "Z" floats from, and its size. */
const Z = { x: 145.31, y: 16.35, w: 18.689, h: 23.361 };

/** Cursor this close (screen px) to the eyes on an axis counts as "straight ahead". */
const DEAD_ZONE = 24;
/** No pointer movement for this long → the bunny falls asleep. */
const SLEEP_AFTER = 15_000;
const BLINK_MS = 150;
const BLINK_EVERY: [number, number] = [3000, 6000];
const SCARED_MS = 700;

type Step = 0 | 1 | 2;
type Mode = "awake" | "blink" | "sleep" | "scared";

const toStep = (d: number): Step => (d < -DEAD_ZONE ? 0 : d > DEAD_ZONE ? 2 : 1);
const between = ([min, max]: [number, number]) => min + Math.random() * (max - min);

export type WatchingBunnyProps = {
  /** Ширина зайця на екрані, px. Висота пропорційна. @default 186 */
  width?: number;
  /**
   * Початковий стан. `awake` — дивиться за курсором і кліпає; `sleep` — спить зі «Z»
   * (прокидається від руху миші). @default "awake"
   */
  initialMode?: "awake" | "sleep";
};

/**
 * Маскот — рожевий піксельний заєць із третім оком. Очі стежать за курсором,
 * заєць кліпає, засинає без руху миші 15 с і лякається, коли його будять.
 */
export function WatchingBunny({ width = ART_W, initialMode = "awake" }: WatchingBunnyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState<{ x: Step; y: Step }>({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>(initialMode);
  const modeRef = useRef<Mode>(initialMode);
  const k = width / ART_W;

  useEffect(() => {
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
      return t;
    };
    const go = (m: Mode) => {
      modeRef.current = m;
      setMode(m);
    };

    const blinkOnce = (then: () => void) => {
      if (modeRef.current !== "awake") return then();
      go("blink");
      later(() => {
        if (modeRef.current === "blink") go("awake");
        then();
      }, BLINK_MS);
    };
    const scheduleBlink = () => {
      later(() => {
        const double = Math.random() < 0.25;
        blinkOnce(() => (double ? later(() => blinkOnce(scheduleBlink), 180) : scheduleBlink()));
      }, between(BLINK_EVERY));
    };
    scheduleBlink();

    let sleepTimer = 0;
    const resetSleep = () => {
      if (sleepTimer) {
        window.clearTimeout(sleepTimer);
        timers.delete(sleepTimer);
      }
      sleepTimer = later(() => go("sleep"), SLEEP_AFTER);
    };
    resetSleep();

    const onPointer = (e: PointerEvent) => {
      if (modeRef.current === "sleep") {
        go("scared");
        later(() => {
          if (modeRef.current === "scared") go("awake");
        }, SCARED_MS);
      }
      resetSleep();

      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = r.width / ART_W;
      const cx = r.left + ((EYES[0].x + EYES[1].x) / 2 + PX) * s;
      const cy = r.top + ((EYES[0].y + EYES[1].y) / 2 + PX) * s;
      const next = { x: toStep(e.clientX - cx), y: toStep(e.clientY - cy) };
      setLook((prev) => (prev.x === next.x && prev.y === next.y ? prev : next));
    };

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const eyesShut = mode === "blink" || mode === "sleep";
  const motion =
    mode === "sleep" ? "animate-breathe" : mode === "scared" ? "" : "animate-bob";
  const frame = (src: typeof bunny, visible: boolean, alt = "") => (
    <Image
      src={src}
      alt={alt}
      unoptimized
      className={`absolute inset-0 size-full ${visible ? "" : "invisible"}`}
    />
  );

  return (
    <div
      ref={ref}
      className={`relative ${motion} motion-reduce:animate-none`}
      style={{ width, height: ART_H * k }}
    >
      {/* All frames stay loaded and swap instantly, so the first blink doesn't flicker. */}
      {frame(bunny, mode === "awake", "Pink pixel bunny with a third eye")}
      {frame(bunnyBlink, eyesShut)}
      {frame(bunnyScared, mode === "scared")}

      {mode === "awake" &&
        EYES.map((eye, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute bg-art-highlight"
            style={{
              left: eye.x * k,
              top: eye.y * k,
              width: PX * k,
              height: PX * k,
              transform: `translate(${(look.x * PX * k) / 2}px, ${(look.y * PX * k) / 2}px)`,
            }}
          />
        ))}

      {mode === "sleep" && (
        <Image
          src={bunnyZ}
          alt=""
          unoptimized
          className="absolute animate-z-float motion-reduce:animate-none"
          style={{ left: Z.x * k, top: Z.y * k, width: Z.w * k, height: Z.h * k }}
        />
      )}
    </div>
  );
}
