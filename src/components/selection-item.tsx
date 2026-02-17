import { ArrowRightIcon, PlusIcon } from '@phosphor-icons/react';

import type { Variant } from '../types';

type SelectionItem = {
	variant: Variant;
};

function SelectionItem({ variant }: SelectionItem) {
	const type = variant === 'TO' ? 'To' : 'From';

	return (
		<div className="flex flex-col gap-2 p-4 text-white">
			<div className="text-left">{type}</div>
			<div className="flex items-center gap-3 ">
				<div className="bg-slate-500 rounded-lg p-2">
					<PlusIcon size={24} />
				</div>
				<span className="flex-1 text-left">Choose account</span>
				<ArrowRightIcon size={24} className="self-end" />
			</div>
		</div>
	);
}

export default SelectionItem;
