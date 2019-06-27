module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Welcome to our platform: Ask A Lawyer"});
  }
}
