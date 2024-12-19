/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.route'
import { StatusCodes } from 'http-status-codes'
import bookingRouter from './module/booking/booking.route'
import { globalErrorHandler } from './middlewares/globalErrorHandler'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking',bookingRouter);
// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})
//global error handler
app.use(globalErrorHandler)
app.use("*",(req:Request, res:Response)=>{
  res.status(404).json({
    status:false,
    message:'API not found'
  })
})

export default app
