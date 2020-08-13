const color = require("colors");

export default class Logger {
  testLabel(label: string): any {
    return color.blue(label);
  }
  itLabel(label: string): any {
    return color.yellow(label);
  }
  log422(errors) {
    console.log(
      color.red(
        `response has been 422 status code!, fill data body by correct dto data : [ ${errors.map(
          err => err.field
        )} ]`
      )
    );
  }

  errorLog(err: string) {
    console.log(color.red(err));
  }
}
