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
    
## Development

    $ npm run format
    $ npm run lint

## License

[The MIT License](http://opensource.org/licenses/MIT)
