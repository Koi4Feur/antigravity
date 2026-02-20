export interface SurebetResult {
    isArb: boolean;
    profitPercent: number;
    totalProfit: number;
    stake1: number;
    stake2: number;
}

export interface FreebetResult {
    profit: number;
    retentionPercent: number;
}

export interface DutchingResult {
    isProfitable: boolean;
    stakes: [number, number, number];
    totalProfit: number;
    impliedProb: number;
}

export interface RefundResult {
    layStake: number;
    profit: number; // Secured profit/loss
}

export const calculateSurebet = (
    odd1: number,
    odd2: number,
    totalStake: number
): SurebetResult => {
    if (!odd1 || !odd2 || !totalStake) return { isArb: false, profitPercent: 0, totalProfit: 0, stake1: 0, stake2: 0 };

    const impliedProb = (1 / odd1) + (1 / odd2);
    const isArb = impliedProb < 1;

    // Stakes calculation for equal profit
    const stake1 = (totalStake / impliedProb) / odd1;
    const stake2 = (totalStake / impliedProb) / odd2;

    const profit1 = (stake1 * odd1) - totalStake;
    // profit2 should be equal roughly

    const profitPercent = ((1 - impliedProb) / impliedProb) * 100;

    return {
        isArb,
        profitPercent,
        totalProfit: profit1,
        stake1,
        stake2
    };
};

export const calculateFreebet = (
    amount: number,
    backOdd: number,
    layOdd: number
): FreebetResult => {
    if (!amount || !backOdd || !layOdd) return { profit: 0, retentionPercent: 0 };

    // User formula: Profit = (Mise * (Back - 1)) / Lay
    const profit = (amount * (backOdd - 1)) / layOdd;
    const retentionPercent = (profit / amount) * 100;

    return {
        profit,
        retentionPercent
    };
};

export const calculateBoostDutching = (
    odd1: number,
    odd2: number,
    odd3: number,
    totalStake: number
): DutchingResult => {
    if (!odd1 || !odd2 || !odd3 || !totalStake) {
        return { isProfitable: false, stakes: [0, 0, 0], totalProfit: 0, impliedProb: 100 };
    }

    const impliedProb = (1 / odd1) + (1 / odd2) + (1 / odd3);

    const stake1 = (totalStake / impliedProb) / odd1;
    const stake2 = (totalStake / impliedProb) / odd2;
    const stake3 = (totalStake / impliedProb) / odd3;

    const profit = (stake1 * odd1) - totalStake;

    return {
        isProfitable: impliedProb < 1,
        stakes: [stake1, stake2, stake3],
        totalProfit: profit,
        impliedProb
    };
};

export const calculateRefundBet = (
    stake: number,
    backOdd: number,
    layOdd: number
): RefundResult => {
    if (!stake || !backOdd || !layOdd) return { layStake: 0, profit: 0 };

    // Formula derivation:
    // Win: S*(Ob - 1) - L*(Ol - 1)
    // Lose: L - S + (0.8 * S)  [Refund 80%]
    // Equate: S*Ob - S - L*Ol + L = L - 0.2*S
    // S*Ob - 0.8*S = L*Ol
    // L = S * (Ob - 0.8) / Ol

    const layStake = (stake * (backOdd - 0.8)) / layOdd;

    // Calculate profit (scenario: Back Loses, we win Lay + Refund)
    // Profit = LayStake - Stake + 0.8*Stake
    const profit = layStake - (0.2 * stake);

    return {
        layStake,
        profit
    };
};
