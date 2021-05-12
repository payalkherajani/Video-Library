import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/users.route.js'
import channelRoutes from './routes/channels.route.js'
import videosRoutes from './routes/videos.route.js'
import watchlaterRoutes from './routes/watchlater.route.js'
import cors from 'cors';
import { auth } from './middleware/auth.js';

const app = express();
connectDB()

app.use(express.json()); //to accept req.body
app.use(cors())

//routes
app.use('/api/users', userRoutes);
app.use('/api/channels', auth, channelRoutes)
app.use('/api/videos', auth, videosRoutes)
app.use('/api/watchlater', auth, watchlaterRoutes);
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))