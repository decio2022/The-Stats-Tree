let modInfo = {
	name: "Ultimate Button Simulator",
	id: "btn_sim_01",
	pointsName: "Money",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), 
	offlineLimit: 1, 
}

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	return true
}

function getPointGen() {
	if (!canGenPoints()) return new Decimal(0)
    let gain = new Decimal(0)
    if (hasMilestone("l1", 2)) gain = getTotalMoneyMultiplier().times(getTotalLoopMultiplier()).times(20)
	return gain
}

function addedRawPoints(points) {}
function isEndgame() { return player.l10.points.gte(33) }
