const dataModel=require('../model/dataModel');
const axios = require('axios');


const getcrypto=async function(req,res){
    try{
     // Fetch data from CoinCap API
    const coincap= await axios.get('https://api.coincap.io/v2/assets?limit=100');
    
    // // Process the data
    const coinsData = coincap.data.data;
    const coins = coinsData.map((val) => ({
      symbol: val.symbol,
      name: val.name,
      marketCapUsd: val.marketCapUsd,
      priceUsd: val.priceUsd,
    }));
    const uniqueCoin=await dataModel.find()
    if(uniqueCoin.length!==0){
        return res.status(400).send({status:true,message:'Data is already present', data:uniqueCoin})
    }
    // create coin in database
    await dataModel.create(coins)
   
    // Sort the coins by changePercent24Hr in descending order
    const sortedCoins = coins.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr);
    // Send the sorted coins as the response

    return res.status(200).send({data:sortedCoins})
    
 

    }
    catch(err){
        res.status(500).send({status:false , message:err.message })
    }
}




module.exports = {getcrypto}