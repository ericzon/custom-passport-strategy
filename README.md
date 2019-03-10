# custom-passport-strategy

[Passport](http://passportjs.org/) strategy for token authentication. 

It offers two built-in extractors:
- extractTokenFromHeader (by default)
- extractTokenFromCookie

It accepts an array of extractors, executed sequentially to get the token from incoming request.

```
const options = {
    ...
    extractor: [
        ExtractorHelper.extractTokenFromHeader,
        ExtractorHelper.extractTokenFromCookie
    ]
    ...
}

```

## Install

    $ npm install custom-passport-strategy

## Debug

This library uses debug logger to help with debugging tasks. Just enable logs with:
```
export DEBUG='strategy-lib:*'
```

## Development

    $ npm run format
    $ npm run lint

## License

[The MIT License](http://opensource.org/licenses/MIT)
