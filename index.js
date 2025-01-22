let game = {
    v: {
        version: 1,

        currentUniverse: 0,
        timeSpeed: new Decimal(1),

        shitCount: new Decimal(10),
        ticksSinceLastReset: new Decimal(0),
        ticksSinceLastGalaxy: new Decimal(0),
        ticks: new Decimal(0),

        toilets: new Decimal(0),
        toiletCost: new Decimal(10),
        toiletCostIncrease: new Decimal(1.2),
        toiletCostIncreasePast9: new Decimal(1.21),
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
        shitGalaxyCostIncIncPast5: new Decimal("e50"),
        shitGalaxyCostIncIncPast9: new Decimal("e150"),
        unlockedShitGalaxies: false,

        unlockedAutobuyers: false,
        toiletAutobuyerInterval: 10000,
        toiletAutobuyerEnabled: false,
        toiletAutobuyersLast: Date.now(),
        toiletAutobuyerUpgradeCost: new Decimal('1e20'),
        toiletAutobuyerUpgradeCostInc: new Decimal('1e2'),

        autoshitterBulk: 1,
        autoshitterBulkCost: new Decimal(1e100),
        autoshitterBulkCostIncrease: new Decimal(1e50),

        universeUnlocks: [false, false, false, false, false],
        unlockedShittiverses: false,

        maniEnabled: false,
        maniEnabledFull: false,

        maniCooldown: 10*60*1000/50,
        maniLastStart: 0,
        maniCooldownCost: new Decimal("1e300"),
        maniCooldownCostInc: new Decimal("1e40"),

        maniPower: new Decimal(2),
        maniPowerCost: new Decimal("1e300"),
        maniPowerCostInc: new Decimal("1e50"),

        maniCycle: new Decimal(10*1000/50),
        maniCycleCost: new Decimal("1e300"),
        maniCycleCostInc: new Decimal("1e60"),

        toiletProducerAutobuyerInterval: 50000,
        toiletProducerAutobuyerEnabled: false,
        toiletProducerAutobuyersLast: Date.now(),
        toiletProducerAutobuyerUpgradeCost: new Decimal('1e500'),
        toiletProducerAutobuyerUpgradeCostInc: new Decimal('1e25'),
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
            name: "nice.",
            description: "Get 1e69 shits",
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
        },
        {
            id: 8,
            name: 'A Shitty Paradox',
            description: 'Unlock Ultraverse',
            unlocked: false,
        },
        {
            id: 9,
            name: 'RVLKV2024 CHAMPION REFERENCE???',
            description: 'Get 1e100 shits within 1 second of a new Shit Galaxy',
            reward: '',
            unlocked: false,
        },
        {
            id: 10,
            name: 'Getting Constipated',
            description: 'Unlock Benverse',
            unlocked: false,
        },
        {
            id: 11,
            name: 'Quick Diarrhea',
            reward: '',
            description: 'Get 1 Shit Galaxy in Diarrheaverse in 20 seconds',
            unlocked: false,
        },
        {
            id: 12,
            name: 'Ruler of Shits',
            reward: '',
            description: 'Get 1e500 shits',
            unlocked: false,
        },
        {
            id: 13,
            name: 'The Battle Cats (Gambling Addiction)',
            description: 'Get 7e777 shits',
            reward: '',
            unlocked: false,
        }
    ],
    html: {
        tabs: [document.getElementById('bengay'), document.getElementById('settings'), document.getElementById('achievements'), document.getElementById('auto-shitter'), document.getElementById('shittiverses'), document.getElementById('mani')],

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
        ultraverseDesc: document.getElementById('ultraverse-desc'),
        currentUniverse: document.getElementById('universe'),
        ultraverse: document.getElementById('ultraverse'),
        benverse: document.getElementById('benverse'),
        benverseDesc: document.getElementById('benverse-desc'),
        meetfanverse: document.getElementById('meetfanverse'),
        toiletiverse: document.getElementById('toiletiverse'),
        toiletiverseDesc: document.getElementById('toiletiverse-desc'),

        autoShitterBulkBuyButton: document.getElementById('shitter-bulk-upgrade'),

        maniButton: document.getElementById('mani-tab'),
        maniEnabled: document.getElementById('mani-enabled'),
        cooldownUpg: document.getElementById('cooldown-upg'),
        powerUpg: document.getElementById('power-upg'),
        cycleUpg: document.getElementById('cycle-upg'),
        speedTxt: document.getElementById('speed-txt'),
        untilActivation: document.getElementById('until-activation'),
        benImg: document.getElementById('ben-img'),

        toiletProdBtn: document.getElementById('toilet-prod-upgrade'),
        toiletProducerEnabled: document.getElementById('toilet-prod-enabled'),
        toiletProdBuyer: document.getElementById('toilet-prod-buyer'),

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
    calc: function (name) {
        switch (name) {
            case 'TM':
                return game.calc('GP').pow(game.v.shitGalaxies)
            case 'M':
                return (game.achievements[8].unlocked ? game.calc('A9M') : new Decimal(1)).mul(game.achievements[10].unlocked ? game.calc('A11M') : 1).mul(game.achievements[12].unlocked ? game.calc('A13M') : 1)
            case 'TMCB':
                return game.calc('TM').pow(game.v.toiletBuyCount).mul(game.calc('M')).gte("1e100") ? new Decimal("1e100").mul(game.calc('TM').pow(game.v.toiletBuyCount).mul(game.calc('M')).div('1e100').pow(0.25)).pow(game.v.universeUnlocks[0] && game.v.currentUniverse != 1 && game.v.currentUniverse != 4 ? 1.35 : 1) : game.calc('TM').pow(game.v.toiletBuyCount).mul(game.calc('M')).pow(game.v.universeUnlocks[0] && game.v.currentUniverse != 1 && game.v.currentUniverse != 4 ? 1.35 : 1)
            case 'TMC':
                switch (game.v.currentUniverse) {
                    case 0:
                        return game.calc('TMCB')
                    case 1:
                        return game.calc('TMCB').pow(0.75)
                    case 2:
                        return game.calc('TMCB').div(game.calc('U2D'))
                    case 3:
                        return game.calc('TMCB').mul(game.calc('U3D'))
                    case 4:
                        return game.calc('TMCB').pow(0.75).div(game.calc('U2D')).mul(game.calc('U3D'))
                    case 5:
                        return game.calc('TMCB').mul(game.calc('U5D'))
                }
            case 'U2D':
                return new Decimal(1.75).pow(game.v.shitCount.gt(0) ? game.v.shitCount.log(10) : 1)
            case 'U3D':
                return new Decimal(1).sub(new Decimal(60*60*1000/50).sub(game.v.ticksSinceLastReset).div(60*60*1000/50)).lte(1) ? new Decimal(1).sub(new Decimal(60*60*1000/50).sub(game.v.ticksSinceLastReset).div(60*60*1000/50)) : new Decimal(1)
            case 'A9M':
                return new Decimal(0.01).mul(game.v.ticksSinceLastReset.pow(2))
            case 'A11M':
                return game.v.shitCount.gt(0) ? new Decimal(1.5).pow(game.v.shitCount.log(10)) : new Decimal(1)
            case 'A12M':
                return game.v.shitCount.gt(0) ? game.v.shitCount.log(5) : new Decimal(1)
            case 'A13M':
                return game.v.toiletProducers.gt(0) ? game.v.toiletProducers.pow(3) : new Decimal(1)
            case 'T':
                return (game.v.maniEnabled && game.v.maniEnabledFull) ? (game.v.maniPower.mul(game.achievements[11] ? game.calc('A12M') : new Decimal(1))) : (game.achievements[11].unlocked ? game.calc('A12M') : new Decimal(1))
            case 'GP':
                return game.v.shitGalaxyEff.mul(game.v.universeUnlocks[3] ? 1.0005 : 1)
            case 'U5D':
                return game.v.ticksSinceLastReset.gte((1000/50)*60*60*10) ? 0 : new Decimal(1).sub(game.v.ticksSinceLastReset.div((1000/50)*60*60*10))
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
    mod: function(a, b) {
        return a.sub(a.div(b).floor().mul(b))
    },
    digit2Format: function(x) {
        x = x.floor().toString()
        if (x.length == 2) {return x}
        else if (x.length == 1) {return '0' + x}
    },
    formatTime: function (t) {
        if (typeof t != 'object') {t = new Decimal(t)}
        t = t.floor()
        totalSeconds = t.div(1000/50)
        sec = game.mod(totalSeconds, 60)
        min = game.mod(totalSeconds.div(60).floor(), 60)
        hrs = totalSeconds.div(3600).floor()
        if (hrs.gte(100)) {return '>100hrs'}
        if (hrs.gt(0)) {return `${game.digit2Format(hrs)}:${game.digit2Format(min)}:${game.digit2Format(sec)}`}
        if (hrs.eq(0) && min.gt(0)) {return `${game.digit2Format(min)}:${game.digit2Format(sec)}`}
        if (min.eq(0) && sec.gt(1)) {return `${game.format(game.mod(totalSeconds, 60))}s`}
        return `${game.formatMili(totalSeconds.mul(1000))}ms`
    },
    tick: function () {
        game.v.timeSpeed = game.calc('T')
        console.log(game.v.timeSpeed)
        let shitsPerTick = game.v.toilets.mul(game.v.toiletEff.mul(game.calc('TMC'))).mul(game.v.timeSpeed)

        game.html.shitsPerTick.innerHTML = `(${game.format(shitsPerTick)} shits/tick)`

        game.v.shitCount = game.v.shitCount.add(shitsPerTick)
        game.v.toilets = game.v.toilets.add(game.v.toiletProducers.mul(game.v.toiletProducerEff).mul(game.v.timeSpeed))

        game.html.toiletBtn.innerHTML = `Buy a toilet (${game.format(game.v.toiletCost)})`

        game.html.shitCount.innerHTML = `${game.format(game.v.shitCount)} times`

        game.html.toiletCount.innerHTML = (game.v.unlockedShitGalaxies || game.v.currentUniverse == 2) ? `You have ${game.format(game.v.toilets)} toilets (×${game.calc('TMC').gte("1e100") ? (game.format(game.calc('TMC')) + ' (Softcapped)') : game.format(game.calc('TMC'))})` : `You have ${game.format(game.v.toilets)} toilets`

        game.html.toiletProducerBtn.innerHTML = `Buy a toilet producer (${game.format(game.v.toiletProducerCost)})`

        game.html.shitGalaxyCount.innerHTML = `Shit Galaxy (${game.formatInt(game.v.shitGalaxies)})`
        game.html.shitGalaxyBtn.innerHTML = `Reset your shits and buildings to gain a multiplier when you buy a Toilet.
        <br>
        (×${game.format(game.calc('TM'))} → ×${game.format(game.calc('TM').mul(game.v.shitGalaxyEff))})
        <br>
        Cost: ${game.format(game.v.shitGalaxyCost)}
        `

        game.html.toiletProducerCount.innerHTML = `You have ${game.format(game.v.toiletProducers)} toilet producers`

        game.v.toiletAutobuyerEnabled = game.html.autoShitterEnabled.checked
        game.v.toiletProducerAutobuyerEnabled = game.html.toiletProducerEnabled.checked

        if (game.v.universeUnlocks[4]) {
            game.html.toiletProdBuyer.style.display = 'flex'
        }

        if (game.v.toiletAutobuyerInterval*0.7 >= 50) {
            game.html.autoShitterUpgrade.innerHTML = `Increase Toilet Buyer speed by 30% (${game.formatTime(game.v.toiletAutobuyerInterval/50)} → ${game.formatTime(game.v.toiletAutobuyerInterval*0.7/50)})
            <br>
            Cost: ${game.format(game.v.toiletAutobuyerUpgradeCost)}`
        }
        else {
            game.html.autoShitterUpgrade.innerHTML = `Toilet Buyer speed: ${game.formatInt(game.v.toiletAutobuyerInterval)}ms (Capped)`
        }

        if (game.v.toiletProducerAutobuyerInterval*0.7 >= 50) {
            game.html.toiletProdBtn.innerHTML = `Increase Toilet Producer Buyer speed by 30% (${game.formatTime(game.v.toiletProducerAutobuyerInterval/50)} → ${game.formatTime(game.v.toiletProducerAutobuyerInterval*0.7/50)})
            <br>
            Cost: ${game.format(game.v.toiletProducerAutobuyerUpgradeCost)}`
        }
        else {
            game.html.toiletProdBtn.innerHTML = `Toilet Buyer speed: ${game.formatInt(game.v.toiletProducerAutobuyerInterval)}ms (Capped)`
        }

        game.html.ultraverseDesc.innerHTML = `The more shits you get, the weaker your toilet multiplier will be (current: ÷${game.format(game.calc('U2D'))})`
        game.html.currentUniverse.innerHTML = `${game.v.currentUniverse} (${constants.universeNames[game.v.currentUniverse]})`

        game.html.autoShitterBulkBuyButton.innerHTML = game.v.autoshitterBulk < 100 ? `Increase bulk 
        <br>
        ${game.v.autoshitterBulk} → ${game.v.autoshitterBulk + (game.v.autoshitterBulk == 1 ? 9 : 10)}
        <br>
        Cost: ${game.format(game.v.autoshitterBulkCost)}` : `Bulk: 100 (Capped)`

        game.html.benverseDesc.innerHTML = `Your toilet multiplier's power slowly increases from 0% over the span of 1 hour. Current: ${game.format(game.calc('U3D').mul(100))}%`
        
        game.html.toiletiverseDesc.innerHTML = `A multiplier on your toilet multiplier reduces from ×1 to ×0 over the span of 10 hours (game time). <br> Current: ×${game.formatMili(game.calc('U5D'))}`

        game.html.cooldownUpg.innerHTML = game.v.maniCooldown*0.8 > 5*1000/50 ? `Reduce activation cooldown by 20% <br> Cost: ${game.format(game.v.maniCooldownCost)} <br> (${game.formatTime(game.v.maniCooldown)} → ${game.formatTime(game.v.maniCooldown*0.8)})` : `Cooldown time: ${game.formatTime(game.v.maniCooldown)} (Capped)`
        game.html.powerUpg.innerHTML = `Increase power by 20% <br> Cost: ${game.format(game.v.maniPowerCost)} <br> (×${game.format(game.v.maniPower)} → ×${game.format(game.v.maniPower.mul(1.2))})`
        game.html.cycleUpg.innerHTML = `Increase cycle length by 20% <br> Cost: ${game.format(game.v.maniCycleCost)} <br> (${game.formatTime(game.v.maniCycle)} → ${game.formatTime(game.v.maniCycle.mul(1.2))})`

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
        
        if (game.v.universeUnlocks[1]) {
            game.html.autoShitterBulkBuyButton.style.display = 'inline-block'
        }

        if (game.v.universeUnlocks[0]) {
            game.html.ultraverse.style.display = 'inline-block'
            game.html.benverse.style.display = 'inline-block'
        }

        if (game.v.universeUnlocks[2]) {
            game.html.maniButton.style.display = 'inline-block'
            game.html.meetfanverse.style.display = 'inline-block'
        }

        game.updateAchievementRewards()
        game.checkAchievements()
        game.html.achievementsList.innerHTML = game.getAchievementString()
        game.html.lockedAchievements.innerHTML = game.getLockedAchievements()
        if (game.v.currentUniverse != 0) {
            if (game.checkShittiverseGoals(game.v.currentUniverse)) {
                game.v.universeUnlocks[game.v.currentUniverse-1] = true
                game.enterShittiverse(0)
            }
        }

        for (let i=0; i<game.v.universeUnlocks.length; i++) {
            if (game.v.universeUnlocks[i]) {
                game.html.shittiverseNames[i].style.color = '#00ff0d'
            }
        }

        if (game.tickerIsOffScreen()) {
            game.tickerUpdate()
        }
        
        game.v.maniEnabledFull = game.html.maniEnabled.checked
        game.v.timeSpeed = game.calc('T')

        if (game.v.maniEnabled && game.v.maniEnabledFull) {
            game.html.benImg.style.filter = 'invert(1)'
        }
        else {
            game.html.benImg.style.filter = 'invert(0)'
        }
        
        if (game.v.maniEnabledFull) {
            if (Date.now()-(game.v.maniLastStart+Number(game.v.maniCycle)) > game.v.maniCooldown*50 && !game.v.     maniEnabled && game.v.universeUnlocks[2]) {
                game.v.maniEnabled = true
                game.v.maniLastStart = Date.now()
                new Audio('fart-mani.mp3').play()
            }
            if (Date.now()-game.v.maniLastStart > game.v.maniCycle*50 && game.v.maniEnabled && game.v.universeUnlocks[2]) {
                game.v.maniEnabled = false
                game.v.maniLastStart = Date.now()
            }

            game.html.untilActivation.innerHTML = game.v.maniEnabled ? `Time until activation ends: ${game.formatTime(((game.v.maniLastStart+Number(game.v.maniCycle)*50)-Date.now())/50)}` : `Time until next activation: ${game.formatTime(((game.v.maniLastStart+game.v.maniCooldown*50)-Date.now())/50)}`
            game.html.speedTxt.innerHTML = `×${game.format(game.v.timeSpeed)}`
        }
        else {
            game.v.maniEnabled = false
            game.html.speedTxt.innerHTML = `×${game.format(game.v.timeSpeed)}`
            game.html.untilActivation.innerHTML = `Shit-Time Manipulator disabled`
        }
        
        game.v.ticksSinceLastReset = game.v.ticksSinceLastReset.add(game.v.timeSpeed)
        game.v.ticksSinceLastGalaxy = game.v.ticksSinceLastGalaxy.add(game.v.timeSpeed)
        game.v.ticks = game.v.ticks.add(game.v.timeSpeed)
    },
    tickerIsOffScreen: function () {
        const ticker = document.querySelector('.ticker-content')
        const tickerRect = ticker.getBoundingClientRect()
        const container = document.querySelector('.news-ticker')
        const containerRect = container.getBoundingClientRect()

        return tickerRect.left > containerRect.right;
    },
    tickerUpdate: function () {
        game.html.ticker.innerHTML = constants.tickers[Math.floor(Math.random()*constants.tickers.length)]
    },
    buyToilet: function () {
        if (game.v.shitCount.gte(game.v.toiletCost)) {
            game.v.toiletBuyCount = game.v.toiletBuyCount.add(1)
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletCost)
            if (game.v.shitGalaxies.gte(9)) {
                game.v.toiletCost = game.v.toiletCost.mul(game.v.toiletCostIncreasePast9)
            }
            else {
                game.v.toiletCost = game.v.toiletCost.mul(game.v.toiletCostIncrease)
            }
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
            if (game.v.shitGalaxies.gte(9)) {
                game.v.shitGalaxyCostIncrease = game.v.shitGalaxyCostIncrease.mul(game.v.shitGalaxyCostIncIncPast9)
                game.v.shitGalaxyCost = game.v.shitGalaxyCost.mul(game.v.shitGalaxyCostIncrease)
            }
            else if (game.v.shitGalaxies.gte(5)) {
                game.v.shitGalaxyCostIncrease = game.v.shitGalaxyCostIncrease.mul(game.v.shitGalaxyCostIncIncPast5)
                game.v.shitGalaxyCost = game.v.shitGalaxyCost.mul(game.v.shitGalaxyCostIncrease)
            }
            else {
                game.v.shitGalaxyCostIncrease = game.v.shitGalaxyCostIncrease.mul(game.v.shitGalaxyCostIncInc)
                game.v.shitGalaxyCost = game.v.shitGalaxyCost.mul(game.v.shitGalaxyCostIncrease)
            }
        }
    },
    shitGalaxyReset: function () {
        for (let key in game.beginningV) {
            if (constants.shitGalaxyReset.includes(key)) {
                game.v[key] = game.beginningV[key]
            }
        }
        game.v.ticksSinceLastGalaxy = new Decimal(0)
    }, 
    save: function () {
        return btoa(JSON.stringify(game.v)) + '%' + btoa(JSON.stringify(game.achievements))
    },
    load: function (savefile) {
        //try {
            savefileDecoded = JSON.parse(atob(savefile.split("%")[0]))
            achievementsDecoded = JSON.parse(atob(savefile.split("%")[1]))
            for (let i=0; i<achievementsDecoded.length; i++) {
                game.achievements[i].unlocked = achievementsDecoded[i].unlocked
            }
        //}
        //catch {
            //console.log('Old savefile detected...')
            //savefileDecoded = JSON.parse(atob(savefile))
        //}
        if (savefileDecoded.version >= game.v.version) {
            for (let key in savefileDecoded) {
                if (typeof savefileDecoded[key] == 'string') {
                    savefileDecoded[key] = new Decimal(savefileDecoded[key])
                }
                game.v[key] = savefileDecoded[key]
            }
        }
        else {
            localStorage.removeItem('savefile')
            location.reload(true)
        }
    },
    playFart: function () {
        new Audio(`fart${Math.floor(4*Math.random()+1)}.mp3`).play()
    },
    promptLoad: function () {
        try {
            game.load(prompt('Savefile:'))
        }
        catch (error) {
            alert('Invalid savefile!')
            console.log(error)
        }
    },
    promptSave: function () {
        navigator.clipboard.writeText(game.save());
        alert('Copied to clipboard!')
    },
    promptDelete: function () {
        if (prompt('Are you sure you want to reset the game? If yes, type "Ben RVLKV2024"') == 'Ben RVLKV2024') {
            localStorage.clear()
            alert('Please reload the website.')
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
        if (game.v.unlockedAutobuyers && game.v.toiletAutobuyerEnabled) {
            if (Date.now() - game.v.toiletAutobuyersLast >= game.v.toiletAutobuyerInterval) {
                for (let i=0; i<game.v.autoshitterBulk; i++) {
                    game.buyToilet()
                }
                game.v.toiletAutobuyersLast = Date.now()
            }
        }
        if (game.v.unlockedAutobuyers && game.v.toiletProducerAutobuyerEnabled) {
            if (Date.now() - game.v.toiletProducerAutobuyersLast >= game.v.toiletProducerAutobuyerInterval) {
                for (let i=0; i<100; i++) {
                    game.buyToiletProducer()
                }
                game.v.toiletProducerAutobuyersLast = Date.now()
            }
        }
    },
    upgradeShitter: function (k) {
        if (game.v.shitCount.gte(game.v.toiletAutobuyerUpgradeCost) && game.v.toiletAutobuyerInterval*0.7 > 50 && k == 0) {
            game.v.toiletAutobuyerInterval *= 0.7
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletAutobuyerUpgradeCost)
            game.v.toiletAutobuyerUpgradeCost = game.v.toiletAutobuyerUpgradeCost.mul(game.v.toiletAutobuyerUpgradeCostInc)
        }
        else if (game.v.shitCount.gte(game.v.toiletProducerAutobuyerUpgradeCost) && game.v.toiletProducerAutobuyerInterval*0.7 > 50 && k == 1) {
            game.v.toiletProducerAutobuyerInterval *= 0.7
            game.v.shitCount = game.v.shitCount.sub(game.v.toiletProducerAutobuyerUpgradeCost)
            game.v.toiletProducerAutobuyerUpgradeCost = game.v.toiletProducerAutobuyerUpgradeCost.mul(game.v.toiletProducerAutobuyerUpgradeCostInc)
        }
    },
    upgradeShitterBulk: function () {
        if (game.v.shitCount.gte(game.v.autoshitterBulkCost) && game.v.autoshitterBulk < 100) {
            game.v.shitCount = game.v.shitCount.sub(game.v.autoshitterBulkCost)
            if (game.v.autoshitterBulk == 1) {
                game.v.autoshitterBulk += 9
            }
            else {
                game.v.autoshitterBulk += 10
            }
            game.v.autoshitterBulkCost = game.v.autoshitterBulkCost.mul(game.v.autoshitterBulkCostIncrease)
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
                        game.unlockAchievements(4, game.v.shitCount.gte(1e69))
                        break
                    case 6:
                        game.unlockAchievements(5, game.v.shitCount.gte(1e87))
                        break
                    case 7:
                        game.unlockAchievements(6, game.v.universeUnlocks[0])
                        break
                    case 8:
                        game.unlockAchievements(7, game.v.universeUnlocks[1])
                        break
                    case 9:
                        game.unlockAchievements(8, game.v.ticksSinceLastGalaxy.lte(15*1000/50) && game.v.shitCount.gte(1e100))
                    case 10:
                        game.unlockAchievements(9, game.v.universeUnlocks[2])
                    case 11:
                        game.unlockAchievements(10, game.v.currentUniverse == 1 && game.v.shitGalaxies.gte(1) && game.v.ticksSinceLastReset.lte(20*1000/50))
                    case 12:
                        game.unlockAchievements(11, game.v.shitCount.gte("1e500"))
                    case 13:
                        game.unlockAchievements(12, game.v.shitCount.gte("7e777"))
                }
            }
         })
    },
    updateAchievementRewards: function () {
        game.achievements[8].reward = `Unlock a multiplier to your toilets that increases over time since last universe reset (Current: ×${game.format(game.calc('A9M'))})`
        game.achievements[10].reward = `Unlock a multiplier that increases based on the number of shits you have (Current: ×${game.format(game.calc('A11M'))})`
        game.achievements[11].reward = `Unlock a multiplier to Shittiverse time speed that increases based on the number of shits you have (Current: ×${game.format(game.calc('A12M'))})`
        game.achievements[12].reward = `Unlock a multiplier to your toilets based on Toilet Producers (Current: ×${game.format(game.calc('A13M'))})`
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
                ${e.reward ? ('Reward: ' + e.reward + '<br>') : ''}
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

        for (let i=0; i<achievementsHighest+5; i++) {
            if (i < game.achievements.length) {
                if (!game.achievements[i].unlocked) {
                    acstr += `
                    <br>
                    ------------
                    <br>
                    Achievement: ${game.achievements[i].name} (ID: ${game.achievements[i].id})
                    ${game.achievements[i].reward ? ('<br> Reward: ' + game.achievements[i].reward) : ''}
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
        if (i == 0 || game.v.currentUniverse == i) {
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
        game.v.ticksSinceLastReset = new Decimal(0)
    },
    checkShittiverseGoals: function (i) {
        switch (i) {
            case 1:
                return game.v.shitCount.gte(1e50)
            case 2:
                return game.v.shitCount.gte(1e50)
            case 3:
                return game.v.shitCount.gte(1e150)
            case 4:
                return game.v.shitCount.gte(1e65)
            case 5:
                return game.v.shitCount.gte("1e500")
        }
    },
    maniCooldownUpgrade: function () {
        if (game.v.shitCount.gte(game.v.maniCooldownCost) && game.v.maniCooldown*0.8 > 5*1000/50) {
            game.v.shitCount = game.v.shitCount.sub(game.v.maniCooldownCost)
            game.v.maniCooldownCost = game.v.maniCooldownCost.mul(game.v.maniCooldownCostInc)

            game.v.maniCooldown *= 0.8
        }
    },
    maniPowerUpgrade: function () {
        if (game.v.shitCount.gte(game.v.maniPowerCost)) {
            game.v.shitCount = game.v.shitCount.sub(game.v.maniPowerCost)
            game.v.maniPowerCost = game.v.maniPowerCost.mul(game.v.maniPowerCostInc)

            game.v.maniPower = game.v.maniPower.mul(1.2)
        }
    },
    maniCycleUpgrade: function () {
        if (game.v.shitCount.gte(game.v.maniCycleCost)) {
            game.v.shitCount = game.v.shitCount.sub(game.v.maniCycleCost)
            game.v.maniCycleCost = game.v.maniCycleCost.mul(game.v.maniCycleCostInc)

            game.v.maniCycle = game.v.maniCycle.mul(1.2)
        }
    },
}

game.initialize()

setInterval(function () {
    game.tick()
    game.runAutobuyers()
}, 50)
setInterval(game.playFart, 10000)
setInterval(game.saveBrowser, 30000)