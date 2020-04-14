const express = require("express");
const router = express.Router();
const add_books_category = require("../Db/Addbookscategory");
const add_notes_category = require("../Db/Addnotescategory");
const admin = require("../Db/admin");
const science = require("../Db/books_category/science");
const history = require("../Db/books_category/history");
const action_adventure = require("../Db/books_category/action and adventure");
const biographies = require("../Db/books_category/biographies");
const children = require("../Db/books_category/children");
const drama_comics = require("../Db/books_category/drama and comics");
const horror = require("../Db/books_category/horror");
const math = require("../Db/books_category/math");
const poetry = require("../Db/books_category/poetry");
const tech = require("../Db/books_category/tech");
const travel = require("../Db/books_category/travel");
const business = require("../Db/books_category/business");
const sports = require("../Db/books_category/sports");
const health_fitness = require("../Db/books_category/health and fitness");
const user_account = require("../Db/user_account");
const user_cart = require("../Db/cart");
const user_wishlist = require("../Db/wishlist");
const user_order = require("../Db/order");
const noteModel = require("../Db/addnotes");
const computer = require("../Db/notes_category/computer");
const civil = require("../Db/notes_category/civil");
const multer = require("multer");
const multerN = require("multer");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let DIR = "./server_images";
let NDIR = "./notes_data";

/*===========Code block for data uploading of notes===============*/
let storageN = multerN.diskStorage({
  destination: function (req, file, cb) {
    cb(null, NDIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
let uploadN = multerN({ storage: storageN }).single("File");

/*Code block for muler for image uploading of a books*/
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
let upload = multer({ storage: storage }).single("Image");

/*Code block for node mailer host */
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "freebookstoreitg@gmail.com",
    pass: "fcoxlamdnoyialhv",
  },
});

// this code is for verify a user
//middlewere function to check token is null or not
function verfytoken(req, res, next) {
  let temptoken = req.body.token;
  if (temptoken !== "null") {
    req.token = temptoken;
    //call middlewere
    next();
  } else {
    res.json({ errr: 1, "u dont have token": 1 });
  }
}

//this route is for admin login
router.post("/api/admin_login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const pass = bcrypt.hashSync(password, 10);
  admin.findOne({ email: email }, (err, data) => {
    if (err || data == null) {
      res.json({ msg: "you are not admin", err: "account" });
    } else {
      bcrypt.compare(password, data.password, function (err, pdata) {
        if (pdata == false) {
          res.json({ msg: "password not Match", err: "pass" });
        } else {
          res.json({ err: 0, data: data });
        }
      });
    }
  });
});

/*========This api route is for save a category in database */
router.post("/api/addbookscategory", function (req, res) {
  const category = req.body.category;
  let ins = new add_books_category({ category: category }); // to save value in data base it save dynamically create new schema
  // inside this theri is two value
  ins.save(function (err) {
    if (err) {
      res.json({ err: 1, msg: "some error" });
    } else {
      res.json({ err: 0, msg: "save" });
    }
  });
});

/*=================this route is for fatch a category==================== */
router.get("/api/getcategory", function (req, res) {
  add_books_category.find({}, function (err, data) {
    if (err) {
      res.json({ err: 1, data: "some error is occur to fatch category" });
    } else {
      res.json({ err: 0, cdata: data });
    }
  });
});

/*============This route is for delete a category========================== */
router.post("/api/delete_category", function (req, res) {
  const delete_cat_name = req.body.category;
  add_books_category.deleteOne({ category: delete_cat_name }, function (err) {
    if (err) {
      res.json({ err: 1, msg: "already delete" });
    } else {
      res.json({ err: 0, msg: "delete" });
    }
  });
});

