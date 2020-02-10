export interface Categories {
  data: {
    type: string,
    id: number,
    attributes: {
      name: string,
      slug: string,
      description: string
    }
  };
}
