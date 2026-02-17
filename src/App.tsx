import { useState } from 'react';

import AccountSelector from './components/account-selector';
import AmountInput from './components/amount-input';
import BottomSheet from './components/bottom-sheet';
import ErrorToast from './components/error-toast';
import Success from './components/success';
import './App.css';
import HorizontalDivider from './components/horizontal-divider';
import Loading from './components/loading';
import { useTransfer } from './hooks/useTransfer';
import type { Account } from './types';

function App() {
	const { accounts, isLoading, isSuccess, error, submit, reset } =
		useTransfer();

	const [amount, setAmount] = useState<string>('0');
	const [fromAccount, setFromAccount] = useState<Account | null>(null);
	const [toAccount, setToAccount] = useState<Account | null>(null);

	const handleReset = () => {
		setAmount('0');
		setFromAccount(null);
		setToAccount(null);
		reset();
	};

	if (isLoading) {
		return <Loading />;
	}

	if (isSuccess) {
		return <Success amount={amount} handleReset={handleReset} />;
	}

	const numAmount = parseFloat(amount);
	const isAmountValid = amount !== '' && numAmount > 0;
	const isSelectionDisabled = !isAmountValid;
	const canSubmit = fromAccount && toAccount && isAmountValid;

	return (
		<div className="h-full pt-5 flex flex-col items-center  relative">
			<h1 className="text-xl font-semibold text-white">Transfer Money</h1>

			<AmountInput amount={amount} onChange={(val) => setAmount(val)} />

			<BottomSheet
				variant="FROM"
				selectedName={fromAccount?.name}
				disabled={isSelectionDisabled}
			>
				<AccountSelector
					accounts={accounts}
					onSelect={(acc) => setFromAccount(acc)}
					selectedId={toAccount?.id}
					requiredAmount={numAmount}
				/>
			</BottomSheet>

			<HorizontalDivider />

			<BottomSheet
				variant="TO"
				selectedName={toAccount?.name}
				disabled={isSelectionDisabled}
			>
				<AccountSelector
					accounts={accounts}
					onSelect={(acc) => setToAccount(acc)}
					selectedId={fromAccount?.id}
					requiredAmount={numAmount}
				/>
			</BottomSheet>

			{error && <ErrorToast error={error} />}

			<button
				className={`absolute bottom-10 left-4 right-4 px-6 py-4 text-white select-none
          rounded-xl font-semibold cursor-pointer transition-all
          ${!canSubmit ? 'bg-slate-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.98]'}`}
				disabled={!canSubmit}
				type="button"
				onClick={() => {
					if (fromAccount && toAccount) {
						submit(fromAccount, toAccount, numAmount);
					}
				}}
			>
				Transfer balance
			</button>
		</div>
	);
}

export default App;
