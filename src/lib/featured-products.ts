export type FeaturedProduct = {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
};

export const featuredProducts: readonly FeaturedProduct[] = [
  {
    id: "1",
    name: "Market Entry Blueprint",
    price: "From $8,000",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Business growth planning session",
  },
  {
    id: "2",
    name: "Financial Restructuring Program",
    price: "From $12,500",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Financial consultants reviewing reports",
  },
  {
    id: "3",
    name: "Due Diligence Assessment",
    price: "From $6,200",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Financial due diligence documents",
  },
  {
    id: "4",
    name: "Executive Transformation Advisory",
    price: "From $15,000",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Corporate executives in strategy meeting",
  },
] as const;
