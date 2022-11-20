import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Counter from './components/counter';
import GithubCorner from './components/github-corner';

export default function App() {
	return (
		<BrowserRouter>
			<main className='h-screen flex flex-col justify-center items-center bg-primary'>
				<GithubCorner
					title='View source on GitHub'
					url='https://github.com/doinel1a/react-ts-starter'
				/>
				<Counter />
			</main>
		</BrowserRouter>
	);
}
