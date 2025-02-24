import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @NumberProperty,
    @DecimalSliderProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant
} from "Vigilance/index";

const TABname = "   ▪ ";

@Vigilant("MixendMod", "MixendMod", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Fishing", "Crimson Isle", "Sea Creature Armor", "Magic Find", "Magma Core", "Diana", "Party", "Pet", "Catch session", "Fishing GUI"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this)
        this.setCategoryDescription(`General information about MixendMod`);
        this.setCategoryDescription("Fishing", `Fishing related settings`);

        // Catch session GUI
        this.addDependency(`Catch session GUI times`, "Catch session GUI");
        this.addDependency(`Catch session GUI percentages`, "Catch session GUI");

        // Fishing GUI
        this.addDependency(`${TABname}Mythic creature count`, "Fishing GUI");
        this.addDependency(`${TABname}Bobber`, "Fishing GUI");
        this.addDependency(`${TABname}Active pet`, "Fishing GUI");

        this.addDependency(`${TABname}Catch rate`, "Fishing GUI");
        this.addDependency(`${TABname}Catching rate window length`, "Fishing GUI");

        // Crimson catch
        this.addDependency(`${TABname}Lord Jawbus message`, "Lord Jawbus catch");
        this.addDependency(`${TABname}Thunder message`, "Thunder catch");
        this.addDependency(`${TABname}Plhlegblast message`, "Plhlegblast catch");

        // Other catch
        this.addDependency(`${TABname}Sea Emperor message`, "Sea Emperor catch");
        this.addDependency(`${TABname}Water Hydra message`, "Water Hydra catch");
        this.addDependency(`${TABname}Abyssal Miner message`, "Abyssal Miner catch");
        this.addDependency(`${TABname}Carrot King message`, "Carrot King catch");
        this.addDependency(`${TABname}Phantom Fisherman message`, "Phantom Fisherman catch");
        this.addDependency(`${TABname}Grim Reaper message`, "Grim Reaper catch");
        this.addDependency(`${TABname}Yeti message`, "Yeti catch");
        this.addDependency(`${TABname}Reindrake message`, "Reindrake catch");
        this.addDependency(`${TABname}Great White Shark message`, "Great White Shark catch");

        // Other
        this.addDependency(`${TABname}Double hook message`, "Double hook");

        // Other 
        this.addDependency(`${TABname}Enable party transfer`, "Enable party commands");
        this.addDependency(`${TABname}Enable party warp`, "Enable party commands");

        this.addDependency(`${TABname}Radioactive Vial`, "Magic Find party ping");
        this.addDependency(`${TABname}Lucky Clover Core`, "Magic Find party ping");
        this.addDependency(`${TABname}Deep Sea Orb`, "Magic Find party ping");
        this.addDependency(`${TABname}Daedalus Stick`, "Magic Find party ping");

        this.addDependency(`${TABname}Worm cap threshold`, "Ping worm cap");
        this.addDependency(`${TABname}Magma core cap threshold`, "Ping magma core cap");

        // VANQUISHER
        this.addDependency(`${TABname}Vanquisher coords`, "Vanquisher spawn");
        this.addDependency(`${TABname}Vanquisher message`, "Vanquisher spawn");

        this.addDependency(`${TABname}Blazing Fortune`, "Sea creature armor attribute");
        this.addDependency(`${TABname}Magic Find`, "Sea creature armor attribute");
        this.addDependency(`${TABname}Fishing Experience`, "Sea creature armor attribute");
        this.addDependency(`${TABname}Infection`, "Sea creature armor attribute");

    }

    // ====================================================
    //#region General
    //#region party commands
    @TextProperty({
        name: `Party code invite`,
        description: `People who DM you this will get invited to your party\nLeave blank to disable`,
        category: "Party",
        subcategory: "Party commands",
    })
    partyCode = "sendmeinvite";

    @SwitchProperty({
        name: "Enable party commands",
        description: "Allows other party members to access some party commands",
        category: "Party",
        subcategory: "Party commands",
    })
    enablePartyCommands = false;

    @CheckboxProperty({
        name: `${TABname}Enable party warp`,
        description: `Enable !warp to warp the party to the leader lobby`,
        category: "Party",
        subcategory: "Party commands",
    })
    enablePartyWarp = false;

    @CheckboxProperty({
        name: `${TABname}Enable party transfer`,
        description: `Enable !pt <PlayerName> to transfer the party to the specified player\n!pt and !ptme also available`,
        category: "Party",
        subcategory: "Party commands",
    })
    enablePartyTransfer = false;
    //#endregion party commands

    //#region Pets
    @CheckboxProperty({
        name: `Pet level up warning`,
        description: `Displays a message on screen when a pet levels to 95 or higher`,
        category: "Pet",
        subcategory: "Pet",
    })
    petLevelWarning = false;

    @CheckboxProperty({
        name: `Add pet percentage progress`,
        description: 'Adds Your Pet leveled up to level 0! [00.00%%]',
        category: "Pet",
        subcategory: "Pet",
    })
    petPercentageProgress = false;

    @CheckboxProperty({
        name: `Hide summon pet`,
        description: `Hides "You summoned your Pet!" messages`,
        category: "Pet",
        subcategory: "Pet",
    })
    petSummonHide = false;

    @CheckboxProperty({
        name: `Hide autopet message`,
        description: `Hides "Autopet equipped your [Lvl 0] Pet! VIEW RULE" messages`,
        category: "Pet",
        subcategory: "Pet",
    })
    petAutopetHide = false;

    //#endregion Pets
    @CheckboxProperty({
        name: `Spirit mask display`,
        description: `Displays a screen message when spirit mask is used / ready`,
        category: "General",
        subcategory: "Misc",
    })
    spiritMaskFeature = false;

    @CheckboxProperty({
        name: `Thunder bottle display`,
        description: `Displays a screen message when a thunder bottle is filled`,
        category: "General",
        subcategory: "Misc",
    })
    thunderBottleFeature = false;

    @CheckboxProperty({
        name: `Tribe Member filter`,
        description: `Filters out the Tribe Member yap in the jungle`,
        category: "General",
        subcategory: "Other",
    })
    removeTribeYap = false;

    
    @CheckboxProperty({
        name: `Combo filter`,
        description: `Filters out the Combo yap`,
        category: "General",
        subcategory: "Other",
    })
    removeComboYap = false;
    //#endregion General

    // ====================================================

    //#region Fishing

    //#region Catch session GUI
    @SwitchProperty({
        name: "Catch session GUI",
        description: "Display catch session for crimson isle fishing. /mixgui session to move",
        category: "Catch session",
        subcategory: "Catch session GUI",
    })
    catchSession = false;

    @CheckboxProperty({
        name: "Catch session GUI times",
        description: "Display times since last sc in the catch session GUI",
        category: "Catch session",
        subcategory: "Catch session GUI",
    })
    catchSessionTime = false;

    @CheckboxProperty({
        name: "Catch session GUI percentages",
        description: "Display percentages in the catch session GUI",
        category: "Catch session",
        subcategory: "Catch session GUI",
    })
    catchSessionPercentage = false;
    //#endregion Catch session GUI

    //#region Fishing GUI
    @SwitchProperty({
        name: "Fishing GUI",
        description: "Display fishing GUI. /mixgui fish to move",
        category: "Fishing GUI",
        subcategory: "Fishing GUI"
    })
    fishingGUI = false;

    @CheckboxProperty({
        name: `${TABname}Mythic creature count`,
        description: `Display creature catch since mythic. Jawbus & Thunder`,
        category: "Fishing GUI",
        subcategory: "Fishing GUI"
    })
    fishingGUIMythic = false;

    @CheckboxProperty({
        name: `${TABname}Bobber`,
        description: `Display bobber count. Requires bobbers to be rendered in your game`,
        category: "Fishing GUI",
        subcategory: "Fishing GUI"
    })
    fishingGUIBobbers = false;

    @CheckboxProperty({
        name: `${TABname}Active pet`,
        description: `Display active pet. Requires to summon your pet again, or trigger a pet rule to activate`,
        category: "Fishing GUI",
        subcategory: "Fishing GUI"
    })
    fishingGUIPet = false;

    @CheckboxProperty({
        name: `${TABname}Catch rate`,
        description: `Display sea creature catch rate. Value is sea creature per minutes over the last 20 minutes by default.`,
        category: "Fishing GUI",
        subcategory: "Fishing GUI"
    })
    fishingGUIRate = false;

    @SliderProperty({
        name: `${TABname}Catching rate window length`,
        description: `Set window duration for moving average computation (minutes)`,
        category: "Fishing GUI",
        subcategory: "Fishing GUI",
        min: 1,
        max: 60
    })
    fishingGUILength = 5;
    //#endregion Fishing GUI

    //#region Crimson catch
    //
    //
    //#region Lord Jawbus
    @CheckboxProperty({
        name: `Lord Jawbus catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Crimson catch",
    })
    jawbusPartyPing = false;

    @TextProperty({
        name: `${TABname}Lord Jawbus message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Crimson catch"
    })
    jawbusMessage = "";
    //#endregion Lord Jawbus
    //#region Thunder
    @CheckboxProperty({
        name: `Thunder catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Crimson catch",
    })
    thunderPartyPing = false;

    @TextProperty({
        name: `${TABname}Thunder message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Crimson catch"
    })
    thunderMessage = "";
    //#endregion Thunder
    //#region Plhlegblast
    @CheckboxProperty({
        name: `Plhlegblast catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Crimson catch",
    })
    plhlegblastPartyPing = false;

    @TextProperty({
        name: `${TABname}Plhlegblast message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Crimson catch"
    })
    plhlegblastMessage = "";
    //#endregion Plhlegblast

    @CheckboxProperty({
        name: `Sea creature armor attribute`,
        description: "Enables a chat feedback when dropping sea creature armor pieces with certain attributes",
        category: "Sea Creature Armor",
        subcategory: "Crimson catch",
    })
    seaCreatureFeedback = false;

    @CheckboxProperty({
        name: `${TABname}Blazing Fortune`,
        description: "Enables a chat feedback when dropping sea creature armor pieces with Blazing Fortune",
        category: "Sea Creature Armor",
        subcategory: "Crimson catch",
    })
    seaCreatureAmorBlazingFortune = false;

    @CheckboxProperty({
        name: `${TABname}Magic Find`,
        description: "Enables a chat feedback when dropping sea creature armor pieces with Magic find",
        category: "Sea Creature Armor",
        subcategory: "Crimson catch",
    })
    seaCreatureAmorMagicFind = false;

    @CheckboxProperty({
        name: `${TABname}Fishing Experience`,
        description: "Enables a chat feedback when dropping sea creature armor pieces with Fishing Experience",
        category: "Sea Creature Armor",
        subcategory: "Crimson catch",
    })
    seaCreatureAmorFishingExperience = false;

    @CheckboxProperty({
        name: `${TABname}Infection`,
        description: "Enables a chat feedback when dropping sea creature armor pieces with Infection",
        category: "Sea Creature Armor",
        subcategory: "Crimson catch",
    })
    seaCreatureAmorInfection = false;
    //#endregion Crimson catch

    //#region Other catch
    //
    //
    //
    //
    //
    //
    //#region Carrot King
    @CheckboxProperty({
        name: `Carrot King catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    carrotKingPartyPing = false;

    @TextProperty({
        name: `${TABname}Carrot King message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    carrotKingMessage = "";
    //#endregion Carrot King
    //#region Sea Emperor
    @CheckboxProperty({
        name: `Sea Emperor catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    seaEmperorPartyPing = false;

    @TextProperty({
        name: `${TABname}Sea Emperor message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    seaEmperorMessage = "";
    //#endregion Sea Emperor
    //#region Water Hydra
    @CheckboxProperty({
        name: `Water Hydra catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    waterHydraPartyPing = false;

    @TextProperty({
        name: `${TABname}Water Hydra message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    waterHydraMessage = "";
    //#endregion Water Hydra
    //#region Abyssal Miner
    @CheckboxProperty({
        name: `Abyssal Miner catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    abyssalMinerPartyPing = false;

    @TextProperty({
        name: `${TABname}Abyssal Miner message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    abyssalMinerMessage = "";
    //#endregion Abyssal Miner
    //#region Phantom Fisherman
    @CheckboxProperty({
        name: `Phantom Fisherman catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    phantomFishermanPartyPing = false;

    @TextProperty({
        name: `${TABname}Phantom Fisherman message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    phantomFishermanMessage = "";
    //#endregion Phantom Fisherman
    //#region Grim Reaper
    @CheckboxProperty({
        name: `Grim Reaper catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    grimReaperPartyPing = false;

    @TextProperty({
        name: `${TABname}Grim Reaper message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    grimReaperMessage = "";
    //#endregion Grim Reaper
    //#region Yeti
    @CheckboxProperty({
        name: `Yeti catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    yetiPartyPing = false;

    @TextProperty({
        name: `${TABname}Yeti message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    yetiMessage = "";
    //#endregion Yeti
    //#region Reindrake
    @CheckboxProperty({
        name: `Reindrake catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    reindrakePartyPing = false;

    @TextProperty({
        name: `${TABname}Reindrake message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    reindrakeMessage = "";
    //#endregion Reindrake
    //#region Great White Shark
    @CheckboxProperty({
        name: `Great White Shark catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "Other catch",
    })
    greatWhiteSharkPartyPing = false;

    @TextProperty({
        name: `${TABname}Great White Shark message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "Other catch"
    })
    greatWhiteSharkMessage = "";
    //#endregion Great White Shark
    //#endregion Other catch

    //#region Other
    @SwitchProperty({
        name: "Double hook",
        description: "Enable double hook party ping",
        category: "Fishing",
        subcategory: "Other"
    })
    sendDoubleHook = false;

    @TextProperty({
        name: `${TABname}Double hook message`,
        description: `Custom message sent to the party`,
        category: "Fishing",
        subcategory: "Other"
    })
    doubleHookMsg = "Noot noot >o<";

    @CheckboxProperty({
        name: `${TABname}Hide double hook message`,
        description: `Hides double hook message in chat`,
        category: "Fishing",
        subcategory: "Other",
    })
    doubleHookHide = false;

    @CheckboxProperty({
        name: `Mob catch extra information`,
        description: `Adds [xx in ..h..m..s] or [xx at ../h] to mob catch party pings`,
        category: "Fishing",
        subcategory: "Other",
    })
    catchMessageInformation = false;

    @SelectorProperty({
        name: "Party ping catch rate display mode",
        description: "Change the catch rate display\nO: 32 in 5m | I: 32 at 750/h",
        category: "Fishing",
        subcategory: "Other",
        options: ["32 in 5m", "32 at 750/h"]
    })
    catchPingMode = 0;

    @SwitchProperty({
        name: "Hypixel fishing catch message",
        description: "Display Hypixel default catch message feedback",
        category: "Fishing",
        subcategory: "Other",
    })
    catchMessageFeedback = true;

    @SwitchProperty({
        name: "Custom fishing catch message",
        description: "Add a custom fishing catch feedback for mythic creatures",
        category: "Fishing",
        subcategory: "Other",
    })
    catchMessageCustom = false;

    //#endregion Other

    //#endregion Fishing

    //#region Crimson Isle
    @SwitchProperty({
        name: `Miniboss GUI`,
        description: `Display miniboss status. /mixguimini to move`,
        category: "Crimson Isle",
        subcategory: "Miniboss"
    })
    guiMiniboss = false;

    //#region Vanquisher
    @CheckboxProperty({
        name: `Vanquisher spawn`,
        description: `Enable Vanquisher spawn party ping`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherPartyPing = false;

    @TextProperty({
        name: `${TABname}Vanquisher message`,
        description: `Changes the message sent to the party when spawning a Vanquisher.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Crimson Isle",
        subcategory: "Vanquisher"
    })
    vanquisherMessage = "";

    @CheckboxProperty({
        name: `${TABname}Vanquisher coords`,
        description: `Add coordinates to vanquisher spawning message`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherCoords = false;
    //#endregion Vanquisher
    //#endregion Crimson Isle

    //#region Magic Find
    @CheckboxProperty({
        name: `Custom Magic Find`,
        description: `Replaces "✯ Magic Find" by "α Mixend Luck"`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    customMagicFind = false;

    @SwitchProperty({
        name: "Magic Find party ping",
        description: "Send a party message when dropping a Magic Find item",
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    partyPingDrops = false;

    @CheckboxProperty({
        name: `${TABname}Radioactive Vial`,
        description: `Enable Radioactive Vial drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendRadioactiveVialPing = false;

    @CheckboxProperty({
        name: `${TABname}Lucky Clover Core`,
        description: `Enable Lucky Clover Core drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendLuckyCloverCorePing = false;

    @CheckboxProperty({
        name: `${TABname}Deep Sea Orb`,
        description: `Enable Deep Sea Orb drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendDeepSeaOrbPing = false;

    @CheckboxProperty({
        name: `${TABname}Daedalus Stick`,
        description: `Enable Daedalus Stick drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendDaedalusStickPing = false;
    //#endregion Magic Find

    // -----------------------------------
    // Magma Core
    // -----------------------------------
    //#region Magma Core
    @SwitchProperty({
        name: `Ping worm cap`,
        description: "Party ping when worm cap is hit",
        category: "Magma Core",
        subcategory: "Worm fishing"
    })
    wormCapPing = false;

    @SliderProperty({
        name: `${TABname}Worm cap threshold`,
        description: "Set worm count at which mob cap ping starts",
        category: "Magma Core",
        subcategory: "Worm fishing",
        min: 1,
        max: 60
    })
    wormCapThreshold = 19;

    @SwitchProperty({
        name: `Ping magma core cap`,
        description: "Party ping when magam core mobs cap is hit",
        category: "Magma Core",
        subcategory: "Magma core fishing",
    })
    magmacoreCapPing = false;

    @SliderProperty({
        name: `${TABname}Magma core cap threshold`,
        description: "Set lava flame+pigmen count at which mob cap ping starts",
        category: "Magma Core",
        subcategory: "Magma core fishing",
        min: 1,
        max: 60
    })
    magmacoreCapThreshold = 19;

    @SwitchProperty({
        name: `Magma core information`,
        description: "Adds some statistics in the chat when dropping a Magma Core\n\
        \"Average of x scs per core in x scs\n\
        Dry Timer: xm xxs\"",
        category: "Magma Core",
        subcategory: "Magma core fishing",
    })
    magmaCoreStats = false;
    //#endregion Magma Core

    // -----------------------------------
    // DIANA
    // -----------------------------------
    //#region Diana
    @SwitchProperty({
        name: `Enable diana features`,
        description: "Ping party on inq, track stuff, etc.\nKinda poopoo for now",
        category: "Diana"
    })
    enableDiana = false;
    //#endregion Diana
}

export default new Settings