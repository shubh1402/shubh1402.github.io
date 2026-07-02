"use client";

import { useEffect, useState } from "react";

export function TypingRole({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx, roles]);

  return (
    <span className="inline-flex items-center font-mono text-lg text-ink sm:text-xl">
      {text}
      <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-electric" />
    </span>
  );
}
