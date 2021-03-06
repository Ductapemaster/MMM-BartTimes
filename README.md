# MMM-BartTimes

Magic Mirror module that displays the upcoming departure times for all BART (Bay Area Rapid Transit) lines at a certain station.

This exists thanks to BART providing an easy public API, which can be found [here](http://api.bart.gov/docs/overview/index.aspx)

### Installation
1. Navigate to the magic mirror modules directory and clone this repository there.
2. Inside the `MMM-BartTimes` folder, run `npm install url requests` to install the two required dependencies.
3. Modify `config.js` to include `MMM-BartTimes`. An example config can be seen below.

### Configuration

| Config Option | Type | Description |
|:------------- |:--------- |:----------- |
| `station` | string | The station abbreviation for your BART station of choice. Abbreviations can be found [here](http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V) (under the tag `<abbr>`). |
| `key` | string (optional) | API key if you want your own so you aren't at the mercy of BART changing their public one.  You can request a key [here](http://api.bart.gov/api/register.aspx). |
| `train_blacklist` | list of strings (optional) | Line names included in this list will not be displayed on your Magic Mirror.|
| `showTrainColor` | boolean | Enable or disable the display of train color to the left of the train destination.|
| `trainColorStyle` | string (`dot` or `bar`) | Set style of train color displayed.  `dot` shows a round dot, and `bar`shows a thin bar to the left of the train destination.  This parameter is ignored if `showTrainColor` is `false`|

Example configuration file:
```
{
	module: 'MMM-BartTimes',
	position: 'top_left',
	config: {
		station: '19th',
		train_blacklist: ['Dublin/Pleasanton'],
		key: 'IFYO-UWAN-TYOU-ROWN',
		showTrainColor: true,
                trainColorStyle: 'bar',
	}
},
```

### Screenshot
When working, the display should look something like this:

![MMM-BartTimes screenshot](screenshot.png)
