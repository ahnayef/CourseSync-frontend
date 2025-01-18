import { Href, router } from "expo-router";

export const handleNavigate = (page: string) => {

  if (page === "@back") {
    router.back();
    return;
  }

  router.navigate(`${page}` as Href);
};