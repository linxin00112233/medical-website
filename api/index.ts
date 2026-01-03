import { apiService } from "./request";

export const api = {
  getHeroSlides: async () => {
    return apiService.get("/api/hero-slides");
  },
  getSurvey: async (data:{offset:number,limit:10})=>{
    return apiService.get("/api/survey", data);
  }
};
