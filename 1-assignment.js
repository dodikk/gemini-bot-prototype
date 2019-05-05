
const main = require("async-main").default;
const GeminiAPI = require("gemini-api").default;

const JsonBeautify = require("json-beautify");


const geminiSecret = "2zLLJdd7tptRGUy1wEqafuaAtztv";
const geminiKey = "account-75fGnAH8Fpkrh76UqZYW";


const geminiApiConfig = 
{
   key: geminiKey,
   secret: geminiSecret,
   sandbox: true
};
const restClient = new GeminiAPI(geminiApiConfig);

const Logger = require("./logger.js");


const ORDERS_COUNT = 3;
function GenerateOrders()
{
	var result = [];

	for (i = 0; i < ORDERS_COUNT; i++)
	{
		const orderDto = 
		{
			amount: 10 * (i + 1),
			price: 100 * (ORDERS_COUNT - i),
			side: "buy",
			symbol: "BTCUSD"
		};

		result.push(orderDto);
	}

	return result;
}


async function ExecAssignmentLogicAsync()
{
	try
	{
		const orders = GenerateOrders();
		console.log('generated orders : ' + Logger.JsonBeautifyDefault(orders));

		for (i = 0; i < ORDERS_COUNT; i++)
		{
			// TODO: maybe run in parallel and apply map/reduce 
			await restClient.newOrder(orders[i]);
		}

		var activeOrders = await restClient.getMyActiveOrders();
		console.log('active orders : ' + Logger.JsonBeautifyDefault(activeOrders));

		await restClient.cancelAllActiveOrders();
		console.log('orders cancelled');
		var activeOrdersAfterCancel = await restClient.getMyActiveOrders();

		console.log('after cancel : ' + Logger.JsonBeautifyDefault(activeOrdersAfterCancel));
	}
	catch (error)
	{
		console.log(error);
	}
}


main( ExecAssignmentLogicAsync );




