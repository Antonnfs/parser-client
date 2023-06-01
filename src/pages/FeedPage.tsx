import React from "react";
import PageWrapper from "../components/wrappers/PageWrapper";
import Feed from "../components/feed/Feed";
import ActionPanel from "../components/menus/ActionPanel";

export default function FeedPage() {
   return (
      <PageWrapper>
         <Feed />
      </PageWrapper>
   );
}