/* this route is for save books according to their category */
router.post("/api/new_books_save", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let name = req.body.name;
      let Category = req.body.category;
      let Price = req.body.price;
      let Writer = req.body.writer;
      let Edition = req.body.edition;
      let Published_year = req.body.published_year;
      let current_Price = req.body.current_price;
      let Image = req.file.filename;

      switch (Category) {
        case "science":
          // to save value in data base it save dynamically create new schema
          // inside this theri is two value
          let ins = new science({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          ins.save(function (err) {
            if (err) {
              res.json({ err: 2, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "science" });
            }
          });
          break;

        case "math":
          let math_books = new math({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          math_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "science" });
            }
          });
          break;

        case "drama and comics":
          let drama_comics_books = new drama_comics({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          drama_comics_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "drama and comics" });
            }
          });
          break;

        case "action and adventure":
          let action_adventure_books = new action_adventure({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          action_adventure_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "action and adventure" });
            }
          });
          break;

        case "horror":
          let horror_books = new horror({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          horror_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "horror" });
            }
          });
          break;

        case "travel":
          let travel_books = new travel({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          travel_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "travel" });
            }
          });
          break;

        case "children":
          let children_books = new children({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          children_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "children" });
            }
          });
          break;

        case "biographies":
          let biographies_books = new biographies({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          biographies_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "Biographies" });
            }
          });
          break;

        case "history":
          let history_books = new history({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          history_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "history" });
            }
          });
          break;

        case "business":
          let business_books = new business({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          business_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "business" });
            }
          });
          break;

        case "tech":
          let tech_books = new tech({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          tech_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "tech" });
            }
          });
          break;

        case "sports":
          let sports_books = new sports({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          sports_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "sports" });
            }
          });
          break;

        case "health and fitness":
          let health_fitness_books = new health_fitness({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          health_fitness_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "health and fitness" });
            }
          });
          break;

        case "poetry":
          let poetry_books = new poetry({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          poetry_books.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "poetry" });
            }
          });
          break;

        default:
          res.json({ err: 1, category: "cat not find" });
      }
    }
  });
});

/*This route is for to get books details */
router.get("/api/get_books_details/:data", function (req, res) {
  const cat_name = req.params.data;

  switch (cat_name) {
    case "science":
      science.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "math":
      math.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "action and adventure":
      action_adventure.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;
    case "biographies":
      biographies.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "business":
      business.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "children":
      children.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "drama and comics":
      drama_comics.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "health and fitness":
      health_fitness.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "history":
      history.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "horror":
      horror.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "poetry":
      poetry.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "sports":
      sports.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    case "tech":
      tech.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;
    case "travel":
      travel.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "seome erroe is occur to fatch category" });
        } else {
          res.json({ err: 0, cdata: data });
        }
      });
      break;

    default:
      res.json({
        err: 1,
        msg: "category not found in database or in switch case",
      });
  }
});

/*This route is for delete a books */
router.get("/api/delete_books_details/:id/:cat", function (req, res) {
  const Id = req.params.id;
  const category = req.params.cat;
  switch (category) {
    case "science":
      science.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1, msg: "already delete Refresh" });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "action and adventure":
      action_adventure.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "biographies":
      biographies.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "business":
      business.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "children":
      children.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "drama_comiscs":
      drama_comics.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "health_fitness":
      health_fitness.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "history":
      history.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "horror":
      horror.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "math":
      math.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "poetry":
      poetry.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "sports":
      sports.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "tech":
      tech.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    case "travel":
      travel.deleteOne({ _id: Id }, function (err) {
        if (err) {
          res.json({ err: 1 });
        } else {
          res.json({ err: 0, msg: "delete" });
        }
      });
      break;

    default:
      res.json({ err: 1, msg: "cat not find" });
  }
});

/*This route is for verify email sending mail */
router.post("/api/create_user", function (req, res) {
  const uemail = req.body.email;
  //otp gernate function
  const temp = function () {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const pin = temp();
  //Otp gernate function end

  //function for send a mail;
  var mailOptions = {
    from: "mohmadsabban123@gmail.com",
    to: uemail,
    subject: "Books_Store.com",
    text: `your otp is${pin}`,
    html: `<div style="width:40%,height:40%,border:2px solid black">
    <h1>Your OTP</h1>${pin}</div>`,
  };

  // sendmail function call
  user_account.findOne({ email: uemail }, (err, data) => {
    if (data != null) {
      res.json({ err: 1, msg: "already found" });
    } else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ err: 2, email: "not a valid email" });
        } else {
          res.json({ err: 0, email: "mailsend", pin: pin });
        }
      });
    }
  });
});

