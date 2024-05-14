export class Request {
    constructor(path, args, timeDelay) {
        this.path = path;
        this.args = args; 
        this.timeDelay = timeDelay;
        this.timeDelay_time = 0;
        this.timeDelay_maxCount = 3;
        this.timeDelay_count = 0;
    }

    send_post(params, after, antitimeDelay) {
        let response = "notSent";

        if (this.timeDelay != false && antitimeDelay == true) {
            let time = new Date().getTime();
            let time_ = time - this.timeDelay_time;

            if (time_ < this.timeDelay) {
                return after({ status: "error", message: "Please wait for " + ((this.timeDelay - time_) / 1000 + 1).toFixed(0) + " seconds..." });
            } else this.timeDelay_time = time;
            this.timeDelay_count = 0;
        }

        let xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.path, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let p = '';
        for (let key in params) {
            p += key + '=' + params[key] + '&';
        }
        for (let key in this.args) {
            p += key + '=' + this.args[key] + '&';
        }

        xmlhttp.send(p.slice(0, -1));
        return xmlhttp;
    }

    sendGet(theUrl) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status == 200) {
                return this.responseText;
            }
        };

        xhr.open('GET', theUrl, true);
        xhr.send();
    }

    upload(file, params, progress, load) {
        let xhr = this.getXmlHttp();
        let formData = new FormData();

        formData.append("file", file);
        for (let key in params) {
            formData.append(key, params[key]);
        }
        for (let key in this.args) {
            formData.append(key, this.args[key]);
        }

        xhr.upload.onprogress = function (event) {
            progress(event);
        }

        xhr.onload = xhr.onerror = function () {
            load(this);
        };

        xhr.open('POST', this.path, true);
        xhr.send(formData);
    }

    getXmlHttp() {
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
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
}