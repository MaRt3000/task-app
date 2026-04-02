import express from 'express';

const tasks = [
  { id: 1, title: 'Task 1', completed: false, description: 'This is the first task' },
  { id: 2, title: 'Task 2', completed: true, description: 'This is the second task' },
  { id: 3, title: 'Task 3', completed: false, description: 'This is the third task' },
  { id: 4, title: 'Task 4', completed: true, description: 'This is the fourth task' },
  { id: 5, title: 'Task 5', completed: false, description: 'This is the fifth task' },
];

const app = express();
const PORT = 3000;

app.get('/api/v1/tasks', (req, res) => {
  res.json({
     message: 'Welcome to the Task App API!',
    data: {
      tasks: tasks
    },
  });
});

app.post('/api/v1/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json({
        message: 'Task created successfully!',
        data: {
            task: newTask
        }
    });
});

app.patch('/api/v1/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json({
        message: 'Task updated successfully!',
        data: {
            task
        }
    });
});

app.delete('/api/v1/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
    tasks.splice(taskIndex, 1);
    res.json({
        message: 'Task deleted successfully!'
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 