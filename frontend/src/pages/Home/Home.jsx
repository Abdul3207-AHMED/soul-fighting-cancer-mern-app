import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost';
import Online from '../../components/Online/Online';
import Posts from '../../components/Post/Posts';
import Leftmenu from '../../components/LeftMenu/LeftMenu';
import './home.css';

const Home = () => {
	const {
		post: { posts },
	} = useSelector(state => state);

	const mainRef = React.useRef(null);
	const nextPageLoaderRef = React.useRef(null);

	const getNextPage = () => {
		nextPageLoaderRef.current?.getNextPage?.();
	};

	return (
		<section className='home'>
			<aside className='home__left'>
				<Leftmenu />
			</aside>
			<main className='home__center' onScroll={getNextPage} ref={mainRef}>
				<CreatePost />
				<Posts posts={posts} containerRef={mainRef} nextPageLoaderRef={nextPageLoaderRef} />
			</main>
			<aside className='home__right'>
				<Online />
			</aside>
		</section>
	);
};

export default React.memo(Home);
