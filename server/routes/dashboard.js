import express from 'express'
const dashboardRouter = express.Router();
dashboardRouter.get("/dashboard", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "My dashboard",
      content: "dashboard content",
      user: req.user, // token payload information
    },
  });
});

export default dashboardRouter