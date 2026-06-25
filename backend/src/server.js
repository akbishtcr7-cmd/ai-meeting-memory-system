import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'
import { validateEnv } from './config/env.js'
import logger from './utils/logger.js'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    validateEnv()
    await connectDB()
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
    })
  } catch (error) {
    logger.error(`Server startup error: ${error.message}`)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully…')
  process.exit(0)
})

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`)
  process.exit(1)
})

startServer()
