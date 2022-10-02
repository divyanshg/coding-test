const data = require("./data-store.json");

class Controller {
  async getProject(id) {
    return new Promise((resolve, reject) => {
      let project = data.find((project) => project.id === parseInt(id));
      if (project) {
        resolve(project);
      } else {
        reject(`NOT_FOUND`);
      }
    });
  }
}

module.exports = Controller;