/*THis is jwt route and save data */
router.post("/api/auth_user", function (req, res) {
  const uname = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const state = req.body.state;
  const pass = bcrypt.hashSync(password, 10);
  const utoken = { email: email, name: uname, password: pass };
  let user = new user_account({
    name: uname,
    email: email,
    password: pass,
    contact: contact,
    address: address,
    pincode: pincode,
    state: state,
  });
  user.save(function (err) {
    if (err) {
      res.json({ err: "db", msg: "some error" });
    } else {
      jwt.sign({ utoken }, "secretkey", function (err, token) {
        if (err) {
          res.json({ err: "jwt", msg: "jwt" });
        } else {
          // token send to angular server
          res.json({ token: token, email: email });
        }
      });
    }
  });
});

/*=====THis route is for showing a best seller books in front end */
router.get("/api/best_seller", function (req, res) {
  science.find({}, function (err, data) {
    if (err) {
      res.json({ err: 1, data: "seome erroe is occur to fatch category" });
    } else {
      res.json({ err: 0, cdata: data });
    }
  });
});

/*This route is for login */
router.post("/api/login", function (req, res) {
  const email = req.body.email;
  const contact = req.body.contact;
  const password = req.body.password;
  user_account.findOne({ email: email, contact: contact }, function (
    err,
    data
  ) {
    /*When email and contact not found in database it give not found error */
    if (err) {
      res.json({ err: "404", data: "Account not found" });
    } else if (data == null) {
      res.json({ err: "404", msg: "account not found" });
    } else {
      /*When email and contact found then compair password */
      bcrypt.compare(password, data.password, function (err, pdata) {
        /*Utoken is for gernating a token data object is come when email and contact match */
        const utoken = {
          email: data.email,
          name: data.name,
          password: data.password,
        };

        /*Return false when password not match */
        if (pdata == false) {
          res.json({ err: "notmatch", msg: "not match" });
        } else {
          /*Return true when password match and now we send a token */
          jwt.sign({ utoken }, "secretkey", function (err, token) {
            if (err) {
              res.json({ err: "jwt", msg: "jwt" });
            } else {
              // token send to angular server
              res.json({ token: token, email: email });
            }
          });
        }
      });
    }
  });
});

/*This route is for to check mail and send otp */
router.post("/api/forget_pass", function (req, res) {
  let mail = req.body.email;

  user_account.findOne({ email: mail }, function (err, data) {
    if (err) {
      res.json({ err: "404", msg: "account not found" });
    } else if (data == null) {
      res.json({ err: "404", msg: "account not found" });
    } else {
      //otp gernate function
      const temp = function () {
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };
      const pin = temp();
      //Otp gernate function end

      //function for send a mail;
      var mailOptions = {
        from: "mohmadsabban123@gmail.com",
        to: mail,
        subject: "Books_Store.com",
        text: `your otp is${pin}`,
        html: `<div style="width:40%,height:40%,border:2px solid black">
        <h1>Your OTP</h1>${pin}</div>`,
      };
      //sendmail function call
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ err: "404", email: "not a valid email" });
        } else {
          res.json({ err: 0, email: mail, pin: pin });
        }
      });
    }
  });
});

/*This route is for set new password */
router.post("/api/update_password", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const pass = bcrypt.hashSync(password, 10);
  user_account.updateOne(
    { email: email },
    { $set: { password: pass } },
    function (err, data) {
      if (err) {
        res.json({ err: "404" });
      } else if (data.ok == 0) {
        res.json({ err: "404" });
      } else {
        res.json({ err: 0 });
      }
    }
  );
});

/*This route is for save cart item */
router.post("/api/cart_data", verfytoken, function (req, res) {
  const name = req.body.name;
  const image = req.body.image;
  const writer = req.body.writer;
  const price = req.body.price;
  const email = req.body.email;
  const key = name + email;
  const quantity = req.body.quantity;
  jwt.verify(req.token, "secretkey", function (err) {
    if (err) {
      res.json({ err: "token_error" });
    } else {
      let cart = new user_cart({
        email: email,
        name: name,
        current_price: price,
        image: image,
        writer: writer,
        key: key,
        quantity: quantity,
      });

      cart.save(function (err, data) {
        if (err) {
          res.json({ err: 1, msg: "connection error" });
        } else {
          res.json({ err: 0, msg: "add", data: data });
        }
      });
    }
  });
});

