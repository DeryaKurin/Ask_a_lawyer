module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const categoryRoutes = require("../routes/categories");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(categoryRoutes);

  }
}
