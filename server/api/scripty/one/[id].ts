import { scripties } from "~/shared/users";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const s = scripties.find((s) => `${s.id}` === `${id}`);

  return s;
});
