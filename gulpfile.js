// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html-old.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { addLinks } from "./gulp/tasks/addLinks.js";
import { images } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { processGlobule } from "./gulp/tasks/processGlobule.js";

// Наблюдатель за изменениями в файле
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };
export { addLinks };

// Основные задачи
const mainTasks = gulp.parallel(copy, html, scss, js, images, fonts);

// Построение сценариев выполнения задач
const dev = gulp.series(
  reset,
  processGlobule,
  mainTasks,
  gulp.parallel(watcher, server)
);
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Выполнение сценария по умолчанию
gulp.task("default", dev);
