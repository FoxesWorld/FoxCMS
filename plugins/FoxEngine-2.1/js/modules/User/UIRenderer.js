export class UIRenderer {
	
	/*
    static animateValueChange(oldV, newV, selector) {
        if (oldV === newV) return Promise.resolve();
        return new Promise(resolve => {
            $({ n: oldV }).animate({ n: newV }, {
                duration: 2500,
                step(now) { $(selector).text(Math.round(now)); },
                complete: resolve
            });
        });
    } */

    static insertHTML(selector, html) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = html;
    }
	
	getDominantColor(userPic, quantize, alphaThreshold){
		return new Promise((resolve, reject) => {
                userPic.onload = () => {
                    const color = this._calculateDominantColor(userPic, quantize, alphaThreshold);
                    resolve(color);
                };
                userPic.onerror = err => reject(new Error("Ошибка загрузки изображения: " + err));
            });
	}
	
	/** @private */
    _calculateDominantColor(img, quantize = 16, alphaThreshold = 128) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let data;
        try {
            data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        } catch (e) {
            console.error('Не удалось получить данные изображения:', e);
            return '#000000';
        }

        const colorMap = {};
        let maxCount = 0;
        let dominantColor = { r: 0, g: 0, b: 0 };

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < alphaThreshold) continue;

            const qr = Math.floor(r / quantize) * quantize;
            const qg = Math.floor(g / quantize) * quantize;
            const qb = Math.floor(b / quantize) * quantize;
            const key = `${qr}-${qg}-${qb}`;

            colorMap[key] = (colorMap[key] || 0) + 1;

            if (colorMap[key] > maxCount) {
                maxCount = colorMap[key];
                dominantColor = { r: qr, g: qg, b: qb };
            }
        }

        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(dominantColor.r)}${toHex(dominantColor.g)}${toHex(dominantColor.b)}`;
    }
	
	extractAngle(num) {
		const last3 = num % 1000;
        if (last3 <= 360) return last3;
        const last2 = num % 100;
        if (last2 <= 360) return last2;
        return 360;
    }
	
	animateValueChange(oldV, newV, selector) {
        if (oldV === newV) return Promise.resolve();
        return new Promise(resolve => {
            $({ n: oldV }).animate({ n: newV }, {
                duration: 2500,
                step(now) { $(selector).text(Math.round(now)); },
                complete: resolve
            });
        });
    }


}
