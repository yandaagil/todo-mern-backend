import './utils/connectDB'
import createServer from './utils/server'

const app = createServer()
const port: number = 4000

app.listen(port, () => console.log(`Listening on port ${port}`))
