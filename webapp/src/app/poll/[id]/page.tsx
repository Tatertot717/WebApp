import VotePage from "@/src/components/pages/VotePage";

export const metadata = {
    title: "PollsCheck - Poll",
  };

export default async function Page(props: { params: { id: string } }) {
  return <VotePage params={Promise.resolve(props.params)} />;
}
