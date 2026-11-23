import type { ReactNode } from "react";

export type SpeechBubbleProps = {
  /** Текст репліки. */
  children: ReactNode;
  /** Ширина тіла в піксель-арт пікселях. @default 39 */
  cols?: number;
  /** Висота тіла в піксель-арт пікселях (хвостик звисає ще на 3). @default 12 */
  rows?: number;
  /** Стовпчик, з якого починається хвостик (рахуючи зліва). @default 34 */
  tail?: number;
  /** Розмір одного піксель-арт пікселя на екрані, px. @default 11 */
  pixel?: number;
};

type Px = [x: number, y: number, width: number, fill: "line" | "art"];

/**
 * Піксельна хмаринка з репліками: ступінчасті кути, контур `art-line`, заливка `line`,
 * хвостик униз-праворуч (до зайця). Текст усередині — справжній, не картинка.
 */
export function SpeechBubble({
  children,
  cols: W = 39,
  rows: H = 12,
  tail: t = 34,
  pixel: P = 11,
}: SpeechBubbleProps) {
  const px: Px[] = [];
  const row = (y: number, x0: number, x1: number, fill: Px[3]) => {
    if (x1 >= x0) px.push([x0, y, x1 - x0 + 1, fill]);
  };

  row(0, 2, W - 3, "art");
  row(1, 1, 1, "art");
  row(1, 2, W - 3, "line");
  row(1, W - 2, W - 2, "art");
  for (let y = 2; y <= H - 3; y++) {
    row(y, 0, 0, "art");
    row(y, 1, W - 2, "line");
    row(y, W - 1, W - 1, "art");
  }
  row(H - 2, 1, 1, "art");
  row(H - 2, 2, W - 3, "line");
  row(H - 2, W - 2, W - 2, "art");
  // bottom edge with the tail opening in it
  row(H - 1, 2, t - 1, "art");
  row(H - 1, t, t + 1, "line");
  row(H - 1, t + 2, W - 3, "art");
  // tail, leaning down-right
  row(H, t - 1, t - 1, "art");
  row(H, t, t + 1, "line");
  row(H, t + 2, t + 2, "art");
  row(H + 1, t, t, "art");
  row(H + 1, t + 1, t + 1, "line");
  row(H + 1, t + 2, t + 2, "art");
  row(H + 2, t + 1, t + 2, "art");

  return (
    <div className="relative" style={{ width: W * P, height: (H + 3) * P }}>
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H + 3}`}
        width={W * P}
        height={(H + 3) * P}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {px.map(([x, y, w, fill]) => (
          <rect
            key={`${x}-${y}-${fill}`}
            x={x}
            y={y}
            width={w}
            height={1}
            className={fill === "art" ? "fill-art-line" : "fill-line"}
          />
        ))}
      </svg>
      {/* text area: 3 px in from the sides, 2 from the top, clear of the bottom edge and tail */}
      <p
        className="absolute flex items-center font-sans text-body text-ink"
        style={{ left: 3 * P, top: 2 * P, right: 3 * P, bottom: 5 * P }}
      >
        {children}
      </p>
    </div>
  );
}
