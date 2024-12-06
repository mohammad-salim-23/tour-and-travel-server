/**
 * user -id
 * tour -id
 * bookedslots
 * bookingDates
 * 
 * 
 * Bus - Dhaka-Cox's Bazar
 * 30 ta seat ace
 * 1 jone 4 tiket booking korce
 * ekn 30-4=26 ta seat ace
 * abar ticekt cancel korilce
 * ekn 26+4 = 30 ta seat available
 */

import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import Tour from "../tour/tour.model";
import Booking from "./booking.model";

const createBooking = async(payload:IBooking):Promise<IBooking>=>{
    //clone database
    //sandbox- test database
    //database - error
    //database - delete
    //database - success
    // database - merge
    //basically jokon amra session use korbo , tokon session er betorer code ta ke isolate kore neya hoy ete jodi kunu error cole ase tahole seita ar database e create hobe na
    const session = await mongoose.startSession()
    session.startTransaction()
    try{
       const {tour,bookedSlots} = payload
       const requiredTour = await Tour.findById(tour)
       if(!requiredTour){
        throw new Error('Tour not found')
       }
       const totalPrice = requiredTour.price*bookedSlots
       payload.totalPrice = totalPrice
       payload.bookingStatus='pending'
       if(requiredTour.availableSeats<bookedSlots){
        throw new Error('Not enough seats available')
       }
       const booking = await Booking.create([payload],{session})
       console.log(booking);
       //available seats = availableSeats-bookedSlots
       const updateTour = await Tour.findByIdAndUpdate(booking[0].tour,{$inc:{availableSeats:-bookedSlots}},{new:true,session});
       if(updateTour){
        throw new Error('Failed to update Tour');
       }
      await session.commitTransaction();
      await session.endSession()
      return booking[0];
    }catch(error){
        await session.abortTransaction()
        await session.endSession()
        throw error
    }
}
/** 
 * 
 * Booking update
 * 
 * Booking cancel - Booking Model
 * 
 * Tour AvailableSeats = availableSeats+BookedSlot-Tour Model
*/
export const BooingService={
    createBooking
}