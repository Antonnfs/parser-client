import { create } from "zustand";
import { fetchData } from "../api";

export interface PostItem {
   creator: string;
   title: string;
   pubDate: string;
   content: string;
   contentSnippet: string;
   guid: string;
   categories: string[];
   isoDate: string;
   link: string;
   image?: string;
}

export interface PostsStore {
   posts: PostItem[];
   loading: boolean;
   error: string;
   url: string;
   count: number;
   page: number;
   pages: number;
   first: string;
   last: string;
   limit: number;
   sort: "desc" | "asc";
   getPosts: () => Promise<void>;
   prevPage: () => void;
   nextPage: () => void;
   toggleSort: () => void;
   deletePost: (id: string) => Promise<void>;
}

export const usePosts = create<PostsStore>((set, getState) => ({
   posts: [],
   loading: false,
   error: "",
   url: "/posts",
   count: 1,
   countToLast: 0,
   page: 1,
   pages: 1,
   first: "",
   last: "",
   limit: 30,
   sort: "desc",
   getPosts: async () => {
      const { url, limit, first, last, sort } = getState();
      set({ loading: true, error: "" });
      try {
         const response = await fetchData({ url, limit, first, last, sort });
         const { items, count, pages } = response;
         set({ posts: items, count, pages, loading: false });
      } catch (error: any) {
         set({
            error: error?.message || "Fetch error",
            loading: false,
         });
      }
   },
   toggleSort: () => {
      let { sort } = getState();
      sort === "desc" ? (sort = "asc") : (sort = "desc");
      set({ sort, first: "", last: "", page: 1 });
   },
   nextPage: () => {
      const { posts, page } = getState();
      const last = posts.pop()?.isoDate || "";
      set({ last, first: "", page: page + 1 });
   },
   prevPage: () => {
      const { posts, page } = getState();
      const first = posts.shift()?.isoDate || "";
      set({ first, last: "", page: page - 1 });
   },
   deletePost: async (guid) => {
      const { url } = getState();
      set({ loading: true, error: "" });
      try {
         const response = await fetchData({
            url: `${url}/${guid}`,
            method: "DELETE",
         });
         console.log(response);
         set({ loading: false });
      } catch (error: any) {
         set({
            error: error?.message || "Delete error",
            loading: false,
         });
      }
   },
}));
