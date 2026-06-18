import {model,Schema} from 'mongoose';

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    accesToken:{
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required:true,
    },
    accesTokenValidUntil:{
      type: Date,
      required: true,
    },
    refreshTokenValidUntil:{
      type: Date,
      required: true,
    },
  },
  {timestamps: true},
);


export const Session = model('Session',SessionSchema);
