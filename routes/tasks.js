const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) { return res.status(500).json({ error: err }); }

    res.status(200).json({ tasks: tasks, message: 'Here are the tasks' });
  });
});

router.post('/', (req, res) => {
  if (req.body.task) {
    const newTask = req.body.task;
    
    return Task.create(newTask, (err, task) => {
      if (err) { return res.status(500).json({ error: err }); }

      res.status(200).json({ message: 'Resource created', data: task });
    });
  }
  return res.status(500).json({ error: 'Task is mandatory' });
});

router.patch('/:taskId', (req, res) => {
  if (!req.params.taskId) {
    return res.status(500).json({ error: 'Task is mandatory' });
  }
  
  const status = req.body.status;
  const timer = req.body.timer;
  console.log('status is => ', status);
  Task.findOneAndUpdate({ _id: req.params.taskId }, { status: status, timer: timer } , (err, task) => {
    if (err) { return res.status(500).json({ error: err }); }
    // not 204 since we need to get the resource back in client logic
    res.status(200).json({ message: 'Resource updated', data: task });
  })
});

router.delete('/:taskId', (req, res) => {
  if (!req.params.taskId) {
    return res.status(500).json({ error: 'Task is mandatory' });
  }

  const taskId = req.params.taskId;
  Task.findByIdAndRemove({ _id: taskId } , (err, task) => {
    if (err) { return res.status(500).json({ error: err }); }

    res.status(200).json({ message: 'Resource deleted', data: task });
  })
});

module.exports = router;