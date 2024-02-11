export class Logo {
	
	constructor(foxEngine, timelineCfg) {
		this.foxEngine = foxEngine;
		this.timeline = anime.timeline(timelineCfg.construct);
		foxEngine.utils.splitWrapLetters('.logo .title', 'letter');
        foxEngine.utils.splitWrapLetters('.logo .status', 'letterStatus');
		this.array = timelineCfg.timeline;
	}
	
	logoAnimation() {
		for(let m = 0; m < this.array.length; m++){
			this.timeline.add(this.array.at(m))
		}
	}
}