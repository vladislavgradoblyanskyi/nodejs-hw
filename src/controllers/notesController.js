import createHttpError from 'http-errors';
import  Note  from '../models/note.js';
//get
export const getAllNotes = async (req,res) =>{
  const { _id: userId } = req.user;
  const {page=1,perPage=15,tag,search} = req.query;
  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();
  if (userId) {
    notesQuery.where('userId').equals(userId);
  }
  if(search){
    notesQuery.where({
  $or: [
    { title: { $regex: search, $options: 'i' } },
    { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

   const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({page,perPage,totalNotes,totalPages,notes,});
};

export const getNoteById = async(req,res)=>{
  const {noteId} = req.params;
  const { _id: userId } = req.user;
  const note = await Note.findOne({ _id: noteId, userId });
  if(!note){
    throw createHttpError(404, `Note not found`);
  }
  res.status(200).json(note);
};
//post
export const createNote = async (req,res) =>{
  const note = await Note.create({...req.body,userId: req.user._id,});
  res.status(201).json(note);
};
//delete
export const deleteNote = async (req,res) =>{
  const {noteId} = req.params;
  const { _id: userId } = req.user;
  const note = await Note.findOneAndDelete({_id: noteId,userId});
  if(!note){
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
};
//patch
export const updateNote = async (req,res) =>{
  const {noteId} = req.params;
  const { _id: userId } = req.user;
  const note = await Note.findOneAndUpdate({ _id: noteId,userId },req.body, { returnDocument: "after" },);
  if(!note){
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
};
