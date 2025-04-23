//not on figma

import PollsPage from "@/src/components/pages/PollsPage";
import { Suspense } from "react";

export const metadata = {
  title: "PollsCheck - Polls",
};

export default function Search() {
  return (
    <Suspense fallback={<div>Loading polls...</div>}>
      <PollsPage />
    </Suspense>
  );
}
