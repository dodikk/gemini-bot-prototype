
global.fetch = require("node-fetch");
const main = require("async-main").default;
const Exchange = require("./exchange.js");
const Indicators = require("./indicators.js");
const Logger = require("./logger.js");


var hasPosition = false;

async function MovingAverageStrategyTick()
{
	const indicators = await Promise.all(
	[
		  Exchange.GetBitcoinPriceAsync()

		, Indicators.MinutelyMovingAverageAsync(
			/*cryptoAsset:*/ "BTC",
			/*currency:*/ "USD",
			/*hours:*/ 100,
			/*currentElementIndex:*/ 0
		)
	]);

	const btcPrice = indicators[0];
	const movingAverage100Min = indicators[1];


	const isPriceCrossedUnderAverage = 
		(btcPrice < movingAverage100Min) && (!hasPosition);

	const isPriceCrossedAboveAverage = 
		(btcPrice > movingAverage100Min) && (hasPosition);


	console.log("     ");
	console.log("====================");
	console.log("[BEGIN] Executing strategy");
	console.log("price : " + btcPrice);
	console.log("movingAverage100Min : " + movingAverage100Min);
	console.log("isPriceCrossedUnderAverage : " + isPriceCrossedUnderAverage);
	console.log("isPriceCrossedAboveAverage : " + isPriceCrossedAboveAverage);


	try
	{
		if (isPriceCrossedUnderAverage)
		{
			console.log("Buying btc...");

			await Exchange.MarketBuyBitcoinAsync(1);
			hasPosition = true;

			console.log("Bought btc successfully...");
		}
		else if (isPriceCrossedAboveAverage)
		{
			console.log("Selling btc...");

			await Exchange.MarketSellBitcoinAsync(1);
			hasPosition = false;

			console.log("Sold btc...");
		}
		else
		{
			console.log("HOLD");
		}

		console.log("[END] Executing strategy");
	}
	catch (error)
	{
		console.log("error : " + error);
		console.log("HOLD");
	}
}

// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function PollingMovingAverageStrategy()
{
	// TODO: use websockets to avoid inefficient polling of REST API
	// NOTE: ok for MVP and educational purpose so far

	while (true)
	{
		await MovingAverageStrategyTick();

		const sleepTimeoutMilliSeconds = 1000;
		await sleep(sleepTimeoutMilliSeconds);
	}
}


main( PollingMovingAverageStrategy );



