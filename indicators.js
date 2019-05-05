
const Logger = require("./logger.js");
const CryptoCompareApiKey = "12b23e55426ae7d2aa024ce96a131e2026e9ae3ef2131ba60474e2bd89eba46d";
const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CryptoCompareApiKey);

module.exports = 
{
	DailyMovingAverageAsync: 
		async function DailyMovingAverageAsync(
			cryptoAsset,
			currency,
			hours,
			currentElementIndex)
		{
			const priceHistory =
			 	await CryptoCompareAPI.histoDay(
			 			cryptoAsset, 
			 			currency
			 	   ,{
			 			limit : hours + currentElementIndex + 1
			 		}
			 	);

			const priceHistoryToPast = priceHistory.reverse();

			const nowMovingAverage =
				CalculateMovingAverageByClosingPriceForItem(
					priceHistoryToPast,
					/*currentElementIndex:*/ currentElementIndex,
					/*windowSize:*/ hours
				);

			return nowMovingAverage;
		}



	, HourlyMovingAverageAsync: 
		async function HourlyMovingAverageAsync(
			cryptoAsset,
			currency,
			hours,
			currentElementIndex)
		{
			const priceHistory =
			 	await CryptoCompareAPI.histoHour(
			 			cryptoAsset, 
			 			currency
			 	   ,{
			 			limit : hours + currentElementIndex + 1
			 		}
			 	);

			const priceHistoryToPast = priceHistory.reverse();

			const nowMovingAverage =
				CalculateMovingAverageByClosingPriceForItem(
					priceHistoryToPast,
					/*currentElementIndex:*/ currentElementIndex,
					/*windowSize:*/ hours
				);

			return nowMovingAverage;
		}


	, MinutelyMovingAverageAsync: 
		async function MinutelyMovingAverageAsync(
			cryptoAsset,
			currency,
			hours,
			currentElementIndex)
		{
			const priceHistory =
			 	await CryptoCompareAPI.histoMinute(
			 			cryptoAsset, 
			 			currency
			 	   ,{
			 			limit : hours + currentElementIndex + 1
			 		}
			 	);

			const priceHistoryToPast = priceHistory.reverse();

			const nowMovingAverage =
				CalculateMovingAverageByClosingPriceForItem(
					priceHistoryToPast,
					/*currentElementIndex:*/ currentElementIndex,
					/*windowSize:*/ hours
				);

			return nowMovingAverage;
		}

}


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




function CalculateMovingAverageByClosingPriceForItem(
	priceHistoryToPast, 
	currentElementIndex, 
	windowSize)
{
	var result = 0;
	var accumulatedSum = 0;

	for (i = 0; i < windowSize; i++)
	{
		accumulatedSum += priceHistoryToPast[currentElementIndex + i].close;
	}

	result = accumulatedSum / windowSize;

	return result;
}

