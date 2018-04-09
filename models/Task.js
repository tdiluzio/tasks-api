const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: { type: String, required: true, default: 'A task title ' },
  description: { type: String, required: true, default: 'A sample description', },
  status: { type: String, required: true, default: 'Unstarted' },
  timer: { type: Number, default: 0 },
  created_at: { type: Date, default: new Date() },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
