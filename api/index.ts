import { apiService } from "./request";

export const api = {
  getHeroSlides: async () => {
    return apiService.get("/api/v1/hero-slides");
  },
};
