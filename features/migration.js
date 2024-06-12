register("command", () => {
    // WATER_SC + COUNTER + TIME
    waterSeaCreature.forEach(element => {
        datav2["seaCreaturesGlobal"][element].count = playerData["WATER_SC"][element] ? playerData["WATER_SC"][element] : 0
        datav2["seaCreaturesGlobal"][element].since = playerData["COUNTER"][element] ? playerData["COUNTER"][element] : 0
        datav2["seaCreaturesGlobal"][element].time = playerData["TIME"][element] ? playerData["TIME"][element] : 0
    });

    LAVA_SC + COUNTER + TIME
    lavaSeaCreature.forEach(element => {
        datav2["seaCreaturesGlobal"][element].count = playerData["LAVA_SC"][element] ? playerData["LAVA_SC"][element] : 0
        datav2["seaCreaturesGlobal"][element].since = playerData["COUNTER"][element] ? playerData["COUNTER"][element] : 0
        datav2["seaCreaturesGlobal"][element].time = playerData["TIME"][element] ? playerData["TIME"][element] : 0
    });

    //DROPS
    Object.values(itemDrop).forEach(element => {
        datav2["rareDrops"][element].since = playerData[element]["current_count"]
        datav2["rareDrops"][element].time = playerData[element]["time_drop"]
        for (let i = 0; i < playerData[element]["count_to_drop"].length; i++) {
            let count_idx = playerData[element]["count_to_drop"][i]
            let mf_idx = playerData[element]["magic_find"][i]
            msg = `MF: ${mf_idx} KILLS:${count_idx}`
            datav2["rareDrops"][element].archive.push(msg)
        }
    })

    //DIANA
    //TODO

    //AVG DATA
    //TODO
    datav2.save();
}).setName("mixupdate");