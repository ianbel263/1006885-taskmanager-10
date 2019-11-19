var gulp = require("gulp");
var server = require("browser-sync").create();

gulp.task("server", function () {
  server.init({
    server: "public",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/*.js", gulp.series("refresh"));
  //gulp.watch("public/*.html", gulp.series("refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("server"));
