import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  githubUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
    required: false,
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

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema); 