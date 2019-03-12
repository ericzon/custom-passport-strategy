const passport = require('passport-strategy');
const log = require('debug')('strategy-lib:strategy');

const ExtractorHelper = require('./extractor.helper');

class Strategy extends passport.Strategy {
	constructor(options = {}, verify) {
		super();

		if (!verify) {
			throw new TypeError('Strategy requires a verify callback');
		}
		passport.Strategy.call(this);

		this.name = options.strategyName || 'strategy-lib-default';

		if (!options.extractor) {
			log(`[${this.name}] using default extractor`);
		}
		this._extractorSettings = options.extractor || ExtractorHelper.extractTokenFromHeader;
		this._verify = verify;
	}

	_extractToken(req) {
		return ExtractorHelper.process(this._extractorSettings, req);
	}

	authenticate(req, options = {}) {
		const self = this;

		const token = this._extractToken(req);
		log('authenticate options', options);

		if (!token) {
			return self.fail(new Error("There's no auth token"));
		}

		function verified(err, user, info) {
			if (err) {
				return self.error(err);
			}
			if (!user) {
				return self.fail(info);
			}
			self.success(user, info);
		}

		try {
			const checkingsPayload = {
				...options,
				token
			};

			if (self._passReqToCallback) {
				self._verify(req, checkingsPayload, verified);
			} else {
				self._verify(checkingsPayload, verified);
			}
		} catch (ex) {
			return self.error(ex);
		}
	}
}

module.exports = Strategy;
