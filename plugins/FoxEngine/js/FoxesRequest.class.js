function request(path, args, timeDelay) {
	
	this.path = path;
	this.args = args;
	this.timeDelay = timeDelay;
	this.timeDelay_time = 0;
	this.timeDelay_maxCount = 3;
	this.timeDelay_count = 0;
	
	//@Deprecated
	this.send_post = function(params, after, antitimeDelay) {
		let response = "notSent";
		
		if(this.timeDelay != false && antitimeDelay == true /*&& this.timeDelay_count ++ == this.timeDelay_maxCount*/){
			let time = new Date().getTime();
			let time_ = time - this.timeDelay_time;

			if(time_ < this.timeDelay){
				return after({status: "error", message: "Please wait for "+ ((this.timeDelay - time_) / 1000 + 1).toFixed(0) +" seconds..."});
			} else this.timeDelay_time = time;
			this.timeDelay_count = 0;
		}

		xmlhttp = this.getXmlHttp();
		xmlhttp.open('POST', this.path, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
			let p = '';
			for (let key in params) {
				p += key + '=' + params[key] + '&';
			}
			for (let key in args) {
				p += key + '=' + args[key] + '&';
			}

		xmlhttp.send(p.slice(0,-1));
		return xmlhttp;
	};
	
	this.sendPost = async function(params, after, antiTimeDelay) {
    let response = "notSent";

    if (this.timeDelay !== false && antiTimeDelay === true /*&& this.timeDelayCount++ === this.timeDelayMaxCount*/) {
      let time = new Date().getTime();
      let timeDiff = time - this.timeDelayTime;

      if (timeDiff < this.timeDelay) {
        return after({
          status: "error",
          message: "Please wait for " + ((this.timeDelay - timeDiff) / 1000 + 1).toFixed(0) + " seconds..."
        });
      } else {
        this.timeDelayTime = time;
        this.timeDelayCount = 0;
      }
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const paramsList = [];
    for (let key in params) {
      paramsList.push(key + '=' + params[key]);
    }
    for (let key in this.args) {
      paramsList.push(key + '=' + this.args[key]);
    }

    const requestBody = paramsList.join('&');

    try {
      const response = await fetch(this.path, {
        method: 'POST',
        headers,
        body: requestBody
      });

      return response;
    } catch (error) {
      return after({
        status: "error",
        message: "An error occurred: " + error.message
      });
    }
  }
	
	this.sendGet = function httpGet(theUrl) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState != 4) return;
			if (this.status == 200) {
				return this.responseText;
			}
		};

		xhr.open('GET', theUrl, true);
		xhr.send();
	};
	
	this.upload = function(file, params, progress, load){
		
		let xhr = this.getXmlHttp();
		let formData = new FormData();
		
		formData.append("file", file);
		for (let key in params) {
			formData.append(key, params[key]);
		}
		for (let key in args) {
			formData.append(key, args[key]);
		}
		
		xhr.upload.onprogress = function(event) {
			progress(event);
		}

		xhr.onload = xhr.onerror = function() {
			load(this);
		};

		xhr.open('POST', this.path, true);
		xhr.send(formData);
	};
	
	this.getXmlHttp = function() {
		let xmlhttp;
		
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				xmlhttp = false;
			}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}
};