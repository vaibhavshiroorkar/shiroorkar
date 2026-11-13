/**
 * Proposed offerings. These describe what organisations can invite Udaykumar to do.
 * They are not claims about past engagements. Do not add prices without approval.
 */
export type Offering = {
  id: string;
  name: string;
  format: string;
  summary: string;
  audience: string[];
  takeaways: string[];
  inquiryType: InquiryTypeId;
};

export type InquiryTypeId = "speaking" | "workshop" | "project" | "partnership" | "media";

export const offerings: Offering[] = [
  {
    id: "now-we-wont-stop",
    name: "Now We Won't Stop",
    format: "Keynote or leadership talk",
    summary:
      "The true story behind Ata Thambaycha Naay!, told by the officer who lived it. What it takes to back people others have written off, inside a system that resists change.",
    audience: ["Corporate leadership teams", "Public sector and civic bodies", "Colleges and conferences"],
    takeaways: [
      "How dignity and education change how teams perform",
      "Leading without fear inside large institutions",
      "Turning one result into a ripple across an organisation",
    ],
    inquiryType: "speaking",
  },
  {
    id: "city-and-environment",
    name: "The City and Its Environment",
    format: "Environmental awareness session",
    summary:
      "How waste, drains, public space and green cover really work in an Indian city, from someone who managed them. Practical, local and free of jargon.",
    audience: ["Housing societies and resident groups", "Companies running CSR or ESG programmes", "Schools and colleges"],
    takeaways: [
      "What citizens can fix themselves and what to ask of the ward office",
      "Simple habits that cut waste at home and at work",
      "How to raise an environmental complaint that gets acted on",
    ],
    inquiryType: "workshop",
  },
  {
    id: "student-workshop",
    name: "Environment in Practice",
    format: "Educational workshop",
    summary:
      "An interactive session for students that links classroom environmental science to the streets outside the school gate.",
    audience: ["Schools", "Colleges and NSS units", "Youth groups"],
    takeaways: [
      "A local environmental issue, studied first hand",
      "A small action plan students can carry out",
      "Civic duty explained through real cases",
    ],
    inquiryType: "workshop",
  },
  {
    id: "community-programme",
    name: "Ward-Level Action",
    format: "Community awareness programme",
    summary:
      "A programme for neighbourhoods that want to take on a shared problem, such as waste segregation or encroachment of public space, and work with local authorities to solve it.",
    audience: ["Resident welfare associations", "NGOs and community groups", "Local businesses"],
    takeaways: [
      "A clear map of who is responsible for what",
      "A plan the community can run itself",
      "Lessons from ward administration on making change stick",
    ],
    inquiryType: "workshop",
  },
  {
    id: "institutional",
    name: "Institutional Collaborations",
    format: "Partnerships and projects",
    summary:
      "Longer engagements with institutions, foundations and companies on environmental and civic projects, from programme design to public communication.",
    audience: ["Foundations and CSR teams", "Universities", "Media and production houses"],
    takeaways: [
      "Experience of how public bodies actually decide",
      "A trusted public voice for awareness campaigns",
      "Content and storytelling through his Reels audience",
    ],
    inquiryType: "partnership",
  },
];
