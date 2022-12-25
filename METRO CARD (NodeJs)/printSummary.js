module.exports = function(summary) {
    /**
     * @param   {Object: summary}
     * @returns {prints the report to the console}
     */
    for(const [place,values] of Object.entries(summary)){
        console.log('TOTAL_COLLECTION',place,values.total_collection,values.discount)
        console.log('PASSENGER_TYPE_SUMMARY')
        for(const [passengerType,passengerCount] of Object.entries(values.counts))
            if(passengerCount>0)
                console.log(passengerType,passengerCount)
    }
}