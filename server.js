const express = require("express");
const passport = require("passport");
const cors = require('cors')
const path = require('path')
require("dotenv").config();
const db = require("./dbconfig");
const passportStrategy = require("./middlewares/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/media', express.static(path.join(__dirname, 'media')))
app.use(cors())

passportStrategy(passport);

// Routes
app.get("/", (req, res) => res.json({ message: "Server running..." }));

app.use("/users", require("./routes/users"));
app.use(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  require("./routes/accounts")
);
app.use(
  "/expenses",
  passport.authenticate("jwt", { session: false }),
  require("./routes/expenses")
);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  require("./routes/userprofile")
);

db.sync().then(
  (database) => {
    app.listen(5000, () => console.log("Server synced..."));
  },
  (error) => {
    console.log("ERROR: ", error.message);
  }
);
