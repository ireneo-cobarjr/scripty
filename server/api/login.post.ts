import { User } from "~/composables/users";
import { appUsers } from "~/shared/users";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (username) {
    const _user = appUsers.find(
      (u: User) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (_user && _user.password === password) {
      const { password, ...user } = _user;
      return { user };
    }
  }

  setResponseStatus(event, 401, "Invalid Credentials");
});
