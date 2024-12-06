// req and res manage

import { Request, Response } from 'express'
import { userService } from './user.service'
import {
	StatusCodes
} from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
const createUser = catchAsync(async (req: Request, res: Response) => {
 
  const payload = req.body

  const result = await userService.createUser(payload)

  sendResponse(res,{
    statusCode:StatusCodes.CREATED,
    message:'User created successfully',
    data:result
  })
 
})

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUser();
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message:'Users getting successfully',
    data:result
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  
   
  const userId = req.params.userId

  const result = await userService.getSingleUser(userId)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message:'User getting successfully',
  data:result
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)

  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message:'User update successfully',
  data:result
  })

})

const deleteUser = async (req: Request, res: Response) => {
  
    const userId = req.params.userId
    await userService.deleteUser(userId)
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      message:'User update successfully',
    data:{},
    })
}  


export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
