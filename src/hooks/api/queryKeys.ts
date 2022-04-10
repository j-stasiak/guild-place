export const generateQueryKeys = (entity: string) => {
  return {
    all: [entity],
    list: [entity, "list"],
    details: (id: string) => [entity, "details", id],
  };
};

export const forumPostKeys = generateQueryKeys("forumPost");
