const tierNames = ["Mega Rebirth", "Giga Rebirth", "Tera Rebirth", "Peta Rebirth", "Exa Rebirth", "Zetta Rebirth", "Yotta Rebirth", "Alpha Rebirth", "Omega Rebirth", "Infinity Rebirth"];
const tierIds = ["mr", "gr", "tr", "pr", "er", "zr", "yr", "ar", "or", "ir"];
const loopNames = ["Loop", "Super Loop", "Mega Loop", "Ultra Loop", "Giga Loop", "Tera Loop", "Peta Loop", "Exa Loop", "Zetta Loop", "Yotta Loop"];
const loopIds = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10"];

// --- MULTIPLIER LOGIC ---
function getTotalMoneyMultiplier() {
    let totalMult = new Decimal(1);
    totalMult = totalMult.times(player.m.points.times(2).max(1));
    totalMult = totalMult.times(player.r.points.times(3).max(1));
    totalMult = totalMult.times(player.ur.points.times(4).max(1));
    tierIds.forEach((id, index) => {
        if (player[id].points.gt(0)) totalMult = totalMult.times(player[id].points.times(index + 5));
    });
    return totalMult;
}

function getTotalLoopMultiplier() {
    let totalPower = new Decimal(1);
    loopIds.forEach((id) => {
        if (player[id].points.gt(0)) totalPower = totalPower.times(player[id].points.times(2).max(1));
    });
    return totalPower;
}

// --- BASE LAYER ---
addLayer("m", {
    name: "Multi", symbol: "M", row: 0,
    startData() { return { unlocked: true, points: new Decimal(0) }},
    color: "#4BDC13", requires: new Decimal(33), resource: "Multipliers", baseResource: "Money",
    baseAmount() { return player.points },
    type: "normal", exponent: 0.5,
    clickables: {
        11: {
            title: "Press for Money",
            display() { return "Gain Money\nx" + format(getTotalMoneyMultiplier().times(getTotalLoopMultiplier())) },
            canClick() { return true },
            onClick() { player.points = player.points.add(getTotalMoneyMultiplier().times(getTotalLoopMultiplier())) },
            style: { "height": "120px", "width": "120px" }
        },
    },
});

// --- REBIRTH LAYERS (Standard Scaling, Max 1 Gain) ---
addLayer("r", {
    name: "Rebirth", symbol: "R", row: 1, color: "#4287f5", 
    requires: new Decimal(33), resource: "Rebirths", baseResource: "Multipliers", 
    baseAmount() { return player.m.points },
    type: "normal", exponent: 0.5,
});

addLayer("ur", {
    name: "Ultra Rebirth", symbol: "UR", row: 2, color: "#e30022", 
    requires: new Decimal(33), resource: "Ultra Rebirths", baseResource: "Rebirths", 
    baseAmount() { return player.r.points },
    type: "normal", exponent: 0.5,
});

tierIds.forEach((id, index) => {
    addLayer(id, {
        name: tierNames[index], row: index + 3,
        resource: tierNames[index] + "s",
        baseResource: index === 0 ? "Ultra Rebirths" : tierNames[index-1] + "s",
        baseAmount() { return player[index === 0 ? "ur" : tierIds[index-1]].points },
        requires: new Decimal(33), type: "normal", exponent: 0.5,
    });
});

// --- LOOP LAYERS (Standard Scaling, Max 1 Gain) ---
loopIds.forEach((id, index) => {
    addLayer(id, {
        name: loopNames[index], row: index + 14,
        resource: loopNames[index] + "s",
        baseResource: index === 0 ? "Infinity Rebirths" : loopIds[index-1] + "s",
        baseAmount() { return player[index === 0 ? "ir" : loopIds[index-1]].points },
        requires: new Decimal(33), type: "normal", exponent: 0.5,
        milestones: {
            0: { requirementDescription: "5 Points", effectDescription: "Keep Multi.", done() { return player[this.layer].points.gte(5) } },
            1: { requirementDescription: "10 Points", effectDescription: "Keep Rebirths.", done() { return player[this.layer].points.gte(10) } },
            2: { requirementDescription: "25 Points", effectDescription: "Auto-Clicker.", done() { return player[this.layer].points.gte(25) } }
        }
    });
});
