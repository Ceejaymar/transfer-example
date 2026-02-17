import { useEffect, useState } from 'react';

import AccountSelector from './components/account-selector';
import AmountInput from './components/amount-input';
import BottomSheet from './components/bottom-sheet';
import './App.css';
import HorizontalDivider from './components/horizontal-divider';

function App() {
	const [accounts, setAccounts] = useState([]);
	const [amount, setAmount] = useState<string>('0');

	useEffect(() => {
		const fetchAccounts = async () => {
			const res = await fetch('/api/accounts');

			if (!res.ok) {
				throw new Error('Failed to fetch accounts');
			}

			const data = await res.json();

			setAccounts(data.accounts);
		};

		fetchAccounts();
	}, []);

	return (
		<div className="App pt-5 flex flex-col items-center justify-center">
			<h1 className="text-xl font-semibold text-white">Transfer Money</h1>
			<AmountInput amount={amount} onChange={(amount) => setAmount(amount)} />
			<BottomSheet variant="FROM">
				<AccountSelector accounts={accounts} />
			</BottomSheet>
			<HorizontalDivider />
			<BottomSheet variant="TO">
				<AccountSelector accounts={accounts} />
			</BottomSheet>
		</div>
	);
}

export default App;
