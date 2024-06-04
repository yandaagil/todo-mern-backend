require("./utils/connectDB");
const createServer = require("./utils/server");

const app = createServer();
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
