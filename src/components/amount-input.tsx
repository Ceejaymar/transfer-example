type AmountInput = {
	amount: string;
	onChange: (amount: string) => void;
};

function AmountInput({ amount, onChange }: AmountInput) {
	const value = amount === '0' ? '' : amount;
	const width = value.length === 0 ? '1ch' : `${value.length + 0.5}ch`;

	return (
		<div className="flex items-center justify-center w-full gap-1">
			<span className="text-4xl text-white font-bold">$</span>

			<input
				style={{ width }}
				className="no-spinner bg-transparent text-white text-left text-5xl font-bold outline-none border-none p-0 caret-blue-500 transition-all min-w-[1ch]"
				type="number"
				inputMode="decimal"
				step="0.01"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="0"
			/>
		</div>
	);
}

export default AmountInput;
