"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import bunnyLaugh from "@/assets/hero/bunny-laugh.svg";
import folderAbout from "@/assets/hero/folder-about.svg";
import folderContacts from "@/assets/hero/folder-contacts.svg";
import folderProjects from "@/assets/hero/folder-projects.svg";
import infoDecor from "@/assets/hero/info-bg-decor.svg";
import sparkleBig from "@/assets/hero/sparkle-big.svg";
import sparkleBottom from "@/assets/hero/sparkle-bottom.svg";
import sparkleTop from "@/assets/hero/sparkle-top.svg";
import { Button } from "@/components/Button/Button";
import { DesktopIcon } from "@/components/DesktopIcon/DesktopIcon";
import { ErrorWindow } from "@/components/ErrorWindow/ErrorWindow";
import { ProjectWindow, type ProjectKind } from "@/components/ProjectWindow/ProjectWindow";
import { SpeechBubble } from "@/components/SpeechBubble/SpeechBubble";
import { Terminal } from "@/components/Terminal/Terminal";
import { WatchingBunny } from "@/components/WatchingBunny/WatchingBunny";
import { Window } from "@/components/Window/Window";

/*
 * Layout geometry (not design tokens): the hero is a fixed 1440×1024 "desktop" from the
 * old Figma frame, scaled to the browser width. Positions and sizes below are where each
 * piece sits on that desktop. Colors, fonts, text sizes, spacing and shadows come from tokens.
 */
const STAGE_W = 1440;
const STAGE_H = 1024;

const EMAIL = "alisa.hordon@gmail.com";

const INFO = { left: 28, top: 28, width: 878, screenH: 392 };
const TERMINAL = { left: 1062, top: 28, width: 350 };
const PROJECT_W = 350;
const ERROR_W = 208;
/** Error windows, back to front: each one 15px right and 27px lower. The first can't be closed. */
const ERROR_STACK = Array.from({ length: 6 }, (_, i) => ({ left: 28 + i * 15, top: 650 + i * 27 }));
/** How long the laughing bunny stays (matches animate-laugh-peek). */
const LAUGH_MS = 2200;
/**
 * Laughing bunny: art size, how far it rises above the last Error window's top edge,
 * room above for the bounce, and how much of it may stay hidden under the titlebar.
 */
const LAUGH = { w: 186, h: 182, peek: 106, headroom: 8, belowEdge: 12 };
const CASCADE_DELAY = 140;

type ProjectId = "lorry" | "folio" | "vsl";
type Rect = { x: number; y: number; w: number; h: number };
type Phase = "closed" | "opening" | "open" | "closing";

type Project = {
  id: ProjectId;
  title: string;
  path: string;
  kind: ProjectKind;
  /** Where the window lands: a cascade under cmd.exe. */
  left: number;
  top: number;
  /** Approximate height, for the opening outline only. */
  height: number;
  description: ReactNode;
};

/** Opening order: VSL opens last so it ends up in front. */
const PROJECTS: Project[] = [
  {
    id: "lorry",
    title: "LorryDesk.exe",
    path: "web > logistics platform",
    kind: "web",
    left: 880,
    top: 290,
    height: 225,
    description: "Web product for a logistics business. Client project, in progress.",
  },
  {
    id: "folio",
    title: "Folio.app",
    path: "mobile > book discussion app",
    kind: "mobile",
    left: 940,
    top: 360,
    height: 250,
    description: (
      <>
        An app for discussing books with other readers.
        <br />
        Solo project — research to final UI.
      </>
    ),
  },
  {
    id: "vsl",
    title: "VSL.app",
    path: "mobile > audiobook app for a publisher",
    kind: "mobile",
    left: 1000,
    top: 430,
    height: 275,
    description:
      "Audiobook app for Old Lion Publishing House, built around their loyalty program. Partnership project.",
  },
];

const FOLDERS = [
  { id: "lorry", label: "LorryDesk.exe", icon: folderAbout },
  { id: "folio", label: "Folio.app", icon: folderProjects },
  { id: "vsl", label: "VSL.app", icon: folderContacts },
] as const;

