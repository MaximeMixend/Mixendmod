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
        const categories = ["General", "Fishing", "Crimson Isle", "Magic Find", "Crystal Hollows", "Mining", "Diana"];
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
        this.addDependency(`${TABname}Lord Jawbus message`, "Lord Jawbus catch");
        this.addDependency(`${TABname}Lord Jawbus sound`, "Lord Jawbus detection");
        this.addDependency(`${TABname}Lord Jawbus screen alert`, "Lord Jawbus detection");

        this.addDependency(`${TABname}Thunder message`, "Thunder catch");
        this.addDependency(`${TABname}Thunder sound`, "Thunder detection");
        this.addDependency(`${TABname}Thunder screen alert`, "Thunder detection");

        this.addDependency(`${TABname}Plhlegblast catch`, "Plhlegblast settings");
        this.addDependency(`${TABname}Plhlegblast message`, "Plhlegblast settings");
        this.addDependency(`${TABname}Plhlegblast sound`, "Plhlegblast detection");
        this.addDependency(`${TABname}Plhlegblast screen alert`, "Plhlegblast detection");

        // 4. Other catch
        this.addDependency(`${TABname}Sea Emperor catch`, "Sea Emperor settings");
        this.addDependency(`${TABname}Sea Emperor message`, "Sea Emperor settings");
        this.addDependency(`${TABname}Sea Emperor sound`, "Sea Emperor detection");
        this.addDependency(`${TABname}Sea Emperor screen alert`, "Sea Emperor detection");

        this.addDependency(`${TABname}Water Hydra catch`, "Water Hydra settings");
        this.addDependency(`${TABname}Water Hydra message`, "Water Hydra settings");
        this.addDependency(`${TABname}Water Hydra sound`, "Water Hydra detection");
        this.addDependency(`${TABname}Water Hydra screen alert`, "Water Hydra detection");

        this.addDependency(`${TABname}Carrot King catch`, "Carrot King settings");
        this.addDependency(`${TABname}Carrot King message`, "Carrot King settings");
        this.addDependency(`${TABname}Carrot King sound`, "Carrot King detection");
        this.addDependency(`${TABname}Carrot King screen alert`, "Carrot King detection");

        this.addDependency(`${TABname}Phantom Fisherman catch`, "Phantom Fisherman settings");
        this.addDependency(`${TABname}Phantom Fisherman message`, "Phantom Fisherman settings");
        this.addDependency(`${TABname}Phantom Fisherman sound`, "Phantom Fisherman detection");
        this.addDependency(`${TABname}Phantom Fisherman screen alert`, "Phantom Fisherman detection");

        this.addDependency(`${TABname}Grim Reaper catch`, "Grim Reaper settings");
        this.addDependency(`${TABname}Grim Reaper message`, "Grim Reaper settings");
        this.addDependency(`${TABname}Grim Reaper sound`, "Grim Reaper detection");
        this.addDependency(`${TABname}Grim Reaper screen alert`, "Grim Reaper detection");

        this.addDependency(`${TABname}Yeti catch`, "Yeti settings");
        this.addDependency(`${TABname}Yeti message`, "Yeti settings");
        this.addDependency(`${TABname}Yeti sound`, "Yeti detection");
        this.addDependency(`${TABname}Yeti screen alert`, "Yeti detection");

        // 5. Other
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
        this.addDependency(`${TABname}Vanquisher sound`, "Vanquisher detection");
        this.addDependency(`${TABname}Vanquisher screen alert`, "Vanquisher detection");
        this.addDependency(`${TABname}Vanquisher spawn`, "Vanquisher settings");
        this.addDependency(`${TABname}Vanquisher coords`, "Vanquisher settings");
        this.addDependency(`${TABname}Vanquisher message`, "Vanquisher settings");
    }

    // ====================================================
    //#region General
    //#region party commands
    @TextProperty({
        name: `Party code invite`,
        description: `People who DM you this will get invited to your party\nLeave blank to disable`,
        category: "General",
        subcategory: "Party commands",
    })
    partyCode = "sendmeinvite";

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

    //#region Pets
    @CheckboxProperty({
        name: `Hide AUTOPET message`,
        description: `Hides AUTOPET message`,
        category: "General",
        subcategory: "Pet",
    })
    petHideAutoPet = true;

    @CheckboxProperty({
        name: `Pet level up warning`,
        description: `Displays a message on screen when a pet levels to 95 or higher`,
        category: "General",
        subcategory: "Pet",
    })
    petLevelWarning = true;
    //#endregion Pets

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
    catchSession = false;

    @CheckboxProperty({
        name: "Catch session GUI times",
        description: "Display times since last sc in the catch session GUI",
        category: "Fishing",
        subcategory: "1. Catch session GUI",
    })
    catchSessionTime = false;

    @CheckboxProperty({
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
    catchSessionFishingType = false;
    //#endregion 1. Catch session GUI

    //#region 2. Fishing GUI
    @SwitchProperty({
        name: "Fishing GUI",
        description: "Display fishing GUI. /mixgui fish to move",
        category: "Fishing",
        subcategory: "2. Fishing GUI"
    })
    fishingGUI = false;

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
    //
    //
    //
    //
    //
    //
    //#region Lord Jawbus
    @SwitchProperty({
        name: `Lord Jawbus catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusPartyPing = true;

    @TextProperty({
        name: `${TABname}Lord Jawbus message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "3. Crimson catch"
    })
    jawbusMessage = "";

    @SwitchProperty({
        name: `Lord Jawbus detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusDetection = false;

    @CheckboxProperty({
        name: `${TABname}Lord Jawbus sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Lord Jawbus screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    jawbusScreenAlert = true;
    //#endregion Lord Jawbus
    //#region Thunder
    @SwitchProperty({
        name: `Thunder catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderPartyPing = true;

    @TextProperty({
        name: `${TABname}Thunder message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "3. Crimson catch"
    })
    thunderMessage = "";

    @SwitchProperty({
        name: `Thunder detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderDetection = false;

    @CheckboxProperty({
        name: `${TABname}Thunder sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Thunder screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    thunderScreenAlert = true;
    //#endregion Thunder
    //#region Plhlegblast
    @SwitchProperty({
        name: `Plhlegblast settings`,
        description: `Turn ON/OFF Plhlegblast related settings`,
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastSettings = true;

    @TextProperty({
        name: `${TABname}Plhlegblast message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "3. Crimson catch"
    })
    plhlegblastMessage = "";

    @CheckboxProperty({
        name: `${TABname}Plhlegblast catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastPartyPing = true;

    @SwitchProperty({
        name: `Plhlegblast detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastDetection = false;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Plhlegblast screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "3. Crimson catch",
    })
    plhlegblastScreenAlert = true;
    //#endregion Plhlegblast
    //#endregion 3. Crimson catch

    //#region 4. Other catch
    //
    //
    //
    //
    //
    //
    //#region Carrot King
    @SwitchProperty({
        name: `Carrot King settings`,
        description: `Turn ON/OFF Carrot King related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    carrotKingSettings = true;

    @TextProperty({
        name: `${TABname}Carrot King message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    carrotKingMessage = "";

    @CheckboxProperty({
        name: `${TABname}Carrot King catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    carrotKingPartyPing = true;

    @SwitchProperty({
        name: `Carrot King detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    carrotKingDetection = false;

    @CheckboxProperty({
        name: `${TABname}Carrot King sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    carrotKingSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Carrot King screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    carrotKingScreenAlert = true;
    //#endregion Carrot King
    //#region Sea Emperor
    @SwitchProperty({
        name: `Sea Emperor settings`,
        description: `Turn ON/OFF Sea Emperor related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    seaEmperorSettings = true;

    @TextProperty({
        name: `${TABname}Sea Emperor message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    seaEmperorMessage = "";

    @CheckboxProperty({
        name: `${TABname}Sea Emperor catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    seaEmperorPartyPing = true;

    @SwitchProperty({
        name: `Sea Emperor detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    seaEmperorDetection = false;

    @CheckboxProperty({
        name: `${TABname}Sea Emperor sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    seaEmperorSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Sea Emperor screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    seaEmperorScreenAlert = true;
    //#endregion Sea Emperor
    //#region Water Hydra
    @SwitchProperty({
        name: `Water Hydra settings`,
        description: `Turn ON/OFF Water Hydra related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    waterHydraSettings = true;

    @TextProperty({
        name: `${TABname}Water Hydra message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    waterHydraMessage = "";

    @CheckboxProperty({
        name: `${TABname}Water Hydra catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    waterHydraPartyPing = true;

    @SwitchProperty({
        name: `Water Hydra detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    waterHydraDetection = false;

    @CheckboxProperty({
        name: `${TABname}Water Hydra sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    waterHydraSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Water Hydra screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    waterHydraScreenAlert = true;
    //#endregion Water Hydra
    //#region Phantom Fisherman
    @SwitchProperty({
        name: `Phantom Fisherman settings`,
        description: `Turn ON/OFF Phantom Fisherman related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    phantomFishermanSettings = true;

    @TextProperty({
        name: `${TABname}Phantom Fisherman message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    phantomFishermanMessage = "";

    @CheckboxProperty({
        name: `${TABname}Phantom Fisherman catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    phantomFishermanPartyPing = true;

    @SwitchProperty({
        name: `Phantom Fisherman detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    phantomFishermanDetection = false;

    @CheckboxProperty({
        name: `${TABname}Phantom Fisherman sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    phantomFishermanSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Phantom Fisherman screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    phantomFishermanScreenAlert = true;
    //#endregion Phantom Fisherman
    //#region Grim Reaper
    @SwitchProperty({
        name: `Grim Reaper settings`,
        description: `Turn ON/OFF Grim Reaper related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    grimReaperSettings = true;

    @TextProperty({
        name: `${TABname}Grim Reaper message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    grimReaperMessage = "";

    @CheckboxProperty({
        name: `${TABname}Grim Reaper catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    grimReaperPartyPing = true;

    @SwitchProperty({
        name: `Grim Reaper detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    grimReaperDetection = false;

    @CheckboxProperty({
        name: `${TABname}Grim Reaper sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    grimReaperSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Grim Reaper screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    grimReaperScreenAlert = true;
    //#endregion Grim Reaper
    //#region Yeti
    @SwitchProperty({
        name: `Yeti settings`,
        description: `Turn ON/OFF Yeti related settings`,
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    yetiSettings = true;

    @TextProperty({
        name: `${TABname}Yeti message`,
        description: `Changes the message sent to the party when reeling the mob.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Fishing",
        subcategory: "4. Other catch"
    })
    yetiMessage = "";

    @CheckboxProperty({
        name: `${TABname}Yeti catch`,
        description: "Enables a party message when reeling the mob.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    yetiPartyPing = true;

    @SwitchProperty({
        name: `Yeti detection`,
        description: "Enables mob detection.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    yetiDetection = false;

    @CheckboxProperty({
        name: `${TABname}Yeti sound`,
        description: "Enables a sound cue when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    yetiSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Yeti screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Fishing",
        subcategory: "4. Other catch",
    })
    yetiScreenAlert = true;
    //#endregion Yeti
    //#endregion 4. Other catch

    //#region 5. Other

    @SwitchProperty({
        name: "Double hook",
        description: "Enable double hook party ping",
        category: "Fishing",
        subcategory: "5. Other"
    })
    sendDoubleHook = false;

    @TextProperty({
        name: `${TABname}Double hook message`,
        description: `Custom message sent to the party`,
        category: "Fishing",
        subcategory: "5. Other"
    })
    doubleHookMsg = "Noot noot >o<";

    @SwitchProperty({
        name: "Party ping catch rate display mode",
        description: "Change the catch rate display\nO: 32 in 5m | I: 32 at 750/h",
        category: "Fishing",
        subcategory: "5. Other",
    })
    catchPingMode = false;

    @SwitchProperty({
        name: "Hypixel fishing catch message",
        description: "Display Hypixel default catch message feedback",
        category: "Fishing",
        subcategory: "5. Other",
    })
    catchMessageFeedback = true;

    @SwitchProperty({
        name: "Custom fishing catch message",
        description: "Add a custom fishing catch feedback for mythic creatures",
        category: "Fishing",
        subcategory: "5. Other",
    })
    catchMessageCustom = false;

    //#endregion 5. Other

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
    @SwitchProperty({
        name: `Vanquisher settings`,
        description: `Turn ON/OFF Vanquisher related settings`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherSettings = true;

    @TextProperty({
        name: `${TABname}Vanquisher message`,
        description: `Changes the message sent to the party when spawning a Vanquisher.\nNeeds the corresponding mob message setting enabled.\nLeave blank for default message`,
        category: "Crimson Isle",
        subcategory: "Vanquisher"
    })
    vanquisherMessage = "";

    @CheckboxProperty({
        name: `${TABname}Vanquisher spawn`,
        description: `Enable Vanquisher spawn party ping`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherPartyPing = false;

    @CheckboxProperty({
        name: `${TABname}Vanquisher coords`,
        description: `Add coordinates to vanquisher spawning message`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherCoords = false;

    @SwitchProperty({
        name: `Vanquisher detection`,
        description: `Enables mob detection.`,
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherDetection = false;

    @CheckboxProperty({
        name: `${TABname}Vanquisher sound`,
        description: "Enables a sound cue when nearby.",
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherSoundAlert = true;

    @CheckboxProperty({
        name: `${TABname}Vanquisher screen alert`,
        description: "Enables a screen message when nearby.",
        category: "Crimson Isle",
        subcategory: "Vanquisher",
    })
    vanquisherScreenAlert = true;

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
    //#endregion Magic Find

    // -----------------------------------
    // Crystal Hollows
    // -----------------------------------
    //#region Crystal Hollows
    @SwitchProperty({
        name: `Ping worm cap`,
        description: "Party ping when worm cap is hit",
        category: "Crystal Hollows",
        subcategory: "Worm fishing"
    })
    wormCapPing = true;

    @SliderProperty({
        name: `${TABname}Worm cap threshold`,
        description: "Set worm count at which mob cap ping starts",
        category: "Crystal Hollows",
        subcategory: "Worm fishing",
        min: 30,
        max: 60
    })
    wormCapThreshold = 59;

    @SwitchProperty({
        name: `Ping magma core cap`,
        description: "Party ping when magam core mobs cap is hit",
        category: "Crystal Hollows",
        subcategory: "Magma core fishing",
    })
    magmacoreCapPing = true;

    @SliderProperty({
        name: `${TABname}Magma core cap threshold`,
        description: "Set lava flame+pigmen count at which mob cap ping starts",
        category: "Crystal Hollows",
        subcategory: "Magma core fishing",
        min: 30,
        max: 60
    })
    magmacoreCapThreshold = 59;
    //#endregion Crystal Hollows

    // -----------------------------------
    // Mining
    // -----------------------------------
    //#region Mining
    @SwitchProperty({
        name: `Mining speed boost screen alert`,
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
    //#region Mining

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