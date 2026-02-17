import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

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
app.get('/api/accounts/external/:id', (req, res) => {
	const { id } = req.params;

	setTimeout(() => {
		res.json({
			verified: true,
			balance: 10000,
			id,
		});
	}, 2000);
});

// POST: Transfer money between accounts
app.post('/api/transfer', (_req, res) => {
	setTimeout(() => {
		res.json({ success: true });
	}, 1000);
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});
