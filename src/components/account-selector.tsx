import type { Account } from '../types';
import { AccountIcon } from '../utils/icons';

type AccountSelector = {
	accounts: Account[];
};

function AccountSelector({ accounts }: AccountSelector) {
	return (
		<div className="flex flex-col gap-4 pb-10">
			<div className="p-4">
				<h2 className="text-2xl font-bold">Choose account</h2>
			</div>
			<div className="flex flex-col gap-2 px-4">
				<h3 className="text-lg font-semibold text-gray-500">
					External Accounts
				</h3>
				{accounts
					.filter((account) => account.type === 'EXTERNAL')
					.map((account) => (
						<div key={account.id}>
							<div className="flex items-center gap-2">
								<AccountIcon name={account.icon} />
								<h3>{account.name}</h3>
							</div>
						</div>
					))}

				<h3 className="text-lg font-semibold text-gray-500">
					Internal Accounts
				</h3>
				{accounts
					.filter((account) => account.type === 'INTERNAL')
					.map((account) => (
						<div key={account.id} className="flex items-center gap-2">
							<AccountIcon name={account.icon} />
							<div className=" ">
								<h3>{account.name}</h3>
								<p className="text-xs text-gray-500 ">
									Balance: ${account.balance?.toFixed(2)}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default AccountSelector;
