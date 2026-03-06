import {
  HydratedDocument,
  Model,
  Schema,
  model,
  models,
} from "mongoose";

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

type EventModel = Model<IEvent>;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeTime = (value: string): string => {
  const time = value.trim().toLowerCase();
  const ampmMatch = /^(\d{1,2}):(\d{2})\s?(am|pm)$/.exec(time);
  if (ampmMatch) {
    let hours = Number(ampmMatch[1]);
    const minutes = Number(ampmMatch[2]);
    const period = ampmMatch[3];

    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      throw new Error("Invalid time format.");
    }

    if (period === "am") {
      hours = hours === 12 ? 0 : hours;
    } else {
      hours = hours === 12 ? 12 : hours + 12;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const twentyFourHourMatch = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  throw new Error("Invalid time format.");
};

const eventSchema = new Schema<IEvent, EventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0),
        message: "Agenda must contain at least one non-empty item.",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0),
        message: "Tags must contain at least one non-empty item.",
      },
    },
  },
  { timestamps: true }
);

eventSchema.index({ slug: 1 }, { unique: true });

eventSchema.pre("save", function (this: HydratedDocument<IEvent>) {
  const requiredStringFields: Array<keyof IEvent> = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  for (const field of requiredStringFields) {
    const value = this[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(`${String(field)} is required and cannot be empty.`);
    }
  }

  if (this.isModified("title") || !this.slug) {
    // Keep slug synced with title only when title changes.
    this.slug = slugify(this.title);
  }

  if (this.isModified("date")) {
    // Store date in ISO-8601 format for consistent reads.
    const parsedDate = new Date(this.date);
    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format.");
    }
    this.date = parsedDate.toISOString();
  }

  if (this.isModified("time")) {
    // Normalize time to 24-hour HH:mm format.
    this.time = normalizeTime(this.time);
  }
});

const Event =
  (models.Event as EventModel | undefined) ??
  model<IEvent, EventModel>("Event", eventSchema);

export default Event;
