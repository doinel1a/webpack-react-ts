import React from 'react';

interface IButton {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, onClick }: IButton) {
	return (
		<button
			type='button'
			className='w-16 px-4 py-2 text-xl text-color rounded-xl bg-accent-primary hover:bg-accent-primary-state focus:bg-accent-primary-state transition-colors'
			onClick={onClick}
		>
			<span>{text}</span>
		</button>
	);
}
