const summary = require('./summaryTemplate.json') //sample summary template

module.exports = {
    createSummary: function(passengerType,source,totalPrice,discount=0) {
        /**
         * @param   {string:passengerType. string:currentStation of journey, integer:total price, integer:discount to be applied} 
         * @returns {if the balance in card is low than requiredAmount for travel, adds the money to wallet with 2% interest}
         */
        summary[source].total_collection+=totalPrice
        summary[source].discount += discount
        if(passengerType)
            summary[source]['counts'][passengerType]+=1
    },

    printSummary:function() {
        /**
         * @returns {prints the report to the console}
         */
        for(const [place,values] of Object.entries(summary)) {
            console.log('TOTAL_COLLECTION',place,values.total_collection,values.discount)
            console.log('PASSENGER_TYPE_SUMMARY')
            for(const [passengerType,passengerCount] of Object.entries(values.counts))
                if(passengerCount>0)
                    console.log(passengerType,passengerCount)
        }
    }
}