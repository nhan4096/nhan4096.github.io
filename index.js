const tickers = ['Ben rơi vật lạ', 'Ben gặp sự cố khó nói', 'Ben ỉa đùn', 'Anh ơi mua SIM cho em', 'Anh ơi mua sub cho em', 'Hahahahaha cringtuber', 'Cringe', 'Worst-developer hahhaha', 'Nhớ đăng kí ultra interface', "Tuan Hai's fat mom hahaha", "tao béo", "Where is your dinininisour vringring", "SpeedyMcTrash", "Hyper-copycat", "Bestuber là tao", "hahahahahahahaha"]

var game = {
    v: {
        toilets: new Decimal(0),
        toiletCost: new Decimal(10),
        toiletCostIncrease: new Decimal(1.2),
        toiletEff: new Decimal(0.2),
        toiletBuyCount: new Decimal(0),

        toiletProducers: new Decimal(0),
        toiletProducerCost: new Decimal(100),
        toiletProducerCostIncrease: new Decimal(1.2),
        toiletProducerEff: new Decimal(0.2),
        unlockedToiletProducers: false,

        shitGalaxies: new Decimal(0),
        shitGalaxyEff: new Decimal(1.05),
        shitGalaxyCost: new Decimal("1e6"),
        shitGalaxyCostIncrease: new Decimal("e2"),
        shitGalaxyCostIncInc: new Decimal("2.5"),
        unlockedShitGalaxies: false,

        shitCount: new Decimal(10),
    },
    html: {
        tabs: [document.getElementById('bengay'), document.getElementById('settings')],

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
    initialize: function () {
        game.beginningSave = game.save()
        if (localStorage.savefile) {
            game.load(localStorage.savefile)
        }
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

        game.html.toiletCount.innerHTML = game.v.unlockedShitGalaxies ? `You have ${game.format(game.v.toilets)} toilets (×${game.format(game.calculateMults('TM').pow(game.v.toiletBuyCount))})` : `You have ${game.format(game.v.toilets)} toilets`

        game.html.toiletProducerBtn.innerHTML = `Buy a toilet producer (${game.format(game.v.toiletProducerCost)})`

        game.html.shitGalaxyCount.innerHTML = `Shit Galaxy (${game.formatInt(game.v.shitGalaxies)})`
        game.html.shitGalaxyBtn.innerHTML = `Reset your shits and buildings to gain a multiplier when you buy a Toilet.
        <br>
        (×${game.format(game.calculateMults('TM'))} → ×${game.format(game.calculateMults('TM').mul(game.v.shitGalaxyEff))})
        <br>
        Cost: ${game.format(game.v.shitGalaxyCost)}
        `

        game.html.toiletProducerCount.innerHTML = `You have ${game.format(game.v.toiletProducers)} toilet producers`

        if (game.v.shitCount.gte(100) || game.v.unlockedToiletProducers) {
            game.html.toiletProducer.style.display = 'inline-block'
            game.v.unlockedToiletProducers = true
        }

        if (game.v.shitCount.gte(1e6) || game.v.unlockedShitGalaxies) {
            game.html.shitGalaxy.style.display = 'inline-block'
            game.v.unlockedShitGalaxies = true
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
    },
    playFart: function () {
        new Audio(`fart${Math.floor(4*Math.random()+1)}.mp3`).play()
    },
    promptLoad: function () {
        try {
            game.load(prompt('Savefile:'))
        }
        catch {
            alert('Invalid savefile!')
        }
    },
    promptSave: function () {
        prompt('Savefile:', game.save())
    },
    promptDelete: function () {
        if (prompt('Are you sure you want to reset the game? If yes, type "Ben RVLKV2024"') == 'Ben RVLKV2024') {
            game.load(game.beginningSave)
            localStorage.removeItem('savefile')
            location.reload(true)
        }
    },
    saveBrowser: function () {
        localStorage.setItem('savefile', game.save())
    },
    openTab: function (t) {
        for (var i=0; i<game.html.tabs.length; i++) {
            game.html.tabs[i].style.display = 'none'
        }
        game.html.tabs[t].style.display = 'inline'
    },
    locked: function () {
        alert('Pay 1000000SIMUI to unlock that button!')
        prompt('Pay at:', 'https://bit.ly/47Jiz2O')
    }
}

game.initialize()

setInterval(game.tick, 50)
setInterval(game.tickerUpdate, 14000)
setInterval(game.playFart, 3000)
setInterval(game.saveBrowser, 5000)