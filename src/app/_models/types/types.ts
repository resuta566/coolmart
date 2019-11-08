export class Types {
  data: {
    type: string,
    id: number,
    attributes: {
      name: string,
      description: string
    },
    relationships: {
      models: {
        data: {
          type: string,
          id: number,
          attributes:{
            name: string,
            slug: string,
            description: string
          }
        }
      }
    }
  };
}
