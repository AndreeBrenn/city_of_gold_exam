const express = require("express");
const { protect } = require("../middleware/protected");
const {
  create_task,
  update_task,
  get_task,
  delete_task,
} = require("../controllers/TaskController");
const router = express.Router();

router.post("/todos", protect, create_task);
router.put("/todos/:id", protect, update_task);
router.get("/todos", protect, get_task);
router.delete("/todos/:id", protect, delete_task);

module.exports = router;
