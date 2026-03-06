import {
  HydratedDocument,
  Model,
  Schema,
  Types,
  model,
  models,
} from "mongoose";
import Event from "./event.model";

export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type BookingModel = Model<IBooking>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Invalid email format.",
      },
    },
  },
  { timestamps: true }
);

bookingSchema.index({ eventId: 1 });

bookingSchema.pre("save", async function (this: HydratedDocument<IBooking>) {
  // Validate referential integrity before persisting a booking.
  if (this.isModified("eventId") || this.isNew) {
    const existingEvent = await Event.exists({ _id: this.eventId });
    if (!existingEvent) {
      throw new Error("Referenced event does not exist.");
    }
  }

  // Enforce valid email formatting even if value changed after assignment.
  if (!emailRegex.test(this.email)) {
    throw new Error("Invalid email format.");
  }
});

const Booking =
  (models.Booking as BookingModel | undefined) ??
  model<IBooking, BookingModel>("Booking", bookingSchema);

export default Booking;
