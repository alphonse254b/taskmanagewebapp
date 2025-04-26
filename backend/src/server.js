import express from 'express'
import path, { dirname} from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authroutes.js'
import taskRoutes from './routes/tasktodoroutes.js'
import authMiddleware from './middleware/authmiddleware.js'

// Load environment variables
dotenv.config({ path: './backend/.env' })

const app = express()
const PORT = 5888
//localhost:5888
// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public')))

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, taskRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})
