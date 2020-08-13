import { Injectable, HttpService } from "@nestjs/common";

@Injectable()
export class SmsService {
  private apiKey: string;
  private apiMainUrl: string;
  mobiles: string[] = [];
  message: string;
  digit: string;

  constructor(private readonly http: HttpService) {
    this.apiKey = process.env.SMS_API_KEY;
    this.apiMainUrl = process.env.SMS_API_MAIN_URL;
  }

  sendOtpMessage(mobile: string, digit: string) {
    this.mobiles.push(mobile);
    this.digit = digit;

    return this.http
      .post(
        this.urlSendMessagePath,
        {
          SmsBody: this.otpMessage,
          Mobiles: this.mobileValues
        },
        {
          headers: {
            Authorization: `BASIC APIKEY:${this.apiKey}`,
            ContentType: `application/json;charset=utf-8`
          }
        }
      )
      .toPromise()
      .then(response => {
        // console.log(response);
      })
      .catch(err => {
        // console.log("error: ", err);
      });
  }

  get mobileValues(): string[] {
    return this.mobiles;
  }

  get urlSendMessagePath(): string {
    return `${this.apiMainUrl}/Apiv2/Message/SendSms`;
  }

  get otpMessage(): string {
    return `کد تایید شما در سیستم کاریابی :‌${this.digit}`;
  }
}
