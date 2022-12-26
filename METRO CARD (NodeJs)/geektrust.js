const fs = require("fs")
const filename = process.argv[2]
const {printSummary,createSummary} = require('./summary')

const cards = {}
//cards object contains card and balance available, sample:{ MC1: 250, MC2: 50}

const originStations = {}
//originStations contains origin station of journey of cards,sample:{ MC2: 'CENTRAL', MC3: 'AIRPORT' }

const prices = {
    "ADULT" : 200,
    "SENIOR_CITIZEN" : 100,
    "KID" : 50,
    "walletTopUpInterest" : 0.02,   //Interest charged on adding money to wallet (2%)
    "discount" : 0.5                //Discount on returning to the Origin statin (50%)
}

function checkCardBalance(card,source,requiredAmount) {
    /**
     * @param   {string:cardNumber, string:currentStation of journey, integer:required amount to pay} 
     * @returns {if the balance in card is low than requiredAmount for travel, adds the money to wallet with 2% interest}
     */
    if(cards[card]<requiredAmount) {
        const interest=(requiredAmount-cards[card])*prices.walletTopUpInterest
        createSummary(null,source,interest)
        cards[card]=requiredAmount
    }
}

function checkIn(card,passengerType,source) {
    /**
     * @param   {string:cardNumber, string:passengerType(ADULT/KID/SENIOR_CITIZEN), string:currentStation of travel} 
     * @returns {Checkin the passenger}
     */
    if(Object.keys(cards).includes(card)) {  //Continue with the execution if card exists
        if(originStations[card]===source) {  //if passenger returns to the origin station,apply discount of 50% (prices.discount)
            const discount = prices[passengerType]*prices.discount
            checkCardBalance(card,source,discount)
            cards[card]-=prices[passengerType]-discount
            createSummary(passengerType,source,prices[passengerType]-discount,discount)
            delete originStations[card]      //Once he returns delete the origin station so that discount wont apply again
        }
        else {                               //if the station is not his origin station,checkin with actual prices
            checkCardBalance(card,source,prices[passengerType])
            cards[card]-=prices[passengerType]
            createSummary(passengerType,source,prices[passengerType])
            if(!originStations[card])        //Add origin station if it is his first station
                originStations[card] = source ==='CENTRAL'?'AIRPORT':'CENTRAL'
        }
    }
}


fs.readFile(filename, "utf8", (err, data) => {
   fileData=data.toString().split(/\r?\n/);
   for(const commands of fileData){
        commandArray = commands.trim().split(' ');
        switch(commandArray[0].toLowerCase()) {
            case 'balance':
                cards[commandArray[1]]=Number(commandArray[2]);
                break;
            case 'check_in':
                checkIn(...commandArray.splice(1))
                break
            case 'print_summary':
                printSummary()
                break
        }
   }
})
