/**
 * Video interviews, shown in the homepage carousel and on the Media page.
 * To add one, paste the YouTube video id (the part after "watch?v=").
 * Videos play only when a visitor taps them, using YouTube's privacy-enhanced embed.
 */
export type Interview = {
  youtubeId: string;
  title: string;
  channel: string;
  /** Short context line, e.g. series, episode or language. */
  detail?: string;
};

export const interviews: Interview[] = [
  {
    youtubeId: "R7bqKX61mr8",
    title: "Ordinary People, Extraordinary Achievements",
    channel: "ABP News",
    detail: "Ideas of India Summit 2026, panel with Rohan Mahajan",
  },
  {
    youtubeId: "ukV0-lD8S08",
    title: "Service Beyond Duty: In Conversation With Udaykumar Shiroorkar",
    channel: "ABP Live",
    detail: "Lead Inc. series",
  },
  {
    youtubeId: "8GJY2q6TRNo",
    title: "Meet BMC's Demolition Man: Udaykumar Shiroorkar's Journey to the Big Screen",
    channel: "Lokmat Times",
    detail: "Dongri, Madanpura and Mohammed Ali Road",
  },
  {
    youtubeId: "ksFRHdB_xPA",
    title: "BMC मध्ये रात्रपाळीचं काम कायमचं का बंद झालं?",
    channel: "Marathi Mood",
    detail: "Podcast episode 21, part 2. Why the BMC's night-shift work ended for good (Marathi)",
  },
  {
    youtubeId: "rdG3LwcGzEU",
    title: "Assistant Commissioner (Retd.) Udaykumar Shiroorkar interview",
    channel: "Janta Vrutta",
    detail: "Marathi",
  },
];

export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
