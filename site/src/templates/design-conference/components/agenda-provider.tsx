"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { XIcon } from "@phosphor-icons/react";
import { agendaCopy, event, sessions } from "../content";
import { findConflicts, restoreSelection, type Session, type Track } from "../lib/agenda";
import { localTime } from "../lib/format";

type AgendaContextValue = {
  selected: Session[]; loaded: boolean; storageError: string | null; track: Track; setTrack: (track: Track) => void;
  toggle: (session: Session) => void; remove: (id: string) => void; clear: () => void;
};
const AgendaContext = createContext<AgendaContextValue | null>(null);
export function useAgenda() {
  const context = useContext(AgendaContext);
  if (!context) throw new Error("Agenda controls need AgendaProvider");
  return context;
}
export function AgendaProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [track, setTrack] = useState<Track>("All");
  const [pending, setPending] = useState<Session | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = sessions.filter(session => ids.includes(session.id));
  const conflicts = pending ? findConflicts(selected, pending) : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      try { setIds(restoreSelection(localStorage.getItem(event.storageKey), sessions)); }
      catch { setStorageError(agendaCopy.restoredError); }
      setLoaded(true);
    }, 0);
    const sync = (change: StorageEvent) => {
      if (change.key !== event.storageKey) return;
      try { setIds(restoreSelection(change.newValue, sessions)); }
      catch { setStorageError(agendaCopy.restoredError); }
    };
    window.addEventListener("storage", sync);
    return () => { clearTimeout(timer); window.removeEventListener("storage", sync); };
  }, []);
  useEffect(() => {
    if (pending && !dialog.current?.open) dialog.current?.showModal();
    else if (!pending && dialog.current?.open) dialog.current?.close();
  }, [pending]);

  const commit = (next: string[]) => {
    setIds(next);
    try {
      if (next.length) localStorage.setItem(event.storageKey, JSON.stringify(next));
      else localStorage.removeItem(event.storageKey);
      setStorageError(null);
    } catch { setStorageError(agendaCopy.storageError); }
  };
  const toggle = (session: Session) => {
    if (!loaded) return;
    if (ids.includes(session.id)) return commit(ids.filter(id => id !== session.id));
    if (findConflicts(selected, session).length) return setPending(session);
    commit([...ids, session.id]);
  };
  const replace = () => {
    if (!pending) return;
    const replaceIds = new Set(conflicts.map(session => session.id));
    commit([...ids.filter(id => !replaceIds.has(id)), pending.id]);
    setPending(null);
  };

  return (
    <AgendaContext.Provider value={{ selected, loaded, storageError, track, setTrack, toggle, remove: id => commit(ids.filter(saved => saved !== id)), clear: () => commit([]) }}>
      {children}
      <dialog ref={dialog} className="assembly-dialog" aria-labelledby="assembly-conflict-title" onCancel={() => setPending(null)} onClose={() => setPending(null)}>
        <div className="flex items-start justify-between gap-6"><h2 id="assembly-conflict-title" className="max-w-xs text-3xl font-semibold tracking-tight">{agendaCopy.conflictTitle}</h2><button type="button" className="assembly-icon-button shrink-0" onClick={() => setPending(null)} aria-label={agendaCopy.close}><XIcon size={22} /></button></div>
        <p className="mt-5 text-sm leading-relaxed text-(--assembly-muted)">{agendaCopy.conflictText}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-(--assembly-rule) p-4"><p className="assembly-mono text-xs text-(--assembly-muted)">{agendaCopy.current}</p>{conflicts.map(session => <div key={session.id} className="mt-3"><p className="text-base font-semibold">{session.title}</p><p className="assembly-mono mt-2 text-xs">{localTime(session.start)} — {localTime(session.end)}</p></div>)}</div>
          {pending && <div className="border border-(--assembly-ink) bg-(--assembly-orange) p-4"><p className="assembly-mono text-xs">{agendaCopy.proposed}</p><p className="mt-3 text-base font-semibold">{pending.title}</p><p className="assembly-mono mt-2 text-xs">{localTime(pending.start)} — {localTime(pending.end)}</p></div>}
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><button type="button" className="assembly-button" onClick={replace}>{agendaCopy.replace}</button><button type="button" className="assembly-button assembly-button-quiet" onClick={() => setPending(null)}>{agendaCopy.keep}</button></div>
      </dialog>
    </AgendaContext.Provider>
  );
}
