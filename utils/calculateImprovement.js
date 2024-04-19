// Calculate improvement percentage based on previous and current scores
const calculateImprovement = (currentScore, previousScore) => {
    const improvement = ((currentScore - previousScore) / previousScore) * 100;
    return improvement.toFixed(2); // Return improvement percentage rounded to 2 decimal places
};

module.exports = calculateImprovement;
