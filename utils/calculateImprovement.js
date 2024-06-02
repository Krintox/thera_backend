// Calculate improvement in score
exports.calculateImprovement = async (userId, gameName, currentScore) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const previousScores = user.gameScores[gameName] || [];
        const lastScore = previousScores[previousScores.length - 1] || 0;

        // Calculate improvement
        const improvement = currentScore - lastScore;

        // Update user game scores
        if (previousScores.length >= 10) previousScores.shift(); // Maintain last 10 scores
        previousScores.push(currentScore);
        user.gameScores[gameName] = previousScores;
        await user.save();

        return improvement;
    } catch (error) {
        console.error("Error in calculateImprovement:", error);
        throw new Error('Error calculating improvement');
    }
};
