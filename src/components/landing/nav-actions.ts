// Shared helper for legacy "Book a call" callers — routes to /contact page.
export function openBookCall() {
  if (typeof window !== "undefined") {
    window.location.assign("/contact");
  }
}
