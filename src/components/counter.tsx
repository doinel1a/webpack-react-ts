import React, { useState } from 'react';

import Button from './button';

export default function Counter() {
	const [count, setCount] = useState<number>(0);

	return (
		<>
			<h1 className='mb-4 text-4xl text-color'>ReactTS — Starter</h1>
			<section className='w-96 h-72 container flex flex-col justify-between items-center py-10 rounded-xl border border-tertiary bg-secondary'>
				<h2 className='text-6xl text-color'>{count}</h2>
				<div className='flex gap-x-5'>
					<Button
						text='+ 1'
						onClick={() =>
							setCount((previousCount) => previousCount + 1)
						}
					/>
					<Button
						text='- 1'
						onClick={() =>
							setCount((previousCount) => previousCount - 1)
						}
					/>
				</div>
			</section>
		</>
	);
}
