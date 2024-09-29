const tickers = ['Ben rơi vật lạ', 'Ben gặp sự cố khó nói', 'Ben ỉa đùn', 'Anh ơi mua SIM cho em', 'Anh ơi mua sub cho em', 'Hahahahaha cringtuber', 'Cringe', 'Worst-developer hahhaha', 'Nhớ đăng kí ultra interface', "Tuan Hai's fat mom hahaha", "tao béo", "Where is your dinininisour vringring", "SpeedyMcTrash", "Hyper-copycat", "Bestuber là tao", "hahahahahahahaha"]

var game = {
    v: {
        currentTab: 0,

        toilets: new Decimal(0),
        toiletCost: new Decimal(10),
        toiletCostIncrease: new Decimal(1.2),
        toiletEff: new Decimal(0.2),
        toiletBuyCount: new Decimal(0),

        toiletProducers: new Decimal(0),
        toiletProducerCost: new Decimal(100),
        toiletProducerCostIncrease: new Decimal(1.2),
        toiletProducerEff: new Decimal(0.2),

        shitGalaxies: new Decimal(0),
        shitGalaxyEff: new Decimal(1.05),
        shitGalaxyCost: new Decimal("1e6"),
        shitGalaxyCostIncrease: new Decimal("e2"),
        shitGalaxyCostIncInc: new Decimal("2.5"),

        shitCount: new Decimal(10),
    },
    html: {
        tabs: [document.getElementById('bengay')],

        toiletCount: document.getElementById('toilet-count'),
        toiletBtn: document.getElementById('toilet-btn'),


        toiletProducer: document.getElementById('toilet-producer'),
        toiletProducerCount: document.getElementById('toilet-producer-count'),
        toiletProducerBtn: document.getElementById('toilet-producer-btn'),

        shitGalaxy: document.getElementById('shit-galaxy'),
        shitGalaxyCount: document.getElementById('shit-galaxy-count'),
        shitGalaxyBtn: document.getElementById('shit-galaxy-btn'),

        shitCount: document.getElementById('shit-count'),
        shitsPerTick: document.getElementById('shits-per-tick'),

        ticker: document.getElementById('ticker'),
    },
    calculateMults: function (name) {
        switch (name) {
            case 'TM':
                return game.v.shitGalaxyEff.pow(game.v.shitGalaxies)
        }
    },
    format: function (x) {
        if (x.lt(1000)) {return x.toFixed(2)}
        else {return x.mantissa.toFixed(2) + "e" + x.exponent}
    },
    formatInt: function (x) {
        if (x.lt(1000)) {return x.toFixed(0)}
        else {return x.mantissa.toFixed(2) + "e" + x.exponent}
    },
    tick: function () {
        var shitsPerTick = game.v.toilets.mul(game.v.toiletEff.mul(game.calculateMults('TM').pow(game.v.toiletBuyCount)))

        game.html.shitsPerTick.innerHTML = `(${game.format(shitsPerTick)} shits/tick)`

        game.v.shitCount = game.v.shitCount.add(shitsPerTick)
        game.v.toilets = game.v.toilets.add(game.v.toiletProducers.mul(game.v.toiletProducerEff))

        game.html.toiletBtn.innerHTML = `Buy a toilet (${game.format(game.v.toiletCost)})`

        game.html.toiletBtn.innerHTML = `Buy a toilet (${game.format(game.v.toiletCost)})`
        game.html.shitCount.innerHTML = `${game.format(game.v.shitCount)} times`

        game.html.toiletCount.innerHTML = `You have ${game.format(game.v.toilets)} toilets`

        game.html.toiletProducerBtn.innerHTML = `Buy a toilet producer (${game.format(game.v.toiletProducerCost)})`

        game.html.shitGalaxyCount.innerHTML = `Shit Galaxy (${game.formatInt(game.v.shitGalaxies)})`
        game.html.shitGalaxyBtn.innerHTML = `Reset your shits and buildings to gain a multiplier when you buy a Toilet.
        <br>
        (×${game.format(game.calculateMults('TM'))} → ×${game.format(game.calculateMults('TM').mul(game.v.shitGalaxyEff))})
        <br>
        Cost: ${game.format(game.v.shitGalaxyCost)}
        `

        game.html.toiletProducerCount.innerHTML = `You have ${game.format(game.v.toiletProducers)} toilets`

        if (game.v.shitCount.gte(100)) {
            game.html.toiletProducer.style.display = 'inline-block'
        }

        if (game.v.shitCount.gte(1e6)) {
            game.html.shitGalaxy.style.display = 'inline-block'
        }

    },
    tickerUpdate: function () {
        game.html.ticker.innerHTML = tickers[Math.floor(Math.random()*tickers.length)]
    },
    buyToilet: function () {
        if (game.v.shitCount.gte(game.v.toiletCost)) {
            game.v.toiletBuyCount = game.v.toiletBuyCount.add(1)
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletCost)
            game.v.toiletCost = game.v.toiletCost.mul(game.v.toiletCostIncrease)
            game.v.toilets = game.v.toilets.add(1)
        }
    },

    buyToiletProducer: function () {
        if (game.v.shitCount.gte(game.v.toiletProducerCost)) {
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletProducerCost)
            game.v.toiletProducerCost = game.v.toiletProducerCost.mul(game.v.toiletProducerCostIncrease)
            game.v.toiletProducers = game.v.toiletProducers.add(1)
        }
    },

    shitGalaxy: function() {
        if (game.v.shitCount.gte(game.v.shitGalaxyCost)) {
            game.v.shitCount = new Decimal(10)

            game.v.toilets = new Decimal(0)
            game.v.toiletCost = new Decimal(10)
            game.v.toiletBuyCount = new Decimal(0)

            game.v.toiletProducers = new Decimal(0)
            game.v.toiletProducerCost = new Decimal(100)

            game.v.shitGalaxies = game.v.shitGalaxies.add(1)
            game.v.shitGalaxyCostIncrease = game.v.shitGalaxyCostIncrease.mul(game.v.shitGalaxyCostIncInc)
            game.v.shitGalaxyCost = game.v.shitGalaxyCost.mul(game.v.shitGalaxyCostIncrease)
        }
    },

    save: function () {
        return btoa(JSON.stringify(game.v))
    },
    load: function (savefile) {
        savefileDecoded = JSON.parse(atob(savefile))
        for (var key in savefileDecoded) {
            if (typeof savefileDecoded[key] == 'string') {
                savefileDecoded[key] = new Decimal(savefileDecoded[key])
            }
        }
        game.v = savefileDecoded
    }
}

setInterval(game.tick, 50)
setInterval(game.tickerUpdate, 14000)