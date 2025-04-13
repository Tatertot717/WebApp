//1st view on figma/ contains the welcome page and all subcomponets
'use client'

import Link from 'next/link'

const WelcomePage = () => {

    return (
        <div>
            <h1>PollsCheck</h1>
            <h4>Create polls and get feedbackfrom your community!</h4>
            <Link href="/create-poll">
  				<button type="button">
    				Create a Poll
  				</button>
			</Link>
    		<hr />
            <Link href="/search">
  				<button type="button">
    				Find a Poll
  				</button>
			</Link>
        </div>
    );
};
export default WelcomePage;
