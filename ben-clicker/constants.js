var constants = {
    shitGalaxyReset: ['shitCount', 'toilets', 'toiletCost', 'toiletCostIncrease', 'toiletBuyCount', 'toiletProducers', 'toiletProducerCost', 'toiletProducerCostIncrease', 'toiletProducerEff'],
    shitUniverseReset: ['shitCount', 'toilets', 'toiletCost', 'toiletCostIncrease', 'toiletBuyCount', 'toiletProducers', 'toiletProducerCost', 'toiletProducerCostIncrease', 'toiletProducerEff', 'shitGalaxyCost', 'shitGalaxyCostIncrease', 'shitGalaxyCostIncInc', 'shitGalaxies'],
    universeReset: ['shitCount', 'toilets', 'toiletCost', 'toiletCostIncrease', 'toiletBuyCount', 'toiletProducers', 'toiletProducerCost', 'toiletProducerCostIncrease', 'unlockedToiletProducers', 'toiletProducerEff', 'shitGalaxies', 'shitGalaxyCost', 'shitGalaxyCostIncrease', 'shitGalaxyCostIncInc', 'unlockedShitGalaxies', 'unlockedAutobuyers', 'toiletAutobuyerInterval', 'toiletAutobuyerEnabled', 'toiletAutobuyerLast', 'toiletAutobuyerUpgradeCost'],
    universeNames: ['Normal Universe', 'Diarrheaverse', 'Ultraverse', 'Benverse', 'Meetfanverse', 'Toiletiverse', 'RVLKVerse', 'Stomachacheverse', 'LOL-Cringeverse'],
    tickers: ['Ben rơi vật lạ', 'Ben gặp sự cố khó nói', 'Ben ỉa đùn', 'Anh ơi mua SIM cho em', 'Anh ơi mua sub cho em', 'Hahahahaha cringtuber', 'Cringe', 'Worst-developer hahhaha', 'Nhớ đăng kí ultra interface', "Tuan Hai's fat mom hahaha", "tao béo", "Where is your dinininisour vringring", "SpeedyMcTrash", "Hyper-copycat", "Bestuber là tao", "hahahahahahahaha", "gị đăp", "xí đuông", "Con xuống đi", "đơi ri", "You are my special", '<a href="https://chubin.net">https://chubin.net</a>', 'Insert foreign object', 'Drop foreign object', 'Vringr', 'DUTLA INTERFACE', 'Bengay topical analgesic cream', 'BESTTUBER', 'Tin là Bb', 'BESTUBER', 'tao nói hải da đen', 'NGUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUJJUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', 'FEAIFHSA', 'LDHFL', 'SADJ HF', 'JKASDFHQUANOHG', 'ASHG', 'JASHFJHASKFHK', 'ASHFJASH', 'KFHE', 'KAHFKNGUEOAIHFASHFASHEFLAMEJFKASFDHSHAFOSHDUOCSHAJ', 'HASHFBAI IGAGHASDFSADFROIEF', 'SAJFWJAFLASFLANGGHE',' JASHGUSSARAEHOGISA', 'GHSUAALG', 'SHFSA', 'ak jpagngn jblj e,kasng jsls besafl a', 'kai cenat🥶kendrick🗿baby gronk😂baby gronk🗿chubin🗿ayo🍷🗿tiktok rizz party🤣skibidi🗿kendrick🗿kai cenat🤣kai cenat🗿level 0 gyatt🤣level 0 gyatt🗿rizz🥶rizzler🤣tiktok rizz party🗿sus🗿chubin😂kai cenat💀skibidi🥶ice spice🗿ayo💀sus💀baby gronk🍷🗿fanum tax🥶skibidi🤣level 50 gyatt🥶sus🤣ayo🤣ice spice💀rizz💀kai cenat😂level 50 gyatt🤣level 0 gyatt🍷🗿tiktok rizz party🗿sus💀skibidi🤣rizzler💀rizzler💀kai cenat💀sus🥶chubin💀kendrick🍷🗿kai cenat🥶drake🍷🗿ayo🤣drake💀skibidi toilet💀grimace shake🥶fanum tax💀kai cenat🥶ice spice🗿rizzler😂only in ohio🥶fanum tax🥶only in ohio🥶ice spice🍷🗿baby gronk💀fanum tax🍷🗿baby gronk😂skibidi toilet🗿grimace shake🍷🗿rizz🥶grimace shake💀ayo🤣skibidi🤣grimace shake🗿only in ohio😂ice spice🤣rizz💀skibidi😂grimace shake💀only in ohio🥶rizz🤣only in ohio🗿only in ohio🗿level 0 gyatt🗿rizzler💀skibidi toilet🤣skibidi toilet🍷🗿kendrick🤣sus🍷🗿rizzler🥶skibidi💀ayo🤣only in ohio🗿level 50 gyatt💀grimace shake🗿rizzler🤣grimace shake😂kai cenat🥶level 0 gyatt🤣kai cenat🤣grimace shake😂skibidi toilet🤣kai cenat💀grimace shake🍷🗿skibidi🗿kai cenat🗿only in ohio🥶', '9.6 đau bụng quá', 'awejt;lawhgkljawg[', 'awgjo uarwlkg wapk', 'ig jOW {0/ira jk]skp g R -', 'kr a]g-44og Ira4-g,k p}04war k}G 0ika r G,aKO ]i MKO {Ikw gKO ag] ok', 'eaw', 'k', 'e ]0waok', 'e0 ok', 'wa0[e k', 'awek g', '[[owe', 'w akfdoo0OA D', 'EAL', 'WEA K', 'KT', 'OJEGPASG', 'EGOAGJ', 'AG', 'BE HONEST / BE HUMBLE / BE RESPECTFUL / BE KIND / BE THE FUTURE', 'Beryllium Nitrogen Gallium Yttrium', 'Chắc tại tao là kai cenat ayo skibidi grimace shake skibidi toilet baby gronk rizz skibidi toilet fanum tax rizz sus level 0 gyatt ice spice ayo level 50 gyatt grimace shake skibidi baby gronk ayo fanum tax only in ohio grimace shake grimace shake level 0 gyatt only in ohio ice spice rizz skibidi','disantipregapsucokhonoikhidangbieudientrensankhautrongquanbartaimotchonaodoosapataitinhlaocaicuthethicomotsuperfantaiquanbarothanhphosapaolaocaidaomchubinchatquavadadutcaigidovaoquanchubinkhichubinlensankhaulaithivatlaroiluontaichozations', 'hahahahahaha', 'WHAA', 'HA', 'A HA', 'HAHAHAHA', 'HAA', 'AAAAHHHHHHHHHHHHHH', 'AHHHHHHHHHH', 'hahahahahahhahahaahahhahahaha', 'ahhahahaha', 'Hahhahahahaha', 'HahahahahahahahhaahhahHahahahahah', 'hohahohahoha', '😀 😬 😁 😂 😃 😄 😅 😆 😇 😉 😊 🙂 🙃 ☺️ 😋 😌 🤑 🤓 😎 🤗 😏 😐 😑 😖 😮 😪 🤐 😴 💀 ✌ 💪 🙆 🐰 🐖 🐇 🐓 🍑 🎗 🎭', '🙂 🙂 🙂 🙂 🙂 🙂 🙂 🙂 🙂 🙂 😀 😀 😀 😀 😁 😁 😁 😁 😁 😁 😁', '🚘 🚋 🚝 🚅 🚞 🚂 🚂 🚆 🛥 🏭', '🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬', '😡😡😡😡😡😡😡😡', '👺👺👺👺👺👺👺👺👺👺👺', '🤨🤔👎👎👎🖕🏼🖕🏼🖕🏼🤡🤡🤡🤡🤓🤓🤓😤😤🤬🤬😡😡'],
    factorial365: new Decimal("1"), // will be calculated at game.initialize()
}