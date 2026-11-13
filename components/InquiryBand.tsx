import { site } from "@/content/site";
import { ButtonLink, Eyebrow } from "./ui";

/** Closing call to action used on every page, before the footer. */
export function InquiryBand({
  title = "Bring this experience to your organisation.",
  body = `Invite ${site.firstName} to speak, run a workshop or work with you on an environmental project. Tell us what you have in mind and we will reply personally.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-forest text-paper">
      <div className="contour-light absolute inset-0" aria-hidden />
      <div className="container-page relative grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="reveal lg:col-span-8">
          <Eyebrow className="text-sage">Work with us</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75">{body}</p>
        </div>
        <div className="reveal flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <ButtonLink href="/work-with-us" variant="light">
            Start an inquiry
          </ButtonLink>
          <ButtonLink href="/speaking" variant="outline-light">
            See speaking topics
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
