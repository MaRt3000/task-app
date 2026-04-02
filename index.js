import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/v1/tasks', (req, res) => {
  res.json({
     message: 'Welcome to the Task App API!',
    data: {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 