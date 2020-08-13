import GetContractTest from "test/contracts/get-contract-test";

class ExampleGetTest extends GetContractTest {
  /**
   * init data to data base by Example Entity
   */
  async initData(): Promise<void> {}
}

/**
 * init main test file
 */
let test = new ExampleGetTest().setInfo(
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
  .setItLabel("example label for it")

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
    store_perm: 1
  })

  /**
   * describe it runner with permission
   */
  .describeIt();
