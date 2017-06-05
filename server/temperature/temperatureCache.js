const temperatureCache = {
    current: 0,
    history: [],
    lastUpdate: 0,

    addHistory(data) {
        data.forEach(d => this.history.push(d));
        let lastDataPoint = data[data.length - 1];
        this.current = lastDataPoint.value;
        this.lastUpdate = lastDataPoint.time;
    },

    getPartFrom(from) {
        return {
            current: this.current,
            lastUpdate: this.lastUpdate,
            history: this.history.filter(h => h.time > from)
        }
    }
};

module.exports = temperatureCache;