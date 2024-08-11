import { BookingModel } from "../Models/booking.js";
import { bookSchema } from "../Schema/booking.js";
import { UserModel } from "../Models/user.js";
import { mailTransport } from "../config/mail.js";


export const booking = async (req, res, next) => {
    try {
        // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
        const {error, value} = bookSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }

        //   GET THE USER ID FROM REQ.USER
          const token = req?.user.id;

        //   FIND THE USER BY ID
          const user = await UserModel.findById(token);
      if (!user) {
        return res.status(404).send("User not found");
      }

    //   CREATE A NEW BOOKING ASSOCIATED WITH THE USER
      const addBooking = await BookingModel.create({ ...value, user: token });
    //   SEND A BOOKING EMAIL To THE USER AND COMPANY
    await Promise.all([
      mailTransport.sendMail({
          from: "your-email@example.com",
          to: value.email,
          subject: "Booking Confirmation",
          text: `Dear ${value.fullName},\n\nYour booking has been successfully created.\n\nThank you!`
      }),
      mailTransport.sendMail({
          from: "your-email@example.com",
          to: "company-email@example.com",
          subject: "New Booking Received",
          text: `A new booking has been made by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`
      })
  ]);

        // ADD THE BOOKING ID TO 
      user.bookings.push(addBooking.id)
      await user.save();

    //   SEND A SUCCESS RESPONSE
     res.status(201).json({message: "Booked Successfully"})
    } catch (error) {
       next(error) 
    }
}


export const updateBooking = async (req, res, next) => {
  try {
     // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
     const {error, value} = bookSchema.validate(req.body);
     if (error) {
         return res.status(400).send(error.details[0].message);
       }

     //   GET THE USER ID FROM REQ.USER
       const token = req?.user.id;

     //   FIND THE USER BY ID
       const user = await UserModel.findById(token);
   if (!user) {
     return res.status(404).send("User not found");
   }
    const patchBooking = await BookingModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!patchBooking) {
      return res.status(404).send("Booking not found");
    }

    res.status(200).json({ skill, message: "Updated Successfully" });
  } catch (error) {
    next(error)
}
};

export const deleteBooking = async (req, res, next) => {
  try {
    //   GET THE USER ID FROM REQ.USER
      const token = req?.user.id;

    //   FIND THE USER BY ID
      const user = await UserModel.findById(token);
  if (!user) {
    return res.status(404).send("User not found");
  }

    const booking = await BookingModel.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    await Promise.all([
      mailTransport.sendMail({
          from: "your-email@example.com",
          to: value.email,
          subject: "Booking Cancelled Confirmation",
          text: `Dear ${value.fullName},\n\nYour booking has been cancelled successfully.\n\nThank you!`
      }),
      mailTransport.sendMail({
          from: "your-email@example.com",
          to: "company-email@example.com",
          subject: "Booking Cancelled",
          text: `A booking has been cancelled by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`
      })
  ]);

    user.bookings.pull(req.params.id);
    await user.save();
    res.status(200).json({ booking, message: "Deleted Successfully" });
  } catch (error) {
    next(error)
  }
};