const ALL_CLOSED: Record<ProjectId, Phase> = { lorry: "closed", folio: "closed", vsl: "closed" };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scales the fixed 1440×1024 desktop to the section width. */
function useStageScale() {
  const ref = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / STAGE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

/** Win98 "exploding rectangle": an outline that jumps from the folder icon to the window. */
function ZoomRect({ from, to, reverse, onDone }: { from: Rect; to: Rect; reverse: boolean; onDone: () => void }) {
  const style = {
    zIndex: 1000,
    "--from-x": `${from.x}px`,
    "--from-y": `${from.y}px`,
    "--from-w": `${from.w}px`,
    "--from-h": `${from.h}px`,
    "--to-x": `${to.x}px`,
    "--to-y": `${to.y}px`,
    "--to-w": `${to.w}px`,
    "--to-h": `${to.h}px`,
  } as CSSProperties;
  return (
    <div
      aria-hidden="true"
      onAnimationEnd={onDone}
      style={style}
      className={`pointer-events-none absolute border-3 border-t-12 border-accent ${
        reverse ? "animate-window-close" : "animate-window-open"
      }`}
    />
  );
}

/**
 * Перший екран: «робочий стіл» ретро-ОС з вікном info.exe (позиціонування, маскот, папки
 * проєктів), терміналом cmd.exe з контактом, стосом вікон Error і великим «Portfolio».
 */
export function Hero() {
  const { ref, scale } = useStageScale();
  const stageRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Record<ProjectId, Phase>>(ALL_CLOSED);
  const [zIndex, setZIndex] = useState<Record<ProjectId, number>>({ lorry: 10, folio: 11, vsl: 12 });
  const zTop = useRef(12);
  const folderIcons = useRef<Partial<Record<ProjectId, HTMLImageElement | null>>>({});
  const [folderRects, setFolderRects] = useState<Record<ProjectId, Rect>>({
    lorry: { x: 0, y: 0, w: 0, h: 0 },
    folio: { x: 0, y: 0, w: 0, h: 0 },
    vsl: { x: 0, y: 0, w: 0, h: 0 },
  });
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const setProjectPhase = useCallback((id: ProjectId, next: Phase) => {
    setPhase((prev) => ({ ...prev, [id]: next }));
  }, []);

  const bringToFront = useCallback((id: ProjectId) => {
    zTop.current += 1;
    const z = zTop.current;
    setZIndex((prev) => ({ ...prev, [id]: z }));
  }, []);

  /** A folder icon's box in stage coordinates: where its window flies out of. */
  const measureFolder = (id: ProjectId) => {
    const icon = folderIcons.current[id];
    const stage = stageRef.current;
    if (!icon || !stage) return;
    const r = icon.getBoundingClientRect();
    const st = stage.getBoundingClientRect();
    const rect = {
      x: (r.left - st.left) / scale,
      y: (r.top - st.top) / scale,
      w: r.width / scale,
      h: r.height / scale,
    };
    setFolderRects((prev) => ({ ...prev, [id]: rect }));
  };

  const openProject = (id: ProjectId) => {
    measureFolder(id);
    setPhase((prev) =>
      prev[id] === "closed" ? { ...prev, [id]: prefersReducedMotion() ? "open" : "opening" } : prev,
    );
    bringToFront(id);
  };

  const openAllProjects = () => {
    timers.current.forEach(clearTimeout);
    const instant = prefersReducedMotion();
    PROJECTS.forEach((p, i) => {
      timers.current.push(window.setTimeout(() => openProject(p.id), instant ? 0 : i * CASCADE_DELAY));
    });
  };

  const closeProject = (id: ProjectId) => {
    measureFolder(id);
    setProjectPhase(id, prefersReducedMotion() ? "closed" : "closing");
  };

  // Error windows: the front one closes; the last one can't, and the bunny laughs instead.
  const [errorsLeft, setErrorsLeft] = useState(ERROR_STACK.length);
  const [laughing, setLaughing] = useState(false);
  const laughTimer = useRef(0);
  useEffect(() => () => clearTimeout(laughTimer.current), []);
  const closeError = () => {
    if (errorsLeft > 1) {
      setErrorsLeft((n) => n - 1);
      return;
    }
    if (laughing) return;
    setLaughing(true);
    laughTimer.current = window.setTimeout(() => setLaughing(false), LAUGH_MS);
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-canvas"
      style={{ height: STAGE_H * scale }}
      aria-label="Alisa Hordon (Xiao) — UI/UX designer portfolio"
    >
      <div
        ref={stageRef}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        {/* ---------- info.exe ---------- */}
        <div className="absolute" style={{ left: INFO.left, top: INFO.top, width: INFO.width }}>
          <Window title="info.exe" size="lg">
            <div
              className="relative bg-linear-to-b from-line to-surface-tint"
              style={{ height: INFO.screenH }}
            >
              <Image
                src={infoDecor}
                alt=""
                unoptimized
                className="absolute"
                style={{ left: 179, top: 16, width: 663, height: 375 }}
              />
              <nav className="absolute flex flex-col gap-3" style={{ left: 44, top: 34 }} aria-label="Projects">
                {FOLDERS.map((f) => (
                  <DesktopIcon
                    key={f.id}
                    label={f.label}
                    icon={f.icon}
                    iconWidth={96}
                    onClick={() => openProject(f.id)}
                    expanded={phase[f.id] !== "closed"}
                    iconRef={(el) => {
                      folderIcons.current[f.id] = el;
                    }}
                  />
                ))}
              </nav>
              {/* The bunny introduces Alisa: this is also the positioning statement. */}
              <div className="absolute" style={{ left: 188, top: 22 }}>
                <SpeechBubble cols={39} rows={12} tail={34} pixel={11}>
                  Hello! I am Alisa or Xiao. I’m a UI/UX designer for product teams — I design mobile
                  apps and B2B web products, with a focus on clear logic and clean developer handoff.
                </SpeechBubble>
              </div>
              <div className="absolute" style={{ left: 588, top: 110 }}>
                <WatchingBunny width={251} />
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <Button size="lg" href="#about">
                About me
              </Button>
              <Button size="lg" onClick={openAllProjects}>
                My projects
              </Button>
              <Button size="lg" href="#contacts">
                Contacts
              </Button>
            </div>
          </Window>
        </div>

        {/* ---------- cmd.exe ---------- */}
        <div className="absolute" style={{ left: TERMINAL.left, top: TERMINAL.top, width: TERMINAL.width }}>
          <Terminal email={EMAIL} />
        </div>

        {/* ---------- big title + sparkles ---------- */}
        <Image src={sparkleBig} alt="" unoptimized className="absolute" style={{ left: 418, top: 654 }} />
        <Image src={sparkleTop} alt="" unoptimized className="absolute" style={{ left: 325, top: 629 }} />
        <Image src={sparkleBottom} alt="" unoptimized className="absolute" style={{ left: 320, top: 807 }} />
        <h1 className="absolute font-pixel text-display whitespace-nowrap text-ink" style={{ left: 529, top: 751 }}>
          Portfolio
        </h1>
        <p className="absolute font-mono text-lead whitespace-nowrap text-ink" style={{ left: 540, top: 958 }}>
          by Alisa Hordon (Xiao)
        </p>
        <p className="absolute font-mono text-lead whitespace-nowrap text-ink" style={{ left: 1245, top: 953 }}>
          UI/UX Designer
        </p>

        {/* ---------- laughing bunny: peeks out from behind the last Error window ---------- */}
        {laughing && (
          /* Clip box: the bunny is only ever visible above the window's top edge
             (it ends 1 art row below it, under the titlebar), never below the window. */
          <div
            aria-hidden="true"
            className="absolute overflow-hidden"
            style={{
              left: ERROR_STACK[0].left + 20,
              top: ERROR_STACK[0].top - LAUGH.peek - LAUGH.headroom,
              width: LAUGH.w,
              height: LAUGH.headroom + LAUGH.peek + LAUGH.belowEdge,
            }}
          >
            <div
              className="absolute left-0 animate-laugh-peek motion-reduce:animate-none"
              style={{ top: LAUGH.headroom }}
            >
              <Image
                src={bunnyLaugh}
                alt=""
                unoptimized
                width={LAUGH.w}
                height={LAUGH.h}
                className="animate-laugh-bounce motion-reduce:animate-none"
              />
            </div>
          </div>
        )}

        {/* ---------- stacked Error windows: close them one by one, except the last ---------- */}
        {ERROR_STACK.slice(0, errorsLeft).map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: pos.left, top: pos.top, width: ERROR_W }}
            aria-hidden={i < errorsLeft - 1 ? true : undefined}
            inert={i < errorsLeft - 1}
          >
            <ErrorWindow href={`mailto:${EMAIL}`} onClose={closeError} />
          </div>
        ))}

        {/* ---------- project windows (open from the folders or "My projects") ---------- */}
        {PROJECTS.map((p) => {
          const target: Rect = { x: p.left, y: p.top, w: PROJECT_W, h: p.height };
          const ph = phase[p.id];
          if (ph === "opening" || ph === "closing") {
            return (
              <ZoomRect
                key={`${p.id}-${ph}`}
                from={folderRects[p.id]}
                to={target}
                reverse={ph === "closing"}
                onDone={() => setProjectPhase(p.id, ph === "opening" ? "open" : "closed")}
              />
            );
          }
          if (ph !== "open") return null;
          return (
            <article
              key={p.id}
              className="absolute"
              style={{ left: p.left, top: p.top, width: PROJECT_W, zIndex: zIndex[p.id] }}
              onMouseDown={() => bringToFront(p.id)}
              onFocus={() => bringToFront(p.id)}
              aria-label={p.title}
            >
              <ProjectWindow
                title={p.title}
                path={p.path}
                kind={p.kind}
                description={p.description}
                onClose={() => closeProject(p.id)}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
