import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Counter from './components/counter';
import GithubCorner from './components/github-corner';

export default function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen flex-col items-center justify-center bg-primary'>
        <GithubCorner
          title='Get started on GitHub'
          url='https://github.com/doinel1a/webpack-react-ts'
        />
        <Counter />
      </main>
    </BrowserRouter>
  );
}
