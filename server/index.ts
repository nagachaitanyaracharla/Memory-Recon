import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import reconstructRouter from './routes/reconstruct'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Mount reconstruction API
app.use('/api', reconstructRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Memory Recon AI API' })
})

app.listen(PORT, () => {
  console.log(`[Memory Recon Server] AI API running on http://127.0.0.1:${PORT}`)
})
