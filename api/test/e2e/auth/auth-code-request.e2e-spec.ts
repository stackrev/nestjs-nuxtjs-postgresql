import PostContractTest from "test/contracts/post-contract-test";

class AuthCodeRequestTest extends PostContractTest {
  /**
   * init data to data base by Example Entity
   */
  async initData(): Promise<void> {}
}

let test = new AuthCodeRequestTest().setInfo(
  "auth/code/request",
  "AuthController@codeRequest()"
);

test
  .setItLabel("Code request api with all required fill data")
  .setFill({
    mobile: "09365895522",
    type_id: "123456"
  })
  .setDataJsonStructure([
    {
      field: "expires_at",
      type: "string"
    },
    {
      field: "hash",
      type: "string"
    },
    {
      field: "server_at",
      type: "string"
    },
    {
      field: "type_id",
      type: "string"
    }
  ])
  .setStatusCode(200)
  .describeIt();

test
  .setItLabel("Code request api with invalid mobile")
  .setFill({
    mobile: null,
    type_id: "123456"
  })
  .setError422JsonStructure([
    {
      field: "mobile",
      type: "string"
    }
  ])
  .setStatusCode(422)
  .describeIt();

test
  .setItLabel("Code request api with invalid type_id")
  .setFill({
    mobile: "09365895522",
    type_id: null
  })
  .setError422JsonStructure([
    {
      field: "type_id",
      type: "string"
    }
  ])
  .setStatusCode(422)
  .describeIt();
