import {model,Schema} from 'mongoose';

export const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    accessToken:{
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required:true,
    },
    accessTokenValidUntil:{
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


export default model('Session',SessionSchema);
