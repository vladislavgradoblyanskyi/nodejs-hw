import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';
const { Schema } = mongoose;
export const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content:{
      type:String,
      required: false,
      trim:true,
      default: '',
    },
    tag: {
      type:String,
      required:false,
      default: 'Todo',
      enum: TAGS,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Note', noteSchema);
