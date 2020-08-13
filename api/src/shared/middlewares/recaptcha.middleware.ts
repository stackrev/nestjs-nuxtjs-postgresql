import { Injectable, NestMiddleware, HttpService } from "@nestjs/common";
import { Request, Response } from "express";
import { RecaptchaException } from "src/exceptions/recaptcha.exception";

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {
  private secretKey: string;
  private token: string;
  private url: string = "https://www.google.com/recaptcha/api/siteverify";

  constructor(private readonly http: HttpService) {
    this.secretKey = process.env.RECAPTCHA_SECRET_KEY;
  }

  async use(req: Request, res: Response, next: Function) {
    this.token = req.body.tkn;
    if (!(await this.check())) {
      throw new RecaptchaException();
    } else {
      next();
    }
  }

  async check() {
    let result = false;
    await this.http
      .post(this.getUrl())
      .toPromise()
      .then(response => {
        result = response.data.success;
      })
      .catch(err => {
        console.log("error: ", err);
      });
    return result;
  }

  getUrl() {
    return `${this.url}?secret=${this.secretKey}&response=${this.token}`;
  }
}
