export type Variant = 'FROM' | 'TO';

export type Account = {
	id: number;
	name: string;
	balance?: number;
	type: 'INTERNAL' | 'EXTERNAL';
	icon: AccountIconName;
};

export type AccountIconName =
	| 'Bank'
	| 'CurrencyDollar'
	| 'RocketLaunch'
	| 'TrendUp'
	| 'PiggyBank'
	| 'CreditCard';
