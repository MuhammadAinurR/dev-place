const getGithubTrending = async (req, res, next) => {
    const url = 'https://github-trending.p.rapidapi.com/repositories?language=rust&since=daily&spoken_language_code=en';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a000891b7dmsh9968805d9bb3536p1b18f7jsncc7405c7996a',
            'x-rapidapi-host': 'github-trending.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = { getGithubTrending }