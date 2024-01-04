## Running the app
Run docker-compose, fresh database will setup automatically and app will start in dev mode. You immediately test all end-points and queue behaviour.

```bash
docker-compose up
```

**App URL**: localhost::3008

**PHPMyAdmin URL**: localhost::8181

## Test

```bash
# unit tests
$ docker-compose run node yarn run test

# e2e tests
$ docker-compose run node yarn run test:e2e

# test coverage
$ docker-compose run node yarn run test:cov
```

## Disclaimer

I know a lot of things are wrong, but I haven't spent enough time on the project to get things perfect. So take some things with a grain of salt, please. For example, I couldn't get the tests to run in isolation at all, so I'm not even trying to pretend they're even usable. On the other hand, it's probably fair. This is an example of me knowing the concepts but not the specific use of some of the technologies used.
