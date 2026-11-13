import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <Eyebrow className="text-forest">Page not found</Eyebrow>
      <h1 className="mt-6 max-w-3xl text-5xl leading-tight sm:text-6xl">This page has moved or never existed.</h1>
      <div className="mt-10">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
      </div>
    </section>
  );
}
