let modInfo = {
	name: "Ultimate Button Simulator",
	id: "btn_sim_01",
	author: "decio2022",
	pointsName: "Money",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), 
	offlineLimit: 1, 
}

let VERSION = {
	num: "1.0",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	return true
}

function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

function getPointGen() {
	if (!canGenPoints()) return new Decimal(0)
    let gain = new Decimal(0)
    if (hasMilestone("l1", 2)) gain = getTotalMoneyMultiplier().times(getTotalLoopMultiplier()).times(20)
	return gain
}

function addedRawPoints(points) {}
function isEndgame() { return player.l10.points.gte(33) }
