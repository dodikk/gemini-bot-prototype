const JsonBeautify = require("json-beautify");

module.exports = 
{

	JsonBeautifyDefault:

		function JsonBeautifyDefault(json)
		{
			const result = 
				JsonBeautify(
					/*value:*/ json,
					/*replacer:*/ null,
					/*space:*/ 2,
					/*limit:*/ 80
				);

			return result;
		}

}
