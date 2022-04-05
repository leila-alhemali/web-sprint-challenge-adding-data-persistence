// build your `/api/tasks` router here
const router = require("express").Router();
const Task = require("./model");
const Project = require("../project/model");

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    customMessage: "something went wrong inside the recipes router",
    message: err.message,
    stack: err.stack,
  });
});


router.get("/", async (req, res, next) => {
  try {
    let tasks = await Task.getTasks();
    let projects = await Project.getProjects();
    let newTaskList = [];
    for (const task of tasks) {
      let projectForTask = projects.find(
        (item) => item.project_id === task.project_id
      );
      console.log(task)
      if (projectForTask) {
        newTaskList.push({
       
          task_id: task.task_id,
          task_description: task.task_description,
          task_notes: task.task_notes,
          task_completed: Boolean(task.task_completed),
          project_name: projectForTask.project_name,
          project_description: projectForTask.project_description,
        });
      } else {
        newTaskList.push(task);
      }
    }
    res.status(200).json(newTaskList);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  Task.createTask(req.body)
    .then((newTask) => {
      let resp = {
        ...newTask,
        task_completed: Boolean(newTask.task_completed),
      };
      res.status(200).json(resp);
    })
    .catch(next);
});

module.exports = router;
