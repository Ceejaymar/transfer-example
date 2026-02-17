import { Drawer } from 'vaul';

import type { Account } from '../types';
import { AccountIcon } from '../utils/icons';

type AccountSelector = {
	accounts: Account[];
	onSelect: (account: Account) => void;
	selectedId?: number;
	requiredAmount: number;
};

function AccountSelector({
	accounts,
	onSelect,
	selectedId,
	requiredAmount,
}: AccountSelector) {
	const renderRow = (account: Account) => {
		const isExcluded = selectedId === account.id;
		const isInsufficient =
			account.type === 'INTERNAL' && (account.balance || 0) < requiredAmount;
		const isDisabled = isExcluded || isInsufficient;

		return (
			<Drawer.Close
				key={account.id}
				onClick={() => {
					if (!isDisabled) onSelect(account);
				}}
				className={`w-full text-left outline-none bg-transparent p-0 ${
					isExcluded ? 'pointer-events-none' : ''
				}`}
			>
				<div
					className={`flex items-center gap-3 p-3 rounded-xl transition-opacity ${
						isDisabled ? 'opacity-20' : 'active:bg-gray-100'
					}`}
				>
					<AccountIcon name={account.icon} />
					<div className="flex-1">
						<h3 className="font-medium text-gray-900">{account.name}</h3>
						{account.balance !== undefined && (
							<p className="text-xs text-gray-500">
								Balance: ${account.balance.toFixed(2)}
							</p>
						)}
					</div>
					{isExcluded && (
						<span className="text-[10px] font-bold text-gray-400 uppercase">
							Already Selected
						</span>
					)}

					{isInsufficient && !isExcluded && (
						<span className="text-[10px] font-bold text-red-500 uppercase bg-red-50 px-2 py-1 rounded">
							Insufficient funds
						</span>
					)}
				</div>
			</Drawer.Close>
		);
	};

	return (
		<div className="flex flex-col gap-4 pb-10 overflow-hidden">
			<div className="p-4">
				<h2 className="text-2xl font-bold">Choose account</h2>
			</div>
			<div className="px-4 space-y-6">
				<section>
					<h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
						External
					</h3>
					{accounts.filter((a) => a.type === 'EXTERNAL').map(renderRow)}
				</section>
				<section>
					<h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
						Internal
					</h3>
					{accounts.filter((a) => a.type === 'INTERNAL').map(renderRow)}
				</section>
			</div>
		</div>
	);
}

export default AccountSelector;
