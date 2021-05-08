import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/users.route.js'
import cors from 'cors'

const app = express();
connectDB()

app.use(express.json()); //to accept req.body
app.use(cors())

//routes
app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))