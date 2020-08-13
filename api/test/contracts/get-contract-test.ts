import CoreContract from "./core-contract";

export default abstract class GetContractTest extends CoreContract {
  async describeIt() {
    await this.describe(done => {
      this.request
        .get(this.url)
        .query(this.query)
        .type("application/json")
        .set("Authorization", `Bearer ${this.tokens.access_token}`)
        .end(async (err, res) => {
          if (err) return done(err);
          this.validateStatusCode(res.status).validateResJson(res.body);
          done();
        });
    });
  }

  protected getMethod(): string {
    return "GET";
  }
}
