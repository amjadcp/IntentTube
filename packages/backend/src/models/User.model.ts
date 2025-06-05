import mongoose, { Document, Schema } from 'mongoose';

export interface ISelectedChannel {
  channelId: string;
  title: string;
  thumbnail: string;
}

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
  selectedChannels: ISelectedChannel[];
  createdAt: Date;
  updatedAt: Date;
}

const SelectedChannelSchema = new Schema<ISelectedChannel>({
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    selectedChannels: { type: [SelectedChannelSchema], default: [] },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema); 