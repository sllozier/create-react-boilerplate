const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.use("/", require("./accounts"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
