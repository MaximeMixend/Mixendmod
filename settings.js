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
        const categories = ["Informations", "Fishing", "Notifications", "Worm fishing"];
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

        this.addDependency(`${TABname}Mythic creature count`, "Fishing GUI");
        this.addDependency(`${TABname}Bobber`, "Fishing GUI");
        this.addDependency(`${TABname}Active pet`, "Fishing GUI");
        this.addDependency(`${TABname}Catch rate`, "Fishing GUI");

        this.addDependency(`${TABname + TABname}Catching rate window length`, `${TABname}Catch rate`);
        this.addDependency(`${TABname + TABname}Average mode`, `${TABname}Catch rate`);

        this.addDependency(`${TABname}Cap threshold`, "Ping worm cap");

    }

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
        subcategory: "GUI",
        min: 5,
        max: 60
    })
    scRateWindowMin = 20;

    @SwitchProperty({
        name: `${TABname + TABname}Average mode`,
        description: `ON: per hour, OFF: per minute`,
        category: "Fishing",
        subcategory: "GUI"
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
        subcategory: "Magic Find",
    })
    partyPingDrops = true;

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
}


export default new Settings