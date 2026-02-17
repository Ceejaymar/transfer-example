import {
	BankIcon,
	CreditCardIcon,
	CurrencyDollarIcon,
	PiggyBankIcon,
	RocketLaunchIcon,
	TrendUpIcon,
} from '@phosphor-icons/react';
import type { AccountIconName } from '../types';

export const AccountIcons: Record<AccountIconName, React.ElementType> = {
	Bank: BankIcon,
	CurrencyDollar: CurrencyDollarIcon,
	RocketLaunch: RocketLaunchIcon,
	TrendUp: TrendUpIcon,
	PiggyBank: PiggyBankIcon,
	CreditCard: CreditCardIcon,
};

type AccountIcon = {
	name: AccountIconName;
	size?: number;
};

// Helper component to render the right icon with a fallback
export function AccountIcon({ name, size = 24 }: AccountIcon) {
	const SelectedIcon = AccountIcons[name] || CreditCardIcon;

	return (
		<div className="bg-slate-200 rounded-lg p-2">
			<SelectedIcon size={size} weight="regular" />
		</div>
	);
}
