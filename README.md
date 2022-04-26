# esn-frontend-common-libs

Common modules and services for OpenPaaS.

## Running tests

You can run tests by executing the following command:

```sh
npm run test
```

Note that there is a 10000ms timeout by default. If you want to change that, simply pass the **TEST_TIMEOUT** environment variable:

```sh
TEST_TIMEOUT=2000 npm run test
```

Test trigger CI
