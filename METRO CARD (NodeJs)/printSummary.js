module.exports = function(summary) {
    /**
     * @param {Object: summary}
     * @returns {prints the report to the console}
     */
    for(const [place,values] of Object.entries(summary)){
        console.log('TOTAL_COLLECTION',place,values.total_collection,values.discount)
        console.log('PASSENGER_TYPE_SUMMARY')
        for(const [k,v] of Object.entries(values.counts))
            if(v>0)
                console.log(k,v)
    }
}