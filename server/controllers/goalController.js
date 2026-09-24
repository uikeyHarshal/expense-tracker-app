import Goal from '../models/Goal.js';

// @desc    Get all savings goals for logged in user
// @route   GET /api/goals
// @access  Private
export const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ deadline: 1 });

    const formattedGoals = goals.map((g) => {
      const percentage = Math.min(
        100,
        Math.round((g.currentAmount / g.targetAmount) * 100)
      );
      const isCompleted = g.currentAmount >= g.targetAmount;
      return {
        ...g.toObject(),
        percentage,
        isCompleted,
      };
    });

    res.json({
      success: true,
      count: formattedGoals.length,
      data: formattedGoals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new savings goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req, res, next) => {
  try {
    const { title, targetAmount, currentAmount, deadline, category, color } =
      req.body;

    if (!title || !targetAmount || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, target amount, and target deadline date',
      });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount) || 0,
      deadline: new Date(deadline),
      category: category || 'General Savings',
      color: color || '#6366f1',
    });

    res.status(201).json({
      success: true,
      message: 'Savings goal created successfully',
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a savings goal / add contribution
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req, res, next) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this goal',
      });
    }

    const { title, targetAmount, currentAmount, addAmount, deadline, category, color } =
      req.body;

    if (title !== undefined) goal.title = title;
    if (targetAmount !== undefined) goal.targetAmount = Number(targetAmount);
    if (currentAmount !== undefined) goal.currentAmount = Number(currentAmount);
    if (addAmount !== undefined) goal.currentAmount += Number(addAmount);
    if (deadline !== undefined) goal.deadline = new Date(deadline);
    if (category !== undefined) goal.category = category;
    if (color !== undefined) goal.color = color;

    const updatedGoal = await goal.save();

    res.json({
      success: true,
      message: 'Savings goal updated successfully',
      data: updatedGoal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a savings goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this goal',
      });
    }

    await Goal.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Savings goal deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
