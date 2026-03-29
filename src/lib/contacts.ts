export const contacts = {
  milos: {
    email: "milos.micke.mitrovic@gmail.com",
    whatsapp: "+381658869002",
    linkedin: "#", // TODO: add real LinkedIn URL
  },
  marija: {
    email: "", // TODO: add Marija's email
    whatsapp: "", // TODO: add Marija's phone
    linkedin: "https://www.linkedin.com/in/marija-mileti%C4%87-3107993/",
  },
} as const;

export function getContactEmail(source: string) {
  return source === "marketing" ? contacts.marija.email : contacts.milos.email;
}
