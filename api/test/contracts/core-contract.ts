import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "src/app.module";
import Logger from "test/utilities/logger";
import JsonType from "test/utilities/interface/json-type.interface";
import { Validation } from "src/shared/validations/validation";
import { InternalExceptionFilter } from "src/shared/filters/internal-exception.filter";
import { ForbiddenExceptionFilter } from "src/shared/filters/forbidden-exception.filter";
import { UnauthorizedExceptionFilter } from "src/shared/filters/unauthorized-exception.filter";
import { QueryExceptionFilter } from "src/shared/filters/query-exception.filter";

import * as request from "supertest";

// Middleware
import * as compression from "compression";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";

export default abstract class CoreContract {
  protected request: any;
  protected tokens: any;
  protected logger: Logger;
  protected target: ValidationPipe;
  protected user: any;
  protected data: any;
  protected server: any;
  protected module: string;
  protected url: string;
  protected params: string[];
  protected query: string;
  protected fill: object = {};
  protected jsonStructure: JsonType[];
  protected statusCode: number = 200;
  protected timeout: number = 30000;
  protected label: string = "";
  protected itLabel: string = "";
  protected perm = {
    permission: "test",
    valid_perm: 1
  };

  constructor() {
    this.logger = new Logger();
  }

  protected abstract async initData(): Promise<void>;

  protected abstract getMethod(): string;

  protected async describe(fn) {
    await describe(this.getLabel(`${this.label} (e2e)`), () => {
      beforeEach(async done => {
        if (!this.server) await this.initServer();
        this.request
          .post("/auth/test")
          .send(
            this.getTokenUserInfo(this.perm.permission, this.perm.valid_perm)
          )
          .expect(200)
          .then(res => {
            this.tokens = res.body.data.tokens;
            if (!this.tokens) console.log("access token not found !");
            done();
          })
          .catch(err => {
            done(err);
          });
      });

      it(this.getItLabel(), fn, this.timeout);
    });
  }

  protected async initServer() {
    let app: INestApplication;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();

    // *********** App Use Global Middleware ************ //
    app.use(helmet());
    app.use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max: 30, // limit each IP to 30 requests per windowMs
        message: {
          status_code: 429,
          message: "درخواست های بیش از اندازه",
          errors: []
        }
      })
    );
    app.use(compression());
    // ******************************************** //

    // *********** App Global Pipes *************** //
    app.useGlobalPipes(
      new Validation({
        whitelist: true,
        transform: true
      })
    );
    // ******************************************** //

    // *********** App Global Filters ************ //
    app.useGlobalFilters(new InternalExceptionFilter());
    app.useGlobalFilters(new ForbiddenExceptionFilter());
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    app.useGlobalFilters(new QueryExceptionFilter());
    // ******************************************** //

    await app.init();

    this.server = app.getHttpServer();
    this.request = request(this.server);
  }

  protected getTokenUserInfo(permission: string, store_perm: number) {
    return {
      mobile: "09365895522",
      username: "mostafa",
      email: "mostafagholamidev@gmail.com",
      permission,
      store_perm
    };
  }

  protected validateStatusCode(status) {
    expect(status).toBe(this.statusCode);
    return this;
  }

  protected validateResJson(body, obj = this.jsonStructure) {
    obj.forEach(el => {
      if (el.type == "string" || el.type == "number") {
        expect(body).toHaveProperty(el.field);
      } else if (el.type == "object")
        if (el.subs) {
          if (el.field == "errors") this.validateErrorsBody(el, body[el.field]);
          else this.validateResJson(body[el.field], el.subs);
        }
    });
    return this;
  }

  private validateErrorsBody(el, body) {
    let fillField: string[] = [];
    let resField: string[] = [];

    el.subs.forEach(e => {
      fillField.push(e.field);
    });
    body.forEach(b => {
      resField.push(b.field);
    });

    expect(fillField).toStrictEqual(resField);
  }

  protected error422Logger(errors) {
    let message = "Unprocessable Entity: ";
    errors.forEach(err => {
      message += err.field;
    });
    this.logger.errorLog(message);
  }

  setError422JsonStructure(errorSubs: JsonType[] = []) {
    this.jsonStructure = [
      {
        field: "status_code",
        type: "number"
      },
      {
        field: "message",
        type: "string"
      },
      {
        field: "errors",
        type: "object",
        subs: errorSubs
      }
    ];
    return this;
  }

  setDataJsonStructure(dataSubs: JsonType[] = []) {
    this.jsonStructure = [
      {
        field: "status_code",
        type: "number"
      },
      {
        field: "success",
        type: "string"
      },
      {
        field: "data",
        type: "object",
        subs: dataSubs
      }
    ];
    return this;
  }

  getLabel(label: string): any {
    return this.logger.testLabel(label);
  }

  getItLabel(): any {
    return this.logger.itLabel(`Case: ${this.itLabel}`);
  }

  setUrl = (apiUrl: string) => {
    this.url = apiUrl;
    if (this.url == undefined) throw new Error("Url Not Set!");
    return this;
  };

  setParams(params: string[]) {
    this.params = params;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setQuery(query: string) {
    this.query = query;
    return this;
  }

  setFill(apiFill: {}) {
    this.fill = apiFill;
    return this;
  }

  setJsonStructure = (fields: JsonType[]) => {
    this.jsonStructure = fields;
    if (this.jsonStructure == undefined)
      throw new Error("Json Structure Not Set!");
    return this;
  };

  setStatusCode(apiStatus: number) {
    this.statusCode = apiStatus;
    return this;
  }

  setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  setInfo(url: string, ctrl: string) {
    this.url = `/${url}`;
    this.label = `Suite: ${this.constructor.name}: [${this.getMethod()}] [${
      this.url
    }] [${ctrl}]`;
    return this;
  }

  setItLabel(label: string) {
    this.itLabel = label;
    return this;
  }

  setPerm(perm) {
    this.perm = perm;
    return this;
  }
}
