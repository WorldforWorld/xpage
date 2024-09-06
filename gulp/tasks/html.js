import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";
import cached from "gulp-cached";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error <%= error.message %>",
          })
        )
      )
      // Используем gulp-cached для кеширования неизмененных файлов
      .pipe(cached("pug"))
      // Используем gulp-newer для пересборки только изменённых файлов
      .pipe(app.plugins.newer(app.path.build.html))
      .pipe(
        pug({
          // Сжатие HTML файла
          pretty: true,
          // Показывать в терминале какой файл обработан
          verbose: true,
        })
      )
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
