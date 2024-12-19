/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { handleZodError } from "../helpers/handleZodError"
import mongoose from "mongoose";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleGenericError } from "../helpers/handleGenericError";

//Error:
//Generic Error->js teke ase
//1.Duplicate error->mongoose
//2.validation
//3.cast Error- Type Casting Error
//4.Zod Error/joi

export const globalErrorHandler=((err:any,req:Request, res:Response,_next:NextFunction)=>{
  if(err.name && err.name==="ZodError"){
    handleZodError(err,res);
  }
  else if(err instanceof mongoose.Error.ValidationError){
    handleValidationError(err,res);
  }else if(err.code && err.code === 11000){
    handleDuplicateError(err,res);
  }
  else if(err instanceof Error){
    handleGenericError(err,res);
  }
})