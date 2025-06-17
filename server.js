const app = require("./app");
const cors = require("cors");

const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
