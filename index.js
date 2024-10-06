const tickers = ['Ben rơi vật lạ', 'Ben gặp sự cố khó nói', 'Ben ỉa đùn', 'Anh ơi mua SIM cho em', 'Anh ơi mua sub cho em', 'Hahahahaha cringtuber', 'Cringe', 'Worst-developer hahhaha', 'Nhớ đăng kí ultra interface', "Tuan Hai's fat mom hahaha", "tao béo", "Where is your dinininisour vringring", "SpeedyMcTrash", "Hyper-copycat", "Bestuber là tao", "hahahahahahahaha"]

let game = {
    v: {
        currentUniverse: 0,
        shitCount: new Decimal(10),

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

        unlockedAutobuyers: false,
        toiletAutobuyerInterval: 10000,
        toiletAutobuyerEnabled: false,
        toiletAutobuyersLast: Date.now(),
        toiletAutobuyerUpgradeCost: new Decimal('1e20'),
        toiletAutobuyerUpgradeCostInc: new Decimal('1e2'),

        universeUnlocks: [false],
        unlockedShittiverses: false,
    },
    achievements: [
        {
            id: 1,
            name: "Skibidi Toilet",
            description: "Buy a Toilet",
            unlocked: false,
        },
        {
            id: 2,
            name: "DaFuqBoom",
            description: "Buy a Toilet Producer",
            unlocked: false,
        },
        {
            id: 3,
            name: "Cosmic Shitting",
            description: "Have 1 Shit Galaxy",
            unlocked: false,
        },
        {
            id: 4,
            name: "Shit-pocalypse",
            description: "Get 1e15 shits",
            unlocked: false,
        },
        {
            id: 5,
            name: "The Shitty Way",
            description: "Have 10 shit galaxies",
            unlocked: false,
        },
        {
            id: 6,
            name: "WAS THAT THE SHIT OF '87??",
            description: "Have 1e87 shits",
            unlocked: false,
        },
        {
            id: 7,
            name: 'Taking Pepto-Bismol',
            description: "Unlock Diarrheaverse",
            unlocked: false,
        }
    ],
    html: {
        tabs: [document.getElementById('bengay'), document.getElementById('settings'), document.getElementById('achievements'), document.getElementById('auto-shitter'), document.getElementById('shittiverses')],

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

        autoShitterTabBtn: document.getElementById('auto-tab'),
        autoShitterEnabled: document.getElementById('shitter-enabled'),
        autoShitterUpgrade: document.getElementById('shitter-upgrade'),

        achievementsList: document.getElementById('achievements-list'),
        subTab2a: document.getElementById('ach-2a'),
        subTab2b: document.getElementById('ach-2b'),
        lockedAchievements: document.getElementById('locked-achievements'),

        shittiverseEnterBtns: document.getElementsByClassName('enter-shittiverse'),
        shittiverseTabBtn: document.getElementById('verse-tab'),
        shittiverseNames: document.getElementsByClassName('verse-text'),

        ticker: document.getElementById('ticker'),
    },
    initialize: function () {
        game.beginningSave = game.save()
        game.beginningV = JSON.parse(JSON.stringify(game.v))
        if (localStorage.savefile) {
            game.load(localStorage.savefile)
        }
        for (let key in game.beginningV) {
            if (typeof game.beginningV[key] == 'string') {
                game.beginningV[key] = new Decimal(game.beginningV[key])
            }
        }

        if (game.v.currentUniverse != 0) {
            Array.prototype.slice.call(game.html.shittiverseEnterBtns).forEach(e => {
                e.innerHTML = "Enter"
            })
            game.html.shittiverseEnterBtns[game.v.currentUniverse-1].innerHTML = "Exit"
        }
        game.html.autoShitterEnabled.enabled = game.v.toiletAutobuyerEnabled
    },
    calculateMults: function (name) {
        switch (name) {
            case 'TM':
                return game.v.shitGalaxyEff.pow(game.v.shitGalaxies)
            case 'TMC':
                if (game.v.currentUniverse == 0) {
                    return game.calculateMults('TM').pow(game.v.toiletBuyCount).gte("1e100") ? new Decimal("1e100").mul(game.calculateMults('TM').pow(game.v.toiletBuyCount).div('1e100').pow(0.25)).pow(game.v.universeUnlocks[0] ? 1.35 : 1) : game.calculateMults('TM').pow(game.v.toiletBuyCount).pow(game.v.universeUnlocks[0] ? 1.35 : 1)
                }
                else if (game.v.currentUniverse == 1) {
                    return game.calculateMults('TM').pow(game.v.toiletBuyCount).gte("1e100") ? new Decimal("1e100").mul(game.calculateMults('TM').pow(game.v.toiletBuyCount)).pow(0.75).div('1e100').pow(0.25) : game.calculateMults('TM').pow(game.v.toiletBuyCount).pow(0.75)
                }
        }
    },
    format: function (x) {
        if (typeof x != 'object') {x = new Decimal(x)}
        if (x.lt(1000)) {return x.toFixed(2)}
        else {return x.mantissa.toFixed(2) + "e" + x.exponent}
    },
    formatInt: function (x) {
        if (typeof x != 'object') {x = new Decimal(x)}
        if (x.lt(1000)) {return x.toFixed(0)}
        else {return x.mantissa.toFixed(2) + "e" + x.exponent}
    },
    formatMili: function (x) {
        if (typeof x != 'object') {x = new Decimal(x)}
        if (x.lt(100000)) {return x.toFixed(2)}
        else {return x.mantissa.toFixed(2) + "e" + x.exponent}
    },
    tick: function () {
        let shitsPerTick = game.v.toilets.mul(game.v.toiletEff.mul(game.calculateMults('TMC')))

        game.html.shitsPerTick.innerHTML = `(${game.format(shitsPerTick)} shits/tick)`

        game.v.shitCount = game.v.shitCount.add(shitsPerTick)
        game.v.toilets = game.v.toilets.add(game.v.toiletProducers.mul(game.v.toiletProducerEff))

        game.html.toiletBtn.innerHTML = `Buy a toilet (${game.format(game.v.toiletCost)})`

        game.html.shitCount.innerHTML = `${game.format(game.v.shitCount)} times`

        game.html.toiletCount.innerHTML = game.v.unlockedShitGalaxies ? `You have ${game.format(game.v.toilets)} toilets (×${game.calculateMults('TMC').gte("1e100") ? (game.format(game.calculateMults('TMC')) + ' (Softcapped)') : game.format(game.calculateMults('TMC'))})` : `You have ${game.format(game.v.toilets)} toilets`

        game.html.toiletProducerBtn.innerHTML = `Buy a toilet producer (${game.format(game.v.toiletProducerCost)})`

        game.html.shitGalaxyCount.innerHTML = `Shit Galaxy (${game.formatInt(game.v.shitGalaxies)})`
        game.html.shitGalaxyBtn.innerHTML = `Reset your shits and buildings to gain a multiplier when you buy a Toilet.
        <br>
        (×${game.format(game.calculateMults('TM'))} → ×${game.format(game.calculateMults('TM').mul(game.v.shitGalaxyEff))})
        <br>
        Cost: ${game.format(game.v.shitGalaxyCost)}
        `

        game.html.toiletProducerCount.innerHTML = `You have ${game.format(game.v.toiletProducers)} toilet producers`

        game.v.toiletAutobuyerEnabled = game.html.autoShitterEnabled.checked

        if (game.v.toiletAutobuyerInterval*0.7 >= 50) {
            game.html.autoShitterUpgrade.innerHTML = `Increase Toilet Buyer speed by 30% (${game.formatMili(game.v.toiletAutobuyerInterval)}ms → ${game.formatMili(game.v.toiletAutobuyerInterval*0.7)}ms)
            <br>
            Cost: ${game.v.toiletAutobuyerUpgradeCost}`
        }
        else {
            game.html.autoShitterUpgrade.innerHTML = `Toilet Buyer speed: ${game.formatInt(game.v.toiletAutobuyerInterval)}ms (Capped)`
        }

        if (game.v.shitCount.gte(100) || game.v.unlockedToiletProducers) {
            game.html.toiletProducer.style.display = 'inline-block'
            game.v.unlockedToiletProducers = true
        }

        if (game.v.shitCount.gte(1e6) || game.v.unlockedShitGalaxies) {
            game.html.shitGalaxy.style.display = 'inline-block'
            game.v.unlockedShitGalaxies = true
        }

        if (game.v.shitCount.gte(1e15) || game.v.unlockedAutobuyers) {
            game.html.autoShitterTabBtn.style.display = 'inline-block'
            game.v.unlockedAutobuyers = true
        }
        
        if (game.v.shitCount.gte(1e100) || game.v.unlockedShittiverses) {
            game.html.shittiverseTabBtn.style.display = 'inline-block'
            game.v.unlockedShittiverses = true
        }

        game.checkAchievements()
        game.html.achievementsList.innerHTML = game.getAchievementString()
        game.html.lockedAchievements.innerHTML = game.getLockedAchievements()
        if (game.v.currentUniverse != 0) {
            let unlockedUni = game.checkShittiverseGoals(game.v.currentUniverse)
            game.v.universeUnlocks[game.v.currentUniverse-1] = unlockedUni
            if (unlockedUni) {
                game.enterShittiverse(0)
            }
        }

        for (let i=0; i<game.v.universeUnlocks.length; i++) {
            if (game.v.universeUnlocks[i]) {
                game.html.shittiverseNames[i].style.color = '#00ff0d'
            }
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
            game.shitGalaxyReset()

            game.v.shitGalaxies = game.v.shitGalaxies.add(1)
            game.v.shitGalaxyCostIncrease = game.v.shitGalaxyCostIncrease.mul(game.v.shitGalaxyCostIncInc)
            game.v.shitGalaxyCost = game.v.shitGalaxyCost.mul(game.v.shitGalaxyCostIncrease)
        }
    },

    shitGalaxyReset: function () {
        for (let key in game.beginningV) {
            if (constants.shitGalaxyReset.includes(key)) {
                game.v[key] = game.beginningV[key]
            }
        }
    }, 

    save: function () {
        return btoa(JSON.stringify(game.v)) + '%' + btoa(JSON.stringify(game.achievements))
    },
    load: function (savefile) {
        try {
            savefileDecoded = JSON.parse(atob(savefile.split("%")[0]))
            achievementsDecoded = JSON.parse(atob(savefile.split("%")[1]))
            for (let i=0; i<achievementsDecoded.length; i++) {
                game.achievements[i].unlocked = achievementsDecoded[i].unlocked
            }
        }
        catch {
            console.log('Old savefile detected...')
            savefileDecoded = JSON.parse(atob(savefile))
        }
        for (let key in savefileDecoded) {
            if (typeof savefileDecoded[key] == 'string') {
                savefileDecoded[key] = new Decimal(savefileDecoded[key])
            }
            game.v[key] = savefileDecoded[key]
        }
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
        for (let i=0; i<game.html.tabs.length; i++) {
            game.html.tabs[i].style.display = 'none'
        }
        game.html.tabs[t].style.display = 'block'
    },
    subTab: function (t) {
        switch (t) {
            case '2a':
                game.html.subTab2b.style.display = 'none'
                game.html.subTab2a.style.display = 'block'
                break
            case '2b':
                game.html.subTab2a.style.display = 'none'
                game.html.subTab2b.style.display = 'block'
                break
        }
    },
    locked: function () {
        alert('Pay 1000000SIMUI to unlock that button!')
        prompt('Pay at:', 'https://bit.ly/47Jiz2O')
    },
    runAutobuyers: function () {
        if (Date.now() - game.v.toiletAutobuyersLast >= game.v.toiletAutobuyerInterval) {
            game.buyToilet()
            game.v.toiletAutobuyersLast = Date.now()
        }
    },
    upgradeShitter: function () {
        if (game.v.shitCount.gte(game.v.toiletAutobuyerUpgradeCost) && game.v.toiletAutobuyerInterval*0.7 > 50) {
            game.v.toiletAutobuyerInterval *= 0.7
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletAutobuyerUpgradeCost)
            game.v.toiletAutobuyerUpgradeCost = game.v.toiletAutobuyerUpgradeCost.mul(game.v.toiletAutobuyerUpgradeCostInc)
        }
    },
    unlockAchievements: function(i, condition) {
        if (condition) {
            game.achievements[i].unlocked = true
            new Audio('fart-achievement.mp3').play()
        }
    },
    checkAchievements: function () {
        game.achievements.forEach(e => {
            if (!e.unlocked) {
                switch (e.id) {
                    case 1:
                        game.unlockAchievements(0, game.v.toilets.gte(1))
                        break
                    case 2:
                        game.unlockAchievements(1, game.v.toiletProducers.gte(1))
                        break
                    case 3:
                        game.unlockAchievements(2, game.v.shitGalaxies.gte(1))
                        break
                    case 4:
                        game.unlockAchievements(3, game.v.shitCount.gte(1e15))
                        break
                    case 5:
                        game.unlockAchievements(4, game.v.shitGalaxies.gte(1))
                        break
                    case 6:
                        game.unlockAchievements(5, game.v.shitCount.gte(1e87))
                        break
                    case 7:
                        game.unlockAchievements(6, game.v.universeUnlocks[0])
                        break
                }
            }
         })
    },
    getAchievementString: function () {
        let acstr = ''
        game.achievements.forEach(e => {
            if (e.unlocked) {
                acstr += `
                <br>
                ------------
                <br>
                Achievement: ${e.name} (ID: ${e.id})
                <br>
                Description: ${e.description}
                <br>
                `
            }
        })
        return acstr
    },
    getLockedAchievements: function () {
        let achievementsHighest = 0
        game.achievements.forEach(e => {
            if (e.unlocked) {
                if (achievementsHighest < e.id) {
                    achievementsHighest = e.id
                }
            }
        })

        let acstr = ''

        for (let i=0; i<achievementsHighest+10; i++) {
            if (i < game.achievements.length) {
                if (!game.achievements[i].unlocked) {
                    acstr += `
                    <br>
                    ------------
                    <br>
                    Achievement: ${game.achievements[i].name} (ID: ${game.achievements[i].id})
                    <br>
                    Description: ${game.achievements[i].description}
                    <br>
                    `
                }
            }
        }

        return acstr
    },
    enterShittiverse: function (i) {
        if (i == 0) {
            Array.prototype.slice.call(game.html.shittiverseEnterBtns).forEach(e => {
                e.innerHTML = "Enter"
            })
            game.v.currentUniverse = 0
            game.resetUniverse(0)
        }
        else {
            Array.prototype.slice.call(game.html.shittiverseEnterBtns).forEach(e => {
                e.innerHTML = "Enter"
            })
            game.html.shittiverseEnterBtns[i-1].innerHTML = "Exit"
            game.v.currentUniverse = i
            game.resetUniverse(i)
        }
    },
    resetUniverse: function (i) {
        for (let key in game.beginningV) {
            if (constants.universeReset.includes(key)) {
                game.v[key] = game.beginningV[key]
            }
        }
        game.html.autoShitterTabBtn.style.display = 'none'
        game.html.shitGalaxy.style.display = 'none'
        game.universe = i
    },
    checkShittiverseGoals: function (i) {
        switch (i) {
            case 1:
                return game.v.shitCount.gte(1e50)
        }
    }
}

game.initialize()

setInterval(function () {
    game.tick()
    if (game.v.unlockedAutobuyers && game.v.toiletAutobuyerEnabled) {
        game.runAutobuyers()
    } 
}, 50)
setInterval(game.tickerUpdate, 14000)
setInterval(game.playFart, 10000)
setInterval(game.saveBrowser, 5000)