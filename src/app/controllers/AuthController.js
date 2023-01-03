// const catchAsync = require("../../src/utils/catchAsync");
// const Error = require("../utils/Error");
const { ObjectId } = require("mongodb");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const UserModel = require("../models/User");
const CartModel = require("../models/Cart");
const jwt = require("jsonwebtoken");
const Email = require("../../utils/Email");
const { promisify } = require("util");
const crypto = require("crypto");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

// sign in with gg
setTimeout(() => {
  let callbackURL = "http://localhost:3000/admin/google/callback";
  if (process.env.NODE_ENV === "production") {
    callbackURL =
      "https://shy-plum-panda-tutu.cyclic.app/admin/google/callback";
  }
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "10404818075-aso4sluema08vhp7gj4ipgqcio1e9u67.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        const user = await UserModel.findOne({ email: profile.email });

        if (!user) {
          // UserModel.create(
          //   {
          //     email: profile.email,
          //     photo: profile.picture,
          //     active: profile.verified,
          //   },
          //   function (err, user) {
          //     return done(err, user);
          //   }
          // );

          const user = await UserModel.create({
            email: profile.email,
            photo: profile.picture,
            active: profile.verified,
            name: profile.displayName,
            type: "google",
          });

          const cart = await CartModel.create({
            userId: user._id,
            products: [],
          });

          return done(null, user);
        }

        if (user.active) {
          return done(null, user);
        } else {
          return done(new AppError(403, "your account has been banned"), null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  // end sign in with gg
}, 500);

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, req, res, redirect = false) => {
  // 1) create token
  const token = signToken(user._id);

  // 2) add token to cookies
  const cookieOptions = {
    // milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions["secure"] = true;
  }

  res.cookie("jwt", token, cookieOptions);

  // 3) send res through api
  if (!redirect) {
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } else {
    res.redirect("/");
  }
};

exports.signUp = catchAsync(async (req, res, next) => {
  // 1) validate email, password
  const { name, email, password } = req.body;

  if (
    !name ||
    name.trim().length === 0 ||
    !email.trim() ||
    !email.includes("@") ||
    password.length < 6 ||
    !password
  ) {
    return next(new AppError(400, "Invalid name, email and password"));
  }

  // 2) check if email has existed
  const user = await UserModel.findOne({ email });

  if (user) {
    return next(
      new AppError(400, "Email has already existed, please try another email")
    );
  }

  // 3) store user
  const storedUser = await UserModel.create({
    name,
    email,
    password,
  });

  // 3.1) create cart
  const cart = await CartModel.create({
    userId: storedUser._id,
    products: [],
  });

  // 4) send email
  try {
    const verifyToken = storedUser.createVerifyToken();
    await storedUser.save({ validateBeforeSave: false });
    const emailObj = new Email(
      storedUser,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify/${verifyToken}`
    );
    await emailObj.send("WELCOME AND PLEASE VERIFY YOUR EMAIL");
  } catch (err) {
    storedUser.emailVerifyToken = undefined;
    storedUser.emailVerifyTokenExpires = undefined;
    await storedUser.save({ validateBeforeSave: false });

    return next(new AppError(500, err.message));
  }

  // 5) send back to client
  res.status(200).json({
    status: "success",
    data: {
      storedUser,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  // 0) validate email, password
  const { email, password } = req.body;
  if (!email || !email.includes("@") || !password) {
    return next(new AppError(400, "Please provide email and password"));
  }

  // 1) check if user has registered
  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new AppError(400, "this email has not been registered"));
  }

  if (!user.active) {
    return next(
      new AppError(
        400,
        "your account has not been verified, please check our verify email"
      )
    );
  }

  // 2) check if password is correct
  const isCorrectPassword = await user.isCorrectPassword(
    password,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError(400, "password is not correct"));
  }

  // 3) sign user in
  createSendToken(user, req, res);
});

exports.signOut = catchAsync(async (req, res, next) => {
  // 1) replace jwt
  if (req.user.type === "local") {
    const cookieOptions = {
      // expires in 10 mins
      expires: new Date(Date.now() + 10 * 60 * 1000),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions["secure"] = true;
    }

    res.cookie("jwt", "loggedout", cookieOptions);

    res.status(200).json({
      status: "success",
      message: "logout successfully",
    });
  } else {
    req.session.destroy();
    res.status(200).json({
      status: "success",
      message: `logout ${req.user.type} successfully`,
    });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  // log in with gg
  let userLoggedIn = null;
  if (req.user) {
    // res.locals.quantity = cartQuantity;
    userLoggedIn = req.user;
  } else {
    try {
      // 1) check if user has signed in
      let token = null;
      const jsontoken = req.headers.authorization;
      if (jsontoken && jsontoken.startsWith("Bearer")) {
        token = jsontoken.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      // throw error if token is not valid
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // 2) check if user has been deleted
      const user = await UserModel.findOne({ _id: decoded.id });
      if (!user) {
        return next(new AppError(401, "You are not logged in!"));
      }

      // 3) check if user changes password after token has been signed
      const isChangedPassword = user.changePasswordAfter(decoded.iat);

      if (isChangedPassword) {
        return next(
          new AppError(401, "Please log in, Your password has been changed!")
        );
      }

      req.user = user;
      userLoggedIn = user;
    } catch (err) {
      // console.log(err);
      return next(new AppError(500, "you are not logged in please log in"));
    }
  }

  // 4) user has logged in
  //global user for hbs view engine
  const cart = await CartModel.findOne({ userId: userLoggedIn._id });
  let cartQuantity = 0;

  if (cart) {
    cartQuantity = cart.products.length;
  }

  // res.locals.cartQuantity = cartQuantity;
  res.locals.user = userLoggedIn;
  res.locals.quantity = cartQuantity;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  // log in with gg
  let userLoggedIn = null;
  if (req.user) {
    // res.locals.quantity = cartQuantity;
    userLoggedIn = req.user;
  } else {
    try {
      // 1) check if user has signed in
      let token = null;
      const jsontoken = req.headers.authorization;
      if (jsontoken && jsontoken.startsWith("Bearer")) {
        token = jsontoken.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      // throw error if token is not valid
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // 2) check if user has been deleted
      const user = await UserModel.findOne({ _id: decoded.id });
      if (!user) {
        return next();
      }

      // 3) check if user changes password after token has been signed
      const isChangedPassword = user.changePasswordAfter(decoded.iat);

      if (isChangedPassword) {
        return next();
      }
      req.user = user;

      userLoggedIn = user;
    } catch (err) {
      // console.log(err);
      return next();
    }
  }

  // 4) user has logged in
  //global user for hbs view engine
  const cart = await CartModel.findOne({ userId: userLoggedIn._id });
  let cartQuantity = 0;

  if (cart) {
    cartQuantity = cart.products.length;
  }

  // res.locals.cartQuantity = cartQuantity;
  res.locals.user = userLoggedIn;
  res.locals.quantity = cartQuantity;
  next();
};

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    // check if role is valid
    for (const role of roles) {
      if (!["user", "admin"].includes(role)) {
        return next(new AppError(400, "role is either user or admin"));
      }
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "you don't have right to perform this action")
      );
    }

    next();
  });
};

// verify
exports.verifyEmail = catchAsync(async (req, res, next) => {
  // req.params.token
  // 1) get verify token
  const hashedVerifyToken = crypto
    .createHash("sha256")
    .update(req.params.verifyToken)
    .digest("hex");

  // 2) if token has not expired, and there is user, activate account
  const user = await UserModel.findOne({
    emailVerifyToken: hashedVerifyToken,
    emailVerifyTokenExpires: { $gt: Date.now() },
  });

  // 3) select field to save
  user.active = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 4) redirect user to home page
  createSendToken(user, req, res, true);
});

exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1) find user
  const user = await UserModel.findById(req.user._id);
  // 2) check current password
  const isCorrectPassword = await user.isCorrectPassword(
    req.body.currentPassword,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError(400, "current password is not correct"));
  }

  // 3) update password (UserModel.findByIdAndUpdate se khong validate lai nen phai lam cach nay)
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.checkEmailExist = catchAsync(async function (req, res, next) {
  // 1) check valid email
  if (validateEmail(req.body.email)) {
    // 1) find user
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      return next(new AppError(400, "email has already existed"));
    }

    return res.status(200).json({
      status: "success",
    });
  }

  res.status(400).json({
    status: "fail",
    message: "email không hợp lệ",
  });
});
