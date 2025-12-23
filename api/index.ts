import { NEWS_ITEMS, EVENTS, STATS } from "../assets/constants";
import { wait } from "../utils";

// Mock API service
export const api = {
  getNews: async () => {
    await wait(500); // Simulate network latency
    return NEWS_ITEMS;
  },

  getEvents: async () => {
    await wait(300);
    return EVENTS;
  },

  getStats: async () => {
    await wait(400);
    return STATS;
  },
};
