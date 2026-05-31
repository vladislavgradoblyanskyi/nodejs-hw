import mongoose from 'mongoose';
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
      enum: ['Work','Personal','Meeting','Shopping','Ideas','Travel','Finance','Health','Important','Todo',],
    },

  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Note', noteSchema);
