import express from 'express';

const app = express();
const PORT = 3001;

// GET: Get all accounts
app.get('/api/accounts', (_req, res) => {
	res.json({
		accounts: [
			{
				id: 1,
				name: 'Banking',
				balance: 1000,
				type: 'INTERNAL',
				icon: 'CurrencyDollar',
			},
			{
				id: 2,
				name: 'Personal Portfolio',
				balance: 400,
				type: 'INTERNAL',
				icon: 'TrendUp',
			},
			{
				id: 3,
				name: 'Savings Account',
				type: 'EXTERNAL',
				icon: 'Bank',
			},
			{
				id: 4,
				name: 'Smart Portfolio',
				balance: 100,
				type: 'INTERNAL',
				icon: 'RocketLaunch',
			},
		],
	});
});

// GET: Verify external account balance
app.get('/accounts/external/:id', (req, res) => {
	const { id } = req.params;

	res.json({
		account: {
			id,
			name: 'Account 1',
			balance: 1000,
		},
	});
});

// POST: Transfer money between accounts
app.post('/accounts/transfer', (req, res) => {
	const { from, to, amount } = req.body;

	if (from.type !== 'INTERNAL' || to.type !== 'INTERNAL') {
		return res.status(400).json({ message: 'Invalid account type' });
	}

	if (from.balance < amount) {
		return res.status(400).json({ message: 'Insufficient balance' });
	}

	res.json({
		message: 'Transfer successful',
		from,
		to,
	});
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});
