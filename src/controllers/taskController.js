const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  const { id } = req.user;
  try {
    const tasks = await Task.find({ createdBy: id }, { createdBy: 0 });
    res.status(200).json(tasks);
  } catch (err) {
    console.log('Fetch all task error', err);
    res.status(400).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id }, { createdBy: 0 });
    res.status(200).json(task);
  } catch (err) {
    console.log('Fetch task error', err);
    res.status(400).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;
  if (!title) return res.status(400).json({ message: 'title is required' });
  try {
    await Task.insertOne({ createdBy: id, title, description });
    res.status(200).json({ message: 'task added successfully' });
  } catch (err) {
    console.log('Insert task error', err);
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'task id is required' });
  try {
    await Task.updateOne({ _id: id }, { title, description });
    res.status(200).json({ message: 'task updated successfully' });
  } catch (err) {
    console.log('Update task error', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: 'task deleted successfully' });
  } catch (err) {
    console.log('Delete task error', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
