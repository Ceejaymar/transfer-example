import { ArrowRightIcon, PlusIcon } from '@phosphor-icons/react';

import type { Variant } from '../types';

type SelectionItem = {
	variant: Variant;
	selectedName?: string;
	disabled?: boolean;
};

function SelectionItem({ variant, selectedName, disabled }: SelectionItem) {
	const type = variant === 'TO' ? 'To' : 'From';

	return (
		<div
			className={`flex flex-col gap-1 px-4 py-3 text-left text-white w-full transition-all duration-300 
        ${disabled ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100 cursor-pointer'}
      `}
		>
			<div className="text-slate-400 text-left select-none text-sm font-semibold mb-2">
				{type}
			</div>
			<div className="flex items-center gap-3 ">
				<div className="bg-slate-500 rounded-lg p-2">
					<PlusIcon size={24} />
				</div>
				<span className="flex-1 text-left select-none">
					{selectedName || 'Choose account'}
				</span>
				<ArrowRightIcon size={24} className="self-end" />
			</div>
		</div>
	);
}

export default SelectionItem;
