import gulp from "gulp";
import through2 from "through2";
import fs from "fs";
import path from "path";

export const processGlobule = () => {
  let mixins = "";

  return gulp
    .src("src/html/blocks/libs/**/_*.pug", {
      ignore: "src/html/blocks/libs/_libs.pug",
    })
    .pipe(
      through2.obj((file, _, cb) => {
        // Получаем имя файла и добавляем в контент миксинов
        const fileName = path.basename(file.path);
        mixins += `include ${fileName}\n`;
        cb(null, file);
      })
    )
    .on("end", () => {
      const filePath = "src/html/blocks/libs/_libs.pug";

      // Читаем текущее содержимое файла
      fs.readFile(filePath, "utf8", (err, currentContent) => {
        if (err && err.code !== "ENOENT") throw err;

        // Если контент не изменился, не перезаписываем файл
        if (currentContent === mixins) {
          console.log("Mixins have not changed.");
          return;
        }

        // Записываем новый контент только если он отличается
        fs.writeFile(filePath, mixins, (err) => {
          if (err) throw err;
          console.log("Mixins are generated automatically!");
        });
      });
    });
};
