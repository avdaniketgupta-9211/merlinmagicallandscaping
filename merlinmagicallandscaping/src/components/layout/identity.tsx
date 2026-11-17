import Link from "next/link";
import { site } from "@/data/site";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label={`${site.name} — home`}>
      <svg viewBox="0 0 42 42" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" className="wordmark-mark">
        <path d="M21 35V14m0 10C12 24 6.5 19 5.5 10.5c7.8.4 13.2 5.1 15.5 13.5Zm.1 3.5c1.9-9.5 7.5-14.6 15.5-15.7-1.2 8.6-7 14.1-15.5 15.7ZM21 16.2C16.2 11.7 16.6 6.2 21 2.3c4.4 4 4.8 9.4 0 13.9ZM5.5 35h31m-23 4.4h15" />
        <path d="m10.2 15.6 10.9 8.7m9.3-6.9-9.2 9.9" opacity=".68" />
      </svg>
      <span className="wordmark-lockup"><span className="wordmark-name">Merlin</span>{" "}<span className="wordmark-sub">Magicallandscapi</span></span>
    </Link>
  );
}
