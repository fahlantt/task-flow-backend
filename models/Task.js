import Task from '../models/Task.js';

const createTask = async (req, res) => {
  try {
    const { title, due_date } = req.body;
    const userId = req.user.id;

    const task = await Task.create({ userId, title, dueDate: due_date });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat tugas', error: err.message });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      where: { userId },
      order: [['dueDate', 'ASC']],
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil tugas', error: err.message });
  }
};
