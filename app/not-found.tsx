import { Pill } from "@/components/ui/Pill";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-end overflow-hidden bg-stage text-cream">
      <div className="shell relative z-10 pb-20 pt-40">
        <p className="display text-[clamp(6rem,24vw,20rem)] text-ochre">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">This page has moved or never existed.</h1>
        <div className="mt-8">
          <Pill href="/">Back home</Pill>
        </div>
      </div>
    </section>
  );
}
