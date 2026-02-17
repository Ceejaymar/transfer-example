import { WarningCircleIcon } from '@phosphor-icons/react';

type ErrorToast = {
	error: string | null;
};

export default function errorToast({ error }: ErrorToast) {
	return (
		<div className="absolute bottom-30 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
			<WarningCircleIcon size={16} weight="fill" />
			{error}
		</div>
	);
}
