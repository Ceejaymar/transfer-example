import express from 'express';

const app = express();
const PORT = 3001;

// GET: Get all accounts
app.get('/accounts', (_req, res) => {
	res.json({
		accounts: [
			{
				id: 1,
				name: 'Account 1',
				balance: 1000,
				type: 'INTERNAL',
			},
			{
				id: 2,
				name: 'Account 2',
				type: 'EXTERNAL',
			},
			{
				id: 3,
				name: 'Account 3',
				balance: 400,
				type: 'INTERNAL',
			},
			{
				id: 4,
				name: 'Account 4',
				type: 'EXTERNAL',
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

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});
