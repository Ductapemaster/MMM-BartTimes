Module.register("MMM-BartTimes", {

    // Module config defaults.
    defaults: {
        key : 'MW9S-E7SL-26DU-VV8V', // Public BART API key
        train_blacklist: [],
        updateInterval : 30000, // 30 seconds
        showTrainColor: true,
        trainColorStyle: "bar",
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);

        var self = this;

        this.getDepartureInfo()
        // Schedule update timer.
        setInterval(function() {
            self.getDepartureInfo()
        }, this.config.updateInterval);
    },

    // Define required styles.
    getStyles: function() {
        return ["bart_times.css"];
    },

    getDepartureInfo: function() {
        Log.info("Requesting departure info");

        this.sendSocketNotification("GET_DEPARTURE_TIMES", {
            config: this.config
        });
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");

        if (!this.info) {
            wrapper.innerHTML = "Loading...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        var table = document.createElement("table");
        table.className = "small";

        this.info.trains.forEach(train => {

            if (this.config.train_blacklist.includes(train.dest)) {
                console.log('gottem')
                return;
            }

            var row = document.createElement("tr");
            table.appendChild(row);

            if (this.config.showTrainColor) {
                var trainColorCell = document.createElement("td");
                trainColorCell.className = "traincolor";
                row.appendChild(trainColorCell);

                var trainColorSpan = document.createElement("span");
                if (this.config.trainColorStyle == "dot") {
                    trainColorSpan.className = "color_dot";
                } else {
                    trainColorSpan.className = "color_bar";
                }
                trainColorSpan.style.backgroundColor = train.hex_color;
                trainColorCell.appendChild(trainColorSpan);
            }

            var trainNameCell = document.createElement("td");
            trainNameCell.className = "train";
            trainNameCell.innerHTML = train.dest;
            row.appendChild(trainNameCell);

            train.departures.forEach(time_to_departure => {
                var timeCell = document.createElement("td");
                timeCell.className = "time";
                if (!isNaN(time_to_departure)) {
                    time_to_departure += ' min';
                }
                timeCell.innerHTML = time_to_departure;
                row.appendChild(timeCell);
            });
        });

        return table;
    },

    // Override get header function
    getHeader: function() {
        if (this.info) {
            console.log(this.info.station_name);
            return this.info.station_name + ' BART Departure Times';
        }
        return 'BART Departure Times';
    },

    // Override notification handler.
    socketNotificationReceived: function(notification, payload) {
        if (notification === "DEPARTURE_TIMES") {
            this.info = payload
            this.updateDom();
        }
    },

});