/*This route is for save wishlist item */
router.post("/api/wishlist_data", verfytoken, function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const price = req.body.price;
  const key = name + email; // Make a unique key
  const image = req.body.image;
  const writer = req.body.writer;
  // res.json({ data: key });
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.json({ err: 1, msg: "token err" });
    } else {
      let user = new user_wishlist({
        email: email,
        key: key,
        name: name,
        price: price,
        writer: writer,
        image: image,
      });
      user.save((err, data) => {
        if (err) {
          res.json({ err: 2, msg: "alredy found" });
        } else {
          res.json({ err: 0, data: data, key: key });
        }
      });
    }
  });
});

/*THis route is for fetch wishlist item */
router.get("/api/fetch_wishlist/:email", function (req, res) {
  const email = req.params.email;

  user_wishlist.find({ email: email }, (err, data) => {
    if (data == null) {
      res.json({ err: 1, msg: "Empty cart" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// THis route is for remove item from wish list

router.get("/api/remove_wishlist_item/:id", (req, res) => {
  const id = req.params.id;
  user_wishlist.deleteOne({ _id: id }, (err, data) => {
    if (err || data.deletedCount == 0) {
      res.json({ err: 1, msg: "Item not is cart please refresh" });
    } else {
      res.json({ err: 0, msg: "item delete" });
    }
  });
});

// this route is for fetch cart
router.get("/api/fetch_cart/:email", function (req, res) {
  const email = req.params.email;
  user_cart.find({ email: email }, function (err, data) {
    if (data == null) {
      res.json({ err: 1, msg: "empty cart" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// this route is for remove item form cart
router.get("/api/remove_item__user/:id", function (req, res) {
  const id = req.params.id;
  user_cart.deleteOne({ _id: id }, function (err, data) {
    if (data == null) {
      res.json({ err: "404" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// this route is for get user info using email id
router.get("/api/user_info/:id", function (req, res) {
  const id = req.params.id;
  user_account.find({ email: id }, function (err, data) {
    if (err) {
      res.json({ err: 1, data: err });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

//  This route is for Get all User
router.get("/api/get_all_user", (req, res) => {
  user_account.find({}, (err, data) => {
    if (err != null) {
      res.json({ err: 1, msg: "Something Wrong" });
    } else if (data == null) {
      res.json({ err: 2, msg: "Account Table Empty" });
    } else {
      res.json({ err: 0, data: data, msg: "get Account" });
    }
  });
});

// this Route is for store order
router.post("/api/order/:email", function (req, res) {
  const info = req.body.data;
  const total = req.body.total;
  let name = [];
  let price = [];
  let image = [];
  const email = req.params.email;
  info.forEach((c) => {
    name.push(c.name);
    price.push(c.current_price);
    image.push(c.image);
  });
  let order = new user_order({
    email: email,
    name: name,
    price: price,
    image: image,
    total: total,
  });

  order.save(function (err, data) {
    if (err) {
      res.json({ err: "404", msg: err });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// This route is for fetch order using email(user account)
router.get("/api/fetch_order/:email", function (req, res) {
  const email = req.params.email;
  user_order.find({ email: email }, function (err, data) {
    if (err) {
      res.json({ err: "404", msg: "something wrong" });
    } else if (data == null) {
      res.json({ err: "404", msg: "no item found" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// this route is for send a mail(Personal)
router.post("/api/mail_send", (req, res) => {
  const email = req.body.email;
  const text = req.body.text;

  var mailOptions = {
    from: "mohmadsabban123@gmail.com",
    to: email,
    subject: "Books_Store.com",
    text: `${text}`,
  };
  //sendmail function call
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ err: 1, email: "not a valid email", err: error });
    } else {
      res.json({ err: 0, email: "mailsend" });
    }
  });
});

// This route is for fetch all order
router.get("/api/getorder", (req, res) => {
  user_order.find({}, (err, data) => {
    if (data == null) {
      res.json({ err: 1, msg: "no order" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

// This route is for update order status
router.get("/api/update_order/:id", (req, res) => {
  const id = req.params.id;
  res.json({ err: 0, id: id });
});

// This Appi is Sending Mail to All User
router.post("/api/subscriber", (req, res) => {
  const mail = req.body.mail;
  user_account.find({}, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Some err" });
    } else if (data == null) {
      res.json({ err: 2, msg: "Account Not Found" });
    } else {
      data.forEach((e) => {
        var mailOptions = {
          from: "mohmadsabban123@gmail.com",
          to: e.email,
          subject: "Books_Store.com",
          text: `${mail}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json({ err: 3, msg: "Connection Error" });
          } else {
            res.json({ err: 0, data: info });
          }
        });
      });
    }
  });
});
/*=========================this route is for adding notes via user=======================*/
router.post("/api/addnotes", function (req, res) {
  uploadN(req, res, function (err) {
    if (err) {
      res.json({ err: 1, msg: "Uploading Error" });
    } else {
      let cname = req.body.cname;
      let nname = req.body.nname;
      let desc = req.body.description;
      let fname = req.file.filename;
      let ins = new noteModel({
        cname: cname,
        nname: nname,
        description: desc,
        file: fname,
      });
      ins.save(function (err) {
        if (err) {
        } else {
          res.json({ err: 0, msg: "Notes Saved" });
        }
      });
    }
  });
});

/*=====================this route is for fetching notes that has been added by user =======================*/
router.post("/api/fetchnotes", function (req, res) {
  noteModel.find({}, function (err, data) {
    if (err) {
    } else {
      res.json({ err: 0, cdata: data });
    }
  });
});

/*========This api route is for saving a Notes category in database============================ */
router.post("/api/addnotescategory", function (req, res) {
  const category = req.body.category;
  let ins = new add_notes_category({ cat: category }); // to save value in data base it save dynamically create new schema
  // inside this their is two value
  ins.save(function (err) {
    if (err) {
      res.json({ err: 1, msg: "some error" });
    } else {
      res.json({ err: 0, msg: "save" });
    }
  });
});
/*=================this route is for fetch a notes category==================== */
router.get("/api/getnotescategory", function (req, res) {
  add_notes_category.find({}, function (err, data) {
    if (err) {
      res.json({ err: 1, data: "some error occur in fetch category" });
    } else {
      res.json({ err: 0, data: data });
    }
  });
});

/*================ this route is for save notes according to category wise================*/
router.post("/api/new_notes_save", function (req, res) {
  uploadN(req, res, function (err) {
    if (err) {
      res.json({ err: err });
    } else {
      let nname = req.body.nname;
      let cname = req.body.cname;
      let File = req.file.filename;

      switch (cname) {
        case "computer":
          // to save value in data base it save dynamically create new schema
          // inside this their is two value
          let computer_notes = new computer({
            nname: nname,
            cname: cname,
            file: File,
          });
          computer_notes.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "science" });
            }
          });
          break;

        case "civil":
          let civil_notes = new civil({
            nname: nname,
            cname: cname,
            file: File,
          });
          civil_notes.save(function (err) {
            if (err) {
              res.json({ err: 1, msg: "some error" });
            } else {
              res.json({ err: 0, msg: "save", cat: "science" });
            }
          });
          break;
        default:
          res.json({ err: "404", msg: "category not found" });
      }
    }
  });
});

/*===================This route is for to get notes details======================= */
router.get("/api/get_notes_details/:data", function (req, res) {
  const note_name = req.params.data;
  console.log(note_name);
  switch (note_name) {
    case "computer":
      computer.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "some error occur at fetching category" });
        } else {
          res.json({ err: 0, data: data });
        }
      });
      break;

    case "civil":
      civil.find({}, function (err, data) {
        if (err) {
          res.json({ err: 1, data: "some error occur at fetching category" });
        } else {
          res.json({ err: 0, data: data });
        }
      });
      break;
    default:
      res.json({
        err: 1,
        msg: "category not found in database or in switch case",
      });
  }
});

module.exports = router;
