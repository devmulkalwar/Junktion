const { body, validationResult } = require('express-validator');

// Register validation
exports.validateRegister = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters or more'),
  body('address').isLength({ min: 50 }).withMessage("Please enter valid address"),
  body("mobileNumber").isLength({ min:10, max:10}).withMessage("Please enter a valid mobile number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
