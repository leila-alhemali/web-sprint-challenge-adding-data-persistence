// build your `/api/projects` router here
const router = require("express").Router();
const Project = require("./model");

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    customMessage: "something went wrong inside the projects router",
    message: err.message,
    stack: err.stack,
  });
});

router.get("/", (req, res, next) => {
  Project.getProjects()
    .then((projects) => {
      let resp = projects.map((project) => {
        return {
          project_name: project.project_name,
          project_description: project.project_description,
          project_completed: Boolean(project.project_completed),
        };
      });
      res.status(200).json(resp);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Project.createProject(req.body)
    .then((newProject) => {
      let resp = {
        project_name: newProject.project_name,
        project_description: newProject.project_description,
        project_completed: Boolean(newProject.project_completed),
      };
      res.status(200).json(resp);
    })
    .catch(next);
});

module.exports = router;

