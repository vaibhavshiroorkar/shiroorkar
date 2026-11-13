import type { InquiryTypeId } from "./offerings";

export const inquiryTypes: { id: InquiryTypeId; label: string; title: string; description: string }[] = [
  {
    id: "speaking",
    /** One word, used on the form's topic chips. */
    label: "Speaking",
    title: "Invite him to speak",
    description: "Keynotes, leadership talks and panels for conferences, companies and colleges.",
  },
  {
    id: "workshop",
    label: "Workshop",
    title: "Organise a workshop",
    description: "Environmental awareness sessions for schools, societies, teams and communities.",
  },
  {
    id: "project",
    label: "Project",
    title: "Discuss an environmental project",
    description: "Advice and involvement in a specific environmental or civic project.",
  },
  {
    id: "partnership",
    label: "Partnership",
    title: "Explore a partnership",
    description: "Longer collaborations with institutions, foundations and CSR programmes.",
  },
  {
    id: "media",
    label: "Media",
    title: "Media or collaboration",
    description: "Interviews, features, documentaries and relevant brand collaborations.",
  },
];

export const inquiryTypeIds = inquiryTypes.map((t) => t.id) as [InquiryTypeId, ...InquiryTypeId[]];
