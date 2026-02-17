import { CircleNotchIcon } from '@phosphor-icons/react';

export default function Loading() {
	return (
		<div className="h-full pt-5 flex flex-col items-center justify-center relative">
			<CircleNotchIcon size={64} className="animate-spin text-white mb-4" />
			<h2 className="text-xl font-semibold text-white animate-pulse">
				Processing...
			</h2>
		</div>
	);
}
