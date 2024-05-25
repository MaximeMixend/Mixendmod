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

const TABname = " > ";

@Vigilant("MixendMod", "MixendMod", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Fishing", "Crimson Isle", "Magic Find", "Worm fishing", "Mining", "Diana"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this)
        this.setCategoryDescription(`General information about MixendMod`);
        this.setCategoryDescription("Fishing", `Fishing related settings`);

        // 1. Catch session GUI
        this.addDependency(`Catch session GUI times`, "Catch session GUI");
        this.addDependency(`Catch session GUI percentages`, "Catch session GUI");
        this.addDependency(`Catch session GUI scope`, "Catch session GUI");
        this.addDependency(`Catch session GUI fishing type`, "Catch session GUI");

        // 2. Fishing GUI
        this.addDependency(`${TABname}Mythic creature count`, "Fishing GUI");
        this.addDependency(`${TABname}Bobber`, "Fishing GUI");
        this.addDependency(`${TABname}Active pet`, "Fishing GUI");

        this.addDependency(`${TABname}Catch rate`, "Fishing GUI");
        this.addDependency(`${TABname}Catching rate window length`, "Fishing GUI");
        this.addDependency(`${TABname}Average mode`, "Fishing GUI");

        // 3. Crimson Catch
        this.addDependency(`${TABname}Lord Jawbus catch`, "Lord Jawbus settings");
        this.addDependency(`${TABname}Lord Jawbus sound`, "Lord Jawbus settings");
        this.addDependency(`${TABname}Lord Jawbus alert`, "Lord Jawbus settings");

        this.addDependency(`${TABname}Plhlegblast catch`, "Plhlegblast settings");
        this.addDependency(`${TABname}Plhlegblast sound`, "Plhlegblast settings");
        this.addDependency(`${TABname}Plhlegblast alert`, "Plhlegblast settings");

        this.addDependency(`${TABname}Thunder catch`, "Thunder settings");
        this.addDependency(`${TABname}Thunder sound`, "Thunder settings");
        this.addDependency(`${TABname}Thunder alert`, "Thunder settings");

        // 5. Other
        this.addDependency(`${TABname}Double hook message`, "Double hook");

        // Other 
        this.addDependency(`${TABname}Enable party transfer`, "Enable party commands");
        this.addDependency(`${TABname}Enable party warp`, "Enable party commands");

        this.addDependency(`${TABname}Cap threshold`, "Ping worm cap");
        this.addDependency(`${TABname}Radioactive Vial`, "Magic Find party ping");
        this.addDependency(`${TABname}Lucky Clover Core`, "Magic Find party ping");
        this.addDependency(`${TABname}Deep Sea Orb`, "Magic Find party ping");
        this.addDependency(`${TABname}Daedalus Stick`, "Magic Find party ping");


        // VANQUISHER
        this.addDependency(`${TABname}Vanquisher sound`, "Vanquisher settings");
        this.addDependency(`${TABname}Vanquisher alert`, "Vanquisher settings");
        this.addDependency(`${TABname}Vanquisher spawn`, "Vanquisher settings");
    }

    // ====================================================
    //#region General
    //#region party commands
    @SwitchProperty({
        name: "Enable party commands",
        description: "Allows other party members to access some party commands",
        category: "General",
        subcategory: "Party commands",
    })
    enablePartyCommands = true;

    @CheckboxProperty({
        name: `${TABname}Enable party warp`,
        description: `Enable !warp to warp the party to the leader lobby`,
        category: "General",
        subcategory: "Party commands",
    })
    enablePartyWarp = true;
    @CheckboxProperty({
        name: `${TABname}Enable party transfer`,
        description: `Enable !pt <PlayerName> to transfer the party to the specified player\n!pt and !ptme also available`,
        category: "General",
        subcategory: "Party commands",
    })
    enablePartyTransfer = true;
    //#endregion party commands
    //#endregion General

    // ====================================================

    //#region Fishing

    //#region 1. Catch session GUI
    @SwitchProperty({
        name: "Catch session GUI",
        description: "Display catch session for crimson isle fishing. /mixgui session to move",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSession = true;

    @SwitchProperty({
        name: "Catch session GUI times",
        description: "Display times since last sc in the catch session GUI",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSessionTime = true;

    @SwitchProperty({
        name: "Catch session GUI percentages",
        description: "Display percentages in the catch session GUI",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSessionPercentage = true;

    @SwitchProperty({
        name: "Catch session GUI scope",
        description: "O: current | I: global",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSessionScope = false;

    @SwitchProperty({
        name: "Catch session GUI fishing type",
        description: "O: LAVA | I: WATER ",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSessionFishingType = true;
    //#endregion 1. Catch session GUI

    //#region 2. Fishing GUI
    @SwitchProperty({
        name: "Fishing GUI",
        description: "Display fishing GUI. /mixgui fish to move",
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUI = true;

    @CheckboxProperty({
        name: `${TABname}Mythic creature count`,
        description: `Display creature catch since mythic. Jawbus & Thunder`,
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUIMythic = true;

    @CheckboxProperty({
        name: `${TABname}Bobber`,
        description: `Display bobber count. Requires bobbers to be rendered in your game`,
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUIBobbers = true;

    @CheckboxProperty({
        name: `${TABname}Active pet`,
        description: `Display active pet. Requires to summon your pet again, or trigger a pet rule to activate`,
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUIPet = true;

    @CheckboxProperty({
        name: `${TABname}Catch rate`,
        description: `Display sea creature catch rate. Value is sea creature per minutes over the last 20 minutes by default.`,
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUIRate = true;

    @SliderProperty({
        name: `${TABname}Catching rate window length`,
        description: `Set window duration for moving average computation (minutes)`,
        category: "Fishing",
        subcategory: "2. Fishing GUI",
        min: 1,
        max: 60
    })
    fishingGUILength = 5;

    @SwitchProperty({
        name: `${TABname}Average mode`,
        description: `ON: per hour, OFF: per minute`,
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUIAvgMode = true;
    //#endregion 2. Fishing GUI

    //#region 3. Crimson catch
    // Lord Jawbus

    @SwitchProperty({
        name: `Lord Jawbus settings`,
        description: `Turn ON/OFF Lord Jawbus related settings`,
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusSettings = true;

    @CheckboxProperty({
        name: `${TABname}Lord Jawbus catch`,
        description: "Party ping on catch",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusCatch = true;

    @CheckboxProperty({
        name: `${TABname}Lord Jawbus sound`,
        description: "Sound alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Lord Jawbus alert`,
        description: "Screen alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusScreenAlert = true;

    // Thunder

    @SwitchProperty({
        name: `Thunder settings`,
        description: `Turn ON/OFF Thunder related settings`,
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderSettings = true;

    @CheckboxProperty({
        name: `${TABname}Thunder catch`,
        description: "Party ping on catch",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderCatch = true;

    @CheckboxProperty({
        name: `${TABname}Thunder sound`,
        description: "Sound alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Thunder alert`,
        description: "Screen alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderScreenAlert = true;

    // Plhlegblast

    @SwitchProperty({
        name: `Plhlegblast settings`,
        description: `Turn ON/OFF Plhlegblast related settings`,
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastSettings = true;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast catch`,
        description: "Party ping on catch",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastCatch = true;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast sound`,
        description: "Sound alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast alert`,
        description: "Screen alert on detection",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastScreenAlert = true;
    //#endregion 3. Crimson catch

    //#region 4. Other catch
    @CheckboxProperty({
        name: `${TABname}Carrot King`,
        description: `Enable Carrot King catch party ping`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    sendCarrotKingCatch = true;

    @CheckboxProperty({
        name: `${TABname}Sea Emperor`,
        description: `Enable Sea Emperor catch party ping`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    sendSeaEmperorCatch = true;

    @CheckboxProperty({
        name: `${TABname}Phantom Fisherman`,
        description: `Enable Phantom Fisherman catch party ping`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    sendPhantomFishermanCatch = true;

    @CheckboxProperty({
        name: `${TABname}Grim Reaper`,
        description: `Enable Grim Reaper catch party ping`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    sendGrimReaperCatch = true;
    //#endregion 4. Other catch

    //#region 5. Other

    @SwitchProperty({
        name: "Double hook",
        description: "Enable double hook party ping",
        category: "Fishing",
        subcategory: "5. Other"
    })
    sendDoubleHook = true;

    @TextProperty({
        name: `${TABname}Double hook message`,
        description: `Custom message sent to the party`,
        category: "Fishing",
        subcategory: "5. Other"
    })
    doubleHookMsg = "Noot noot >o<";

    @SwitchProperty({
        name: "Party ping catch rate display mode",
        description: "Change the catch rate display\nOFF: 32 in 5m | ON: 32 at 750/h",
        category: "Fishing",
        subcategory: "5. Other",
    })
    catchPingMode = true;

    //#endregion catching rate settings

    //#endregion Fishing

    //#region Crimson Isle
    @SwitchProperty({
        name: `Miniboss GUI`,
        description: `Display miniboss status. /mixguimini to move`,
        category: "Crimson Isle",
        subcategory: "Miniboss"
    })
    guiMiniboss = true;

    //#region Vanquisher
    @SwitchProperty({
        name: `Vanquisher settings`,
        description: `Turn ON/OFF Vanquisher related settings`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherSettings = true;

    @CheckboxProperty({
        name: `${TABname}Vanquisher sound`,
        description: "Sound alert on detection",
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Vanquisher alert`,
        description: "Screen alert on detection",
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherScreenAlert = true;

    @CheckboxProperty({
        name: `${TABname}Vanquisher spawn`,
        description: `Enable Vanquisher spawn party ping`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    sendVanquisherPing = false;
    //#endregion Vanquisher
    //#endregion Crimson Isle

    //#region Magic Find
    @SwitchProperty({
        name: "Magic Find party ping",
        description: "Send a party message when dropping a Magic Find item",
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    partyPingDrops = true;

    @CheckboxProperty({
        name: `${TABname}Radioactive Vial`,
        description: `Enable Radioactive Vial drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendRadioactiveVialPing = true;

    @CheckboxProperty({
        name: `${TABname}Lucky Clover Core`,
        description: `Enable Lucky Clover Core drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendLuckyCloverCorePing = true;

    @CheckboxProperty({
        name: `${TABname}Deep Sea Orb`,
        description: `Enable Deep Sea Orb drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendDeepSeaOrbPing = true;

    @CheckboxProperty({
        name: `${TABname}Daedalus Stick`,
        description: `Enable Daedalus Stick drop party ping`,
        category: "Magic Find",
        subcategory: "Drop Party ping",
    })
    sendDaedalusStickPing = true;

    // ----------------Magic Find-------------------

    @SwitchProperty({
        name: "Magic find screen alert",
        description: "Alert on screen when dropping a Magic Find item",
        category: "Magic Find",
        subcategory: "Magic Find",
    })
    alertDrops = true;

    //#endregion Magic Find

    // -----------------------------------
    // Worms
    // -----------------------------------

    @SwitchProperty({
        name: `Ping worm cap`,
        description: "Party ping when worm cap hit",
        category: "Worm fishing"
    })
    wormCapPing = true;

    @SliderProperty({
        name: `${TABname}Cap threshold`,
        description: "Set worm count at which mob cap ping starts",
        category: "Worm fishing",
        min: 30,
        max: 60
    })
    wormCapThreshold = 59;

    // -----------------------------------
    // Mining
    // -----------------------------------

    @SwitchProperty({
        name: `Mining speed boost alert`,
        description: "Screen alert when Mining speed boost is used/available",
        category: "Mining"
    })
    alertMiningSpeedBoost = true;

    @TextProperty({
        name: `Mineshaft message`,
        description: `Custom message sent to the party when finding a mineshaft`,
        category: "Mining",
        subcategory: "Mineshaft"
    })
    mineshaftMessage = "!pt";

    // -----------------------------------
    // DIANA
    // -----------------------------------

    @SwitchProperty({
        name: `Enable diana features`,
        description: "Ping party on inq, track stuff, etc.",
        category: "Diana"
    })
    enableDiana = true;
}


export default new Settings