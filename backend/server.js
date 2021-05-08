import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/users.route.js'

const app = express();
connectDB()

app.use(express.json()); //to accept req.body

//routes
app.use('/api/users', userRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))