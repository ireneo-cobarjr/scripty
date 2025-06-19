export default defineNuxtRouteMiddleware(() => {
  const user = useUser();

  // redirect the user to the login screen if they're not authenticated
  if (!user.value) {
    return navigateTo("/login");
  }
});
