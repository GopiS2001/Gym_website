export const site = {
  name: "Real Warriors",
  fullName: "Real Warriors Unisex Gym",
  tagline: "Train like a warrior. Live like one.",
  description:
    "Real Warriors is a unisex strength and conditioning gym in Salem with expert coaches, modern equipment and programs built for real results.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phones: [
    { display: "79049 72611", href: "tel:+917904972611" },
    { display: "80150 03663", href: "tel:+918015003663" },
  ],
  // TODO(client): confirm which number is on WhatsApp.
  whatsapp: "917904972611", // digits only, with country code
  address: {
    line1: "Sakthi Nagar, Veeranam Main Rd",
    line2: "Puthumariamman Kovil, Salem, Tamil Nadu – 636003",
    short: "Sakthi Nagar, Salem",
  },
  map: {
    lat: 11.6670614,
    lng: 78.180842,
    // Google Maps listing for the gym (opens directions / reviews).
    url: "https://www.google.com/maps/place/REAL+WARRIORS+UNISEX+GYM/@11.6670614,78.1782671,1064m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3babf195379e3969:0x56fafb2776b4e937!8m2!3d11.6670614!4d78.180842!16s%2Fg%2F11md_759zv",
  },
  hours: [
    { days: "Morning", time: "5:00 AM – 9:00 AM" },
    { days: "Evening", time: "5:00 PM – 9:00 PM" },
  ],
  // TODO(client): add real social profile links (or remove).
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/trainers", label: "Trainers" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// PLACEHOLDER: first two figures need confirming with the client.
export const stats = [
  { value: 150, prefix: "", suffix: "+", label: "pieces of equipment" },
  { value: 8, prefix: "", suffix: "", label: "certified coaches" },
  { value: 8, prefix: "", suffix: " hrs", label: "training every day" },
  { value: 700, prefix: "₹", suffix: "", label: "monthly membership" },
];

export const whatsappLink = (message = "Hi Real Warriors, I'd like to join the gym.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
