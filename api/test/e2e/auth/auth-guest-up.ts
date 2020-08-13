import PostContractTest from "test/contracts/post-contract-test";

class AuthGuestUpTest extends PostContractTest {
  /**
   * init data to data base by Example Entity
   */
  async initData(): Promise<void> {}
}

let test = new AuthGuestUpTest().setInfo(
  "auth/guest/up",
  "AuthController@guestUp()"
);

test
  .setItLabel("Guest up api with all required fill data")
  .setFill({
    type: "test",
    type_version: "6.1",
    brand_name: "Samsung",
    type_id: "123456"
  })
  .setStatusCode(200)
  .describeIt();

test
  .setItLabel("Guest up api without fill data")
  .setFill({})
  .setStatusCode(422)
  .describeIt();

test
  .setItLabel("Guest up api without type field")
  .setFill({
    type_version: "6.1",
    brand_name: "Samsung",
    type_id: "123456"
  })
  .setStatusCode(422)
  .describeIt();

test
  .setItLabel("Guest up api without type_version field")
  .setFill({
    type: "test",
    brand_name: "Samsung",
    type_id: "123456"
  })
  .setStatusCode(422)
  .describeIt();

test
  .setItLabel("Guest up api without brand_name field")
  .setFill({
    type: "test",
    type_version: "6.1",
    type_id: "123456"
  })
  .setStatusCode(422)
  .describeIt();

test
  .setItLabel("Guest up api without type_id field")
  .setFill({
    type: "test",
    type_version: "6.1",
    brand_name: "Samsung"
  })
  .setStatusCode(422)
  .describeIt();
