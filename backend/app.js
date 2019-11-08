const express = require('express')
const app = express()
const port = 3999
const cors = require('cors')

app.use(cors())

app.get('/api/invite/:id', (req, res) => {
	res.send({
		id: req.params.id,
		author: "Happy Go-Lucky"
	})
})

app.listen(port, () => console.log(`Squad backend app listening on port ${port}!`))