import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Other'],
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  icon: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema); 