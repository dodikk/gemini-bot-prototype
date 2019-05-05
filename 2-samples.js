global.fetch = require("node-fetch");
const main = require("async-main").default;
const Exchange = require("./exchange.js");
const Indicators = require("./indicators.js");
const Logger = require("./logger.js");


// ==== moving average indicator usage
// -
const DEFAULT_WINDOW_SIZE = 100;

async function MovingAverageIndicatorsLogicAsync()
{
	const nowMovingAverageDay =
	await Indicators.DailyMovingAverageAsync(
		/*cryptoAsset:*/ "BTC",
		/*currency:*/ "USD",
		/*hours:*/ DEFAULT_WINDOW_SIZE,
		/*currentElementIndex:*/ 0
	);

	console.log('daily 100 nowMovingAverage : ' + nowMovingAverageDay);

	const nowMovingAverageHour =
	await Indicators.HourlyMovingAverageAsync(
		/*cryptoAsset:*/ "BTC",
		/*currency:*/ "USD",
		/*hours:*/ DEFAULT_WINDOW_SIZE,
		/*currentElementIndex:*/ 0
	);

	console.log('hourly 100 nowMovingAverage : ' + nowMovingAverageHour);

	const nowMovingAverageMinute =
	await Indicators.MinutelyMovingAverageAsync(
		/*cryptoAsset:*/ "BTC",
		/*currency:*/ "USD",
		/*hours:*/ DEFAULT_WINDOW_SIZE,
		/*currentElementIndex:*/ 0
	);

	console.log('minutely 100 nowMovingAverage : ' + nowMovingAverageMinute);
}


// ==== market orders usage
// -
async function MarketOrdersLogicAsync()
{
	await Exchange.MarketBuyBitcoinAsync(1);
	await Exchange.MarketSellBitcoinAsync(1);
}


main( MovingAverageIndicatorsLogicAsync );