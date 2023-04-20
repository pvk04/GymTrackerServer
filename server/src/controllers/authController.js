async function registration(req, res) {
	try {
		const { username, password } = req.body;
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: 'Registration error' });
	}
}

async function login(req, res) {
	try {
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: 'Login error' });
	}
}

export const authController = { registration, login };
