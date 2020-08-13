import PatchContractTest from "test/contracts/patch-contract-test";

class ExamplePostTest extends PatchContractTest {
  /**
   * init data to data base by Example Entity
   */
  async initData(): Promise<void> {}
}

/**
 * init main test file
 */
let test = new ExamplePostTest().setInfo(
  /**
   * api main url here
   *
   * [without first slash]
   */
  "example/url",

  /**
   * name of controller and methods
   *
   * [use in log console log]
   */
  "TestController@test()"
);

/**
 * test case
 */
test
  /**
   * Description of test case,
   *
   * This is show in console log
   *
   * [yellow color]
   */
  .setItLabel("Guest up api without fill data")

  /**
   * Object of request body data
   *
   * [fill data]
   */
  .setFill({})

  /**
   * Response status code
   */
  .setStatusCode(422)

  /**
   * Object of Permission
   *
   * {
   *    permission : 'label of permission',
   *    store_perm : 1 or 0
   * }
   */
  .setPerm({
    permission: "test",
    valid_perm: 1
  })

  /**
   * describe it runner with permission
   */
  .describeIt();
