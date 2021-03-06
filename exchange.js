
global.fetch = require("node-fetch");
const Logger = require("./logger.js");
const GeminiAPI = require("gemini-api").default;
const geminiSecret = "2zLLJdd7tptRGUy1wEqafuaAtztv";
const geminiKey = "account-75fGnAH8Fpkrh76UqZYW";

const geminiApiConfig = 
{
   key: geminiKey,
   secret: geminiSecret,
   sandbox: true
};
const restClient = new GeminiAPI(geminiApiConfig);



module.exports = 
{
	MarketBuyBitcoinAsync: 
	async function MarketBuyBitcoinAsync(amount)
	{
		const response = 
			await restClient.newOrder(
			{
				amount: amount,
				price: 10000, // taking a very high "infinity" price  
				side: "buy",
				symbol: "btcusd",
				options: ["immediate-or-cancel"] // this option ensures the price reduced to "market price"
			});

		return response;

	} // MarketBuyBitcoinAsync


	, MarketSellBitcoinAsync: 
	async function MarketSellBitcoinAsync(amount)
	{
		const response = 
			await restClient.newOrder(
			{
				amount: amount,
				price: 1, // taking a very low "infinity" price  
				side: "sell",
				symbol: "btcusd",
				options: ["immediate-or-cancel"] // this option ensures the price increased to "market price"
			});

		return response;

	} // MarketSellBitcoinAsync


	, GetBitcoinPriceAsync:
	async function GetBitcoinPriceAsync()
	{
		const result = await restClient.getTicker("btcusd");
		return result.last;
		
	} // GetBitcoinPriceAsync

} // module.exports

