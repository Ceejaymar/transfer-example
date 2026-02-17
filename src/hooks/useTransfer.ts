import { useEffect, useState } from 'react';

import type { Account } from '../types';

export function useTransfer() {
	const [accounts, setAccounts] = useState<Account[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const res = await fetch('/api/accounts');
				if (!res.ok) throw new Error('Failed to fetch');

				const data = await res.json();
				setAccounts(data.accounts);
			} catch (err) {
				console.error(err);
				setError('Failed to load accounts');
			}
		};

		fetchAccounts();
	}, []);

	const submit = async (from: Account, to: Account, amount: number) => {
		setIsLoading(true);
		setError(null);

		try {
			if (from.type === 'EXTERNAL') {
				const verifyRes = await fetch(`/api/accounts/external/${from.id}`);
				const verifyData = await verifyRes.json();
				if (verifyData.balance < amount) {
					throw new Error('External bank rejected: Insufficient Funds');
				}
			}

			const res = await fetch('/api/transfer', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ from, to, amount }),
			});

			if (!res.ok) throw new Error('Transfer failed');

			setIsSuccess(true);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Something went wrong');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setIsSuccess(false);
		setError(null);
		setIsLoading(false);
	};

	return {
		accounts,
		isLoading,
		isSuccess,
		error,
		submit,
		reset,
	};
}
