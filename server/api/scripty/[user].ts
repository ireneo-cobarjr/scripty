import { scripties } from "~/shared/users";

export default defineEventHandler((event) => {
  const user = getRouterParam(event, "user");
  const s = scripties.filter(({ userId }) => `${userId}` === `${user}`);

  return s ?? [];
});
