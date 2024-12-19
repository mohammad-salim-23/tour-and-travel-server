/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

//Error:
//Generic Error->js teke ase
//1.Duplicate error->mongoose
//2.validation
//3.cast Error- Type Casting Error
//4.Zod Error/joi

export const globalErrorHandler=((err:any,req:Request, res:Response,_next:NextFunction)=>{
  console.log('error from app.ts',err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  .json({success:false,message:err.message,error:err})
})