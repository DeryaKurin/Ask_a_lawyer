module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const categoryRoutes = require("../routes/categories");
    const questionRoutes = require("../routes/questions");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);
    app.use(questionRoutes);
    
  }
}
