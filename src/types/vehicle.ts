export interface VehicleColor {
  name: string;
  hex: string;
}

export interface Vehicle {
  engineSpec: string;
  powerSpec: string;
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  description: string;
  heroImage: string;
  mobileHeroImage?: string; // Optional portrait/cropped asset for mobile
  thumbnail: string;
  actionImage: string;
  imageStyle: string;
  colors: VehicleColor[];
  features: string[];
  price: string;
  videoUrl?: string;
}