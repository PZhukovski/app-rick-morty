export const commentForEpisode = (count: number) => {
    if (count < 2) {
        return `Did you ever seen this series?! 😱`
    }
    else if (count >= 2 && count < 4) {
        return `Better, but not perfect... 🥺`
    }
    else if (count >= 4) {
        return `Excellent! High five! 🤗`
    }
}