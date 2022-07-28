import prisma from 'lib/prisma';
import Posts from 'components/Posts';
import Link from 'next/link';
import { getSubreddit, getPostsFromSubreddit } from 'lib/data';

export default function Subreddit({ subreddit, posts }) {
	if (!subreddit) {
		return <p className='text-center p-5'>Subreddit does not exist 😔</p>;
	}

	return (
		<div className='bg-gradient-to-b from-black'>
			<Link href={'/'}>
				<a className='text-center text-xl text-white font-bold p-5 hover:underline block'>🏠home</a>
			</Link>
			<p className='text-center text-2xl text-white font-bold'>/r/{subreddit.name}</p>
			<Posts posts={posts} />
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const subreddit = await getSubreddit(params.subreddit, prisma);
	let posts = await getPostsFromSubreddit(params.subreddit, prisma);
	posts = JSON.parse(JSON.stringify(posts));

	return {
		props: {
			subreddit,
			posts
		}
	};
}
