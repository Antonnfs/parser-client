import axios from "axios";

import { auth } from "../firebase";
import { FeedItem } from "../types";

export interface FetchDataProps {
   url?: string;
   method?: "GET" | "POST" | "PUT" | "DELETE";
   limit?: number;
   first?: string;
   last?: string;
   sort?: "asc" | "desc";
   data?: Partial<FeedItem>;
}

export const fetchData = async ({
   // startDate,
   // endDate,
   url = "/posts",
   method = "GET",
   limit,
   first,
   last,
   data,
   sort,
}: FetchDataProps) => {
   const token = await auth.currentUser?.getIdToken();
   const params = new URLSearchParams();
   !!first && params.append("first", first);
   !!last && params.append("last", last);
   !!limit && params.append("limit", limit.toString());
   !!sort && params.append("sort", sort);

   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
      url: process.env.REACT_APP_SERVER_API + url,
      method,
      params,
      data,
   };

   try {
      const result = await axios(config);
      return await result.data;
   } catch (error: any) {
      return error;
   }
};
