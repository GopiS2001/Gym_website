export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Program = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: Photo;
};

export type Trainer = {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  image: Photo;
};

export type MembershipPlan = {
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};
