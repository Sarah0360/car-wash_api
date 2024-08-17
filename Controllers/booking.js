import { BookingModel } from "../Models/booking.js";
import { bookSchema } from "../Schema/booking.js";
import { UserModel } from "../Models/user.js";
import { CompanyModel } from "../Models/services.js";
import { mailTransport } from "../config/mail.js";



export const postBooking = async (req, res, next) => {
  try {
    const {error, value} = bookSchema.validate(req.body);
    if (error){
      return res.status(400).send(error.details[0].message);
    }
    const token = req.user?.id;
    const user = await UserModel.findById(token);
    if (!user) {
      return res.status(404).send("User Not Found"); 
    }
    const booking = await BookingModel.create({...value, user: token});

      user.booking.push(booking.id);
       await user.save();
       
       const company = await CompanyModel.findOne({ email: req.body.email });
       if (!company) {
        return res.status(404).send("Company Not Found");
      }
         //SEND A BOOKING EMAIL To THE USER AND COMPANY
    
      await mailTransport.sendMail({
            to: value.email,
            subject: "Booking Confirmation",
            text: `Dear ${value.fullName},\n\nYour booking has been successfully created for ${value.typeOfService}.\n\nThank you!`
        })

       await mailTransport.sendMail({
          to: company.email,
            subject: "New Booking Received",
            text: `A new booking has been made by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`
        }); 

  res.status(201).send("Booking Created Successfully");

  } catch (error) {
    next (error)
  }
};


export const updateBooking = async (req, res, next) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const bookingId = req.params.id; // Assuming the booking ID is passed as a URL parameter
    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      return res.status(404).send("Booking Not Found");
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).send("You do not have permission to update this booking");
    }

    // Update the booking with new values
    Object.assign(booking, value);
    await booking.save();

    const company = await CompanyModel.findOne({ email: booking.companyEmail });
    if (!company) {
      return res.status(404).send("Company Not Found");
    }

    try {
      // Send updated booking emails to both the user and the company
      await Promise.all([
        mailTransport.sendMail({
          to: value.email,
          subject: "Booking Updated",
          text: `Dear ${value.fullName},\n\nYour booking has been successfully updated.\n\nThank you!`,
        }),
        mailTransport.sendMail({
          to: company.email,
          subject: "Booking Updated",
          text: `A booking has been updated by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`,
        }),
      ]);

      res.status(200).send("Booking updated successfully and emails sent.");
    } catch (emailError) {
      console.error("Failed to send update emails:", emailError);
      res.status(500).send("Booking updated but failed to send emails.");
    }
  } catch (error) {
    next(error);
  }
};



export const cancelBooking = async (req, res, next) => {
  try {
    const token = req.user?.id;
    const user = await UserModel.findById(token); 
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    const booking = await BookingModel.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking Not Found")
    }
    user.bookings.pull(req.params.id)
    await user.save();

    const company = await CompanyModel.findOne({ email: booking.companyEmail });
    if (!company) {
      return res.status(404).send("Company Not Found");
    }
    try {
      // Send deletion emails to both the user and the company
      await Promise.all([
        mailTransport.sendMail({
          to: booking.email,
          subject: "Booking Cancellation",
          text: `Dear ${booking.fullName},\n\nYour booking has been successfully cancelled.\n\nThank you!`,
        }),
        mailTransport.sendMail({
          to: company.email,
          subject: "Booking Cancelled",
          text: `A booking by ${booking.fullName} has been cancelled.\n\nDetails:\n\n${JSON.stringify(booking, null, 2)}`,
        }),
      ]);

      res.status(200).send("Booking deleted successfully and emails sent.");
    } catch (emailError) {
      console.error("Failed to send cancellation emails:", emailError);
      res.status(500).send("Booking deleted but failed to send emails.");
    }
  } catch (error) {
    next(error)
  }
}


// export const booking = async (req, res, next) => {
//     try {
//         // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
//         const {error, value} = bookSchema.validate(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//           }
//         //   GET THE USER ID FROM REQ.USER
//           const token = req?.user.id;
//         //   FIND THE USER BY ID
//           const user = await UserModel.findById(token);
//       if (!user) {
//         return res.status(404).send("User not found");
//       }

//       const company = await CompanyModel.validate(req.body);
    
//     //   CREATE A NEW BOOKING ASSOCIATED WITH THE USER
//       const addBooking = await BookingModel.create({ ...value, user: token });
//     //   SEND A BOOKING EMAIL To THE USER AND COMPANY
//     await Promise.all([
//       mailTransport.sendMail({
//           to: value.email,
//           subject: "Booking Confirmation",
//           text: `Dear ${value.fullName},\n\nYour booking has been successfully created.\n\nThank you!`
//       }),
//       mailTransport.sendMail({
//         to: company.email,
//           subject: "New Booking Received",
//           text: `A new booking has been made by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`
//       })
//   ]);

//         // ADD THE BOOKING ID TO
//         company.bookings.push(addBooking.id) 
//         await company.save();
//       user.bookings.push(addBooking.id)
//       await user.save();

//     //   SEND A SUCCESS RESPONSE
//      res.status(201).json({message: "Booked Successfully"})
//     } catch (error) {
//        next(error) 
//     }
// }


// export const updateBooking = async (req, res, next) => {
//   try {
//      // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
//      const {error, value} = bookSchema.validate(req.body);
//      if (error) {
//          return res.status(400).send(error.details[0].message);
//        }

//      //   GET THE USER ID FROM REQ.USER
//        const token = req?.user.id;

//      //   FIND THE USER BY ID
//        const user = await UserModel.findById(token);
//    if (!user) {
//      return res.status(404).send("User not found");
//    }
//     const patchBooking = await BookingModel.findByIdAndUpdate(req.params.id, value, {
//       new: true,
//     });
//     if (!patchBooking) {
//       return res.status(404).send("Booking not found");
//     }

//     res.status(200).json({ skill, message: "Updated Successfully" });
//   } catch (error) {
//     next(error)
// }
// };

// export const deleteBooking = async (req, res, next) => {
//   try {
//     //   GET THE USER ID FROM REQ.USER
//       const token = req?.user.id;

//     //   FIND THE USER BY ID
//       const user = await UserModel.findById(token);
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   const booking = await BookingModel.findById(req.params.id);
//         if (!booking) {
//             return res.status(404).send("Booking not found");
//         }
// // FIND THE COMPANY BY ID (assuming company ID is passed in the request body)
// const company = await CompanyModel.find(req.body);
// if (!company) {
//     return res.status(404).send("Company not found");
// }
//     await Promise.all([
//       mailTransport.sendMail({
//         to: value.email,
//           subject: "Booking Cancelled Confirmation",
//           text: `Dear ${value.fullName},\n\nYour booking has been cancelled successfully.\n\nThank you!`
//       }),
//       mailTransport.sendMail({
//         to: company.email,
//           subject: "Booking Cancelled",
//           text: `A booking has been cancelled by ${value.fullName}.\n\nDetails:\n\n${JSON.stringify(value, null, 2)}`
//       })
//   ]);
//   company.bookings.pull(req.params.id);
//         await company.save();

//     user.bookings.pull(req.params.id);
//     await user.save();

//     await BookingModel.findByIdAndDelete(req.params.id);

//     res.status(200).json({ booking, message: "Deleted Successfully" });
//   } catch (error) {
//     next(error)
//   }
// };
