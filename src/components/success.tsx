import { CheckCircleIcon } from '@phosphor-icons/react';

type Success = {
	amount: string;
	handleReset: () => void;
};

export default function success({ amount, handleReset }: Success) {
	return (
		<div className="h-full pt-5 flex flex-col items-center justify-center relative bg-green-600 transition-colors duration-500">
			<CheckCircleIcon size={80} weight="fill" className="text-white mb-6" />
			<h1 className="text-2xl font-bold text-white">Transfer Sent!</h1>
			<p className="text-white/80 mt-2">${amount} has been moved.</p>

			<button
				type="button"
				onClick={handleReset}
				className="absolute bottom-10 left-4 right-4 px-6 py-4 bg-white text-green-700 
        rounded-xl font-bold cursor-pointer hover:scale-[1.02] transition-transform"
			>
				Done
			</button>
		</div>
	);
}
