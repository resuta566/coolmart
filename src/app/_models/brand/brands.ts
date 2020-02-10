export interface Brands {
  data: {
    type: string,
    id: number,
    attributes: {
      name: string,
      slug: string,
      description: string,
      logo: string,
    }
  };
}
