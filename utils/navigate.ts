import { Href, router } from "expo-router";

export const handleNavigate = (page: string) => {
    router.navigate(`${page}` as Href);
  };