
// https://stackoverflow.com/a/40338726/8175291

async function someProcedure (n) {
	for (let i = 0; i < n; i++) {
		const t = Math.random() * 1000
		const x = await new Promise(r => setTimeout(r, t, i))
		console.log (i, x)
	}
	return 'done'
}

someProcedure(10)
	.then(console.log)
	.catch(console.error)
