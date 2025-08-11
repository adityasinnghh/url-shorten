import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_code: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  click_count: { type: Number, default: 0 }
});

export default mongoose.model('Url', urlSchema);
