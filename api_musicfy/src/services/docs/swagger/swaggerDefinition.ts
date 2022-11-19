export default {
  openapi: "3.0.0",
  info: {
    title: "Musicfy",
    version: "1.1.0",
    description: "Documentation Api Restful",
    contact: {
      name: "Facundo Ferrari",
      email: "facundo.ferrarif@gmail.com",
      url: "https://github.com/FacundoF1/",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  tags: [
    {
      name: "Album",
    },
  ],
  components: {
    schemas: {
      login: {
        description: "Authentication",
        type: "object",
        properties: {
          user: {
            type: "string",
            example: "User name",
            description: "Usar name.",
          },
          password: {
            type: "string",
            example: "password",
            description: "Password encrypt base64.",
          },
        },
      },
      Dna: {
        type: "object",
        properties: {
          dna: {
            type: "array",
            items: {
              $ref: "#/components/schemas/dna",
            },
          },
        },
      },
      Stats: {
        type: "object",
        properties: {
          count_mutant_dna: {
            type: "number",
            example: "0",
            description: "Total de mutantes validados y almacenados.",
          },
          count_human_dna: {
            type: "number",
            example: "0",
            description: "Total de humanos validados y almacenados.",
          },
          ratio: {
            type: "number",
            example: "0",
            description:
              "Estadísticas de las verificaciones de ADN. (count_mutant_dna/count_human_dna)",
          },
        },
      },
    },
  },
};
