

'use client';
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export function InactivityProvider({ children, timeout = 60000 }) {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        signOut();
      }, timeout);
    };

    const activityEvents = ["mousemove", "keydown", "click"];
    
    if (typeof window !== 'undefined') {
      activityEvents.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });
      
      resetTimer();
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (typeof window !== 'undefined') {
        activityEvents.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      }
    };
  }, [timeout]);

  return <>{children}</>;
}