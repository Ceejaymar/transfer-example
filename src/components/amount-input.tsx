type AmountInput = {
	amount: string;
	onChange: (amount: string) => void;
};

function AmountInput({ amount, onChange }: AmountInput) {
	return (
		<div className="flex items-center">
			<span className="text-3xl text-white font-bold">$</span>
			<input
				className="no-spinner bg-transparent text-center text-5xl font-bold outline-none border-none p-4 caret-blue-500 transition-all"
				type="number"
				inputMode="decimal"
				step="0.01"
				value={amount === '0' ? '' : amount}
				onChange={(e) => onChange(e.target.value)}
				placeholder="0"
			/>
		</div>
	);
}

export default AmountInput;
