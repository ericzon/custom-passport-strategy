const log = require('debug')('strategy-lib:extractor');

class ExtractorHelper {
	static process(xt = [], req) {
		let token;

		if (Array.isArray(xt)) {
			xt.some(extractor => {
				token = extractor(req);
				return !!token;
			});
		} else {
			token = xt(req);
		}

		return token;
	}

	static extractTokenFromHeader({ headers }) {
		log('extractTokenFromHeader');
		const { authorization } = headers;
		let token;

		if (authorization && authorization.startsWith('Bearer ')) {
			token = authorization.split(' ')[1];
		}

		return token;
	}

	static extractTokenFromCookie(req) {
		log('extractTokenFromCookie');
		return req.cookies && req.cookies.id_token && req.cookies.id_token;
	}
}

module.exports = ExtractorHelper;
