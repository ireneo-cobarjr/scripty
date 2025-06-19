import { scripties } from "~/shared/users";

export default defineEventHandler(async (event) => {
  const { code, description, evaluation, title, userId, id } =
    await readBody(event);

  if (!id || id === "new") {
    scripties.push({
      id: scripties.length + 1,
      code,
      description,
      evaluation,
      title,
      userId,
    });
  } else {
    const index = scripties.findIndex((s) => s.id === id);
    if (index !== -1)
      scripties[index] = {
        id,
        code,
        description,
        evaluation,
        title,
        userId,
      };
  }
});
