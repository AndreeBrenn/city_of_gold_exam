const { Tasks_tbl } = require("../models");

const create_task = async (req, res) => {
  const taskData = req.body;

  try {
    const result = await Tasks_tbl.create({
      Task_by: req.user.ID,
      Description: taskData.Description,
      Status: false,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const update_task = async (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  try {
    await Tasks_tbl.update(
      {
        Description: taskData.Description,
        Status: taskData.Status,
      },
      { where: { ID: id } }
    );

    const result = await Tasks_tbl.findAll({ where: { Task_by: req.user.ID } });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const get_task = async (req, res) => {
  try {
    const result = await Tasks_tbl.findAll({ where: { Task_by: req.user.ID } });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const delete_task = async (req, res) => {
  const { id } = req.params;

  try {
    await Tasks_tbl.destroy({ where: { ID: id } });

    const result = await Tasks_tbl.findAll({ where: { Task_by: req.user.ID } });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  create_task,
  update_task,
  get_task,
  delete_task,
};
