const http = require("http");
const PORT = process.env.PORT || 8000;
const Projects = require("./controller");

const server = http.createServer(async (req, res) => {
  //set the request route
  if (req.url.match(/\/project\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[2];

      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "BAD REQUEST" }));
      } else {
        const project = await new Projects().getProject(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(project));
      }
    } catch (err) {
      if (err === "NOT_FOUND") {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
      }
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err }));
    }
  } else if (req.url == "/project/" && req.method === "GET") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "BAD REQUEST" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
