//1st page in figma

import WelcomePage from "../components/pages/WelcomePage";
import connectMongoDB from "../config/mongodb";

export const metadata = {
  title: "PollsCheck",
};


export default function Home() {

  connectMongoDB() //remove this at some point


  return (
    <WelcomePage />
  );
}
