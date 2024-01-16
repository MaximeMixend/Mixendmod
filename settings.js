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
        const categories = ["General", "Fishing", "Notifications", "Worm fishing", "Mining"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this)
        this.setCategoryDescription(`General information about MixendMod`);
        this.setCategoryDescription("Fishing", `Fishing related settings`);

        this.addDependency(`${TABname}Double hook message`, "Double hook");
        this.addDependency(`${TABname}Thunder sound`, "Mythic screen alert");
        this.addDependency(`${TABname}Lord Jawbus sound`, "Mythic screen alert");

        this.addDependency(`${TABname}Thunder`, "Catch party pings");
        this.addDependency(`${TABname}Jawbus`, "Catch party pings");
        this.addDependency(`${TABname}Plhlegblast`, "Catch party pings");
        this.addDependency(`${TABname}Carrot King`, "Catch party pings");
        this.addDependency(`${TABname}Sea Emperor`, "Catch party pings");
        this.addDependency(`${TABname}Phantom Fisherman`, "Catch party pings");
        this.addDependency(`${TABname}Grim Reaper`, "Catch party pings");

        this.addDependency(`${TABname}Mythic creature count`, "Fishing GUI");
        this.addDependency(`${TABname}Bobber`, "Fishing GUI");
        this.addDependency(`${TABname}Active pet`, "Fishing GUI");

        this.addDependency(`${TABname}Catch rate`, "Fishing GUI");
        this.addDependency(`${TABname + TABname}Catching rate window length`, "Fishing GUI");
        this.addDependency(`${TABname + TABname}Average mode`, "Fishing GUI");

        this.addDependency(`${TABname}Cap threshold`, "Ping worm cap");
        this.addDependency(`${TABname}Radioactive Vial`, "Magic Find party ping");
        this.addDependency(`${TABname}Lucky Clover Core`, "Magic Find party ping");
        this.addDependency(`${TABname}Deep Sea Orb`, "Magic Find party ping");
    }

    // -----------------------------------
    // General
    // -----------------------------------

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
        description: `Enable !pt <PlayerName> to transfer the party to the specified player`,
        category: "General",
        subcategory: "Party commands",
    })
    enablePartyTransfer = true;

    // -----------------------------------
    // FISHING alerts
    // -----------------------------------

    @SwitchProperty({
        name: "Mythic screen alert",
        description: "Alert on screen when close to a legendary sea creature",
        category: "Fishing",
        subcategory: "Alert",
    })
    alertMythic = true;

    @SwitchProperty({
        name: `${TABname}Thunder sound`,
        description: "Alert sound when close to a Thunder",
        category: "Fishing",
        subcategory: "Alert",
    })
    alertThunderSound = true;

    @SwitchProperty({
        name: `${TABname}Lord Jawbus sound`,
        description: "Alert sound when close to a Lord Jawbus",
        category: "Fishing",
        subcategory: "Alert",
    })
    alertJawbusSound = true;

    @SwitchProperty({
        name: `${TABname}Plhlegblast sound`,
        description: "Alert sound when close to a Plhlegblast",
        category: "Fishing",
        subcategory: "Alert",
    })
    alertPlhlegblastSound = true;

    // -----------------------------------
    // FISHING pings
    // -----------------------------------

    @SwitchProperty({
        name: "Catch party pings",
        description: "Send a party message when catching a specific sea creature",
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendCatchPing = true;

    // ******************************

    @CheckboxProperty({
        name: `${TABname}Thunder`,
        description: `Enable Thunder catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendThunderCatch = true;

    @CheckboxProperty({
        name: `${TABname}Jawbus`,
        description: `Enable Jawbus catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendJawbusCatch = true;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast`,
        description: `Enable Plhlegblast catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendPlhlegblastCatch = true;

    @CheckboxProperty({
        name: `${TABname}Carrot King`,
        description: `Enable Carrot King catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendCarrotKingCatch = true;

    @CheckboxProperty({
        name: `${TABname}Sea Emperor`,
        description: `Enable Sea Emperor catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendSeaEmperorCatch = true;

    @CheckboxProperty({
        name: `${TABname}Phantom Fisherman`,
        description: `Enable Phantom Fisherman catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendPhantomFishermanCatch = true;

    @CheckboxProperty({
        name: `${TABname}Grim Reaper`,
        description: `Enable Grim Reaper catch party ping`,
        category: "Fishing",
        subcategory: "Catch pings",
    })
    sendGrimReaperCatch = true;

    // -----------------------------------
    // FISHING double hook
    // -----------------------------------

    @SwitchProperty({
        name: "Double hook",
        description: "Enable double hook party ping",
        category: "Fishing",
        subcategory: "Double Hook"
    })
    sendDoubleHook = true;

    // ******************************

    @TextProperty({
        name: `${TABname}Double hook message`,
        description: `Custom message sent to the party`,
        category: "Fishing",
        subcategory: "Double Hook"
    })
    doubleHookMsg = "2fish4me";

    // -----------------------------------
    // Catching rates
    // -----------------------------------
    @SwitchProperty({
        name: "Fishing GUI",
        description: "Display fishing GUI. Cannot be moved for now",
        category: "Fishing",
        subcategory: "GUI"
    })
    guiEnable = true;


    // ******************************

    @SwitchProperty({
        name: `${TABname}Mythic creature count`,
        description: `Display creature catch since mythic. Jawbus & Thunder`,
        category: "Fishing",
        subcategory: "GUI"
    })
    guiMythicCount = true;

    @SwitchProperty({
        name: `${TABname}Bobber`,
        description: `Display bobber count. Requires bobbers to be rendered in your game`,
        category: "Fishing",
        subcategory: "GUI"
    })
    guiBobberCount = true;

    @SwitchProperty({
        name: `${TABname}Active pet`,
        description: `Display active pet. Requires to summon your pet again, or trigger a pet rule to activate`,
        category: "Fishing",
        subcategory: "GUI"
    })
    guiActivePet = true;


    @SwitchProperty({
        name: `${TABname}Catch rate`,
        description: `Display sea creature catch rate. Value is sea creature per minutes over the last <10 minutes by default. Use /mixresettrack to start a new session`,
        category: "Fishing",
        subcategory: "GUI"
    })
    guiCatchRate = true;

    // ******************************
    // ******************************

    @SliderProperty({
        name: `${TABname + TABname}Catching rate window length`,
        description: `Set window duration for moving average computation (minutes)`,
        category: "Fishing",
        subcategory: "GUI Catch rate",
        min: 5,
        max: 60
    })
    scRateWindowMin = 20;

    @SwitchProperty({
        name: `${TABname + TABname}Average mode`,
        description: `ON: per hour, OFF: per minute`,
        category: "Fishing",
        subcategory: "GUI Catch rate"
    })
    guiCatchRateMode = true;
    // -----------------------------------
    // NOTIFICATIONS
    // -----------------------------------

    @SwitchProperty({
        name: "Magic find screen alert",
        description: "Alert on screen when dropping a Magic Find item",
        category: "Notifications",
        subcategory: "Magic Find",
    })
    alertDrops = true;

    @SwitchProperty({
        name: "Magic Find party ping",
        description: "Send a party message when dropping a Magic Find item",
        category: "Notifications",
        subcategory: "Drop Party ping",
    })
    partyPingDrops = true;

    @CheckboxProperty({
        name: `${TABname}Radioactive Vial`,
        description: `Enable Radioactive Vial drop party ping`,
        category: "Notifications",
        subcategory: "Drop Party ping",
    })
    sendRadioactiveVialPing = true;

    @CheckboxProperty({
        name: `${TABname}Lucky Clover Core`,
        description: `Enable Lucky Clover Core drop party ping`,
        category: "Notifications",
        subcategory: "Drop Party ping",
    })
    sendLuckyCloverCorePing = true;

    @CheckboxProperty({
        name: `${TABname}Deep Sea Orb`,
        description: `Enable Deep Sea Orb drop party ping`,
        category: "Notifications",
        subcategory: "Drop Party ping",
    })
    sendDeepSeaOrbPing = true;

    @CheckboxProperty({
        name: `Vanquisher`,
        description: `Enable Vanquisher spawn party ping`,
        category: "Notifications",
        subcategory: "Mob party ping",
    })
    sendVanquisherPing = false;

    @SwitchProperty({
        name: `${TABname}Vanquisher sound`,
        description: "Alert sound when close to a Vanquisher",
        category: "Notifications",
        subcategory: "Mob party ping",
    })
    alertVanquisherSound = true;

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

}


export default new Settings