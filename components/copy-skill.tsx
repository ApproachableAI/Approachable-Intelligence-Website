"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Copy this skill" button. Copies the skill text to the clipboard (with a
 * hidden-textarea fallback for older browsers) and confirms for ~2.6s.
 */
export function CopySkillButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      // Nothing else to try; the user can still select the text by hand.
    }
    ta.remove();
  };

  const copy = () => {
    const done = () => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(done)
        .catch(() => {
          fallbackCopy();
          done();
        });
    } else {
      fallbackCopy();
      done();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center justify-center rounded-full bg-rust px-[22px] py-[11px] text-[14.5px] font-semibold text-cream transition-colors hover:bg-rust-600 active:bg-rust-700"
      >
        Copy this skill
      </button>
      <span
        role="status"
        className={`text-sm font-bold text-sage-700 ${copied ? "" : "hidden"}`}
      >
        Copied &#10003; &mdash; now paste it into your AI
      </span>
    </div>
  );
}
