export class PaymentManager {
	
        constructor(paymentOptions, paymentButtonsListId, unitpayCountId, bonusInformationId, countAfterDonateId) {
            this.paymentOptions = paymentOptions;
            this.paymentButtonsList = document.getElementById(paymentButtonsListId);
            this.unitpayCount = document.getElementById(unitpayCountId);
            this.bonusInformation = document.getElementById(bonusInformationId);
            this.countAfterDonate = document.getElementById(countAfterDonateId);
        }

        init() {
            this.paymentOptions.forEach(option => this.createPaymentButton(option));
            this.unitpayCount.addEventListener('input', this.handleInputChange.bind(this));
            this.unitpayCount.addEventListener('change', this.handleInputChange.bind(this));

            this.selectPaymentBlock(1000);
        }

        createPaymentButton(option) {
            const paymentButton = document.createElement('div');
            paymentButton.id = `payment_${option.id}`;
            paymentButton.classList.add('payment_button');
            paymentButton.onclick = () => this.selectPaymentBlock(option.id);

            const img = document.createElement('img');
            img.src = option.img;

            const sumDiv = document.createElement('div');
            sumDiv.classList.add('sum');
            sumDiv.textContent = option.label;

            const sumPercentDiv = document.createElement('div');
            sumPercentDiv.classList.add('sum_percent');
            sumPercentDiv.textContent = `Бонус рассчитывается автоматически`;

            paymentButton.appendChild(img);
            paymentButton.appendChild(sumDiv);
            paymentButton.appendChild(sumPercentDiv);
            this.paymentButtonsList.appendChild(paymentButton);
        }

        handleInputChange(event) {
            const count = parseInt(event.target.value) || 0;
            if (count >= 0) {
                this.selectPaymentBlock(count);
            }
        }

        selectPaymentBlock(count) {
            document.querySelectorAll('.payment_button').forEach(button => {
                button.classList.remove('payment_button_selected');
            });

            const selectedButton = document.getElementById(`payment_${count}`);
            if (selectedButton) {
                selectedButton.classList.add('payment_button_selected');
            }

            this.unitpayCount.value = count;
            this.setupCountAfterDonate(count);
        }

        setupCountAfterDonate(sum) {
            const BASE_BONUS = 0.05;
            const ADDITIONAL_BONUS = 0.05; // Бонус за каждую тысячу монет выше 1000

            let bonusPercent = sum < 1000 ? 0 : BASE_BONUS + Math.floor((sum - 1000) / 1000) * ADDITIONAL_BONUS;
            let bonusCount = Math.floor((bonusPercent * sum) / 5) * 5; // Округляем бонус до ближайшего кратного 5

            let bonusMessage = sum < 1000 ? "Бонус доступен при пополнении от 1000 монет." : `Включая бонус размером ${bonusPercent * 100}%!`;

            this.bonusInformation.innerHTML = bonusMessage;
            this.countAfterDonate.innerHTML = sum < 1000 ? `${sum} монет` : `${sum + bonusCount} монет`;
        }

        purchaseMonets(paymentSystem, type) {
            const domain = window.location.href.includes('.net') ? 'net' : 'ru';
            const timestamp = new Date().getMilliseconds();

            let urlParams = `/?operator=${type}`;
            if (paymentSystem.includes("unitpay")) {
                if (paymentSystem.includes('netting')) {
                    paymentSystem = 'unitpay-netting';
                }
                paymentSystem = `${paymentSystem}-${domain}`;
                urlParams = `/?email=aseo@gmail.com&operator=${type}`;
            } else if (paymentSystem.includes("freekassa")) {
                urlParams = `/?email=aseo@gmail.com&currency=${type}`;
            }

            window.location.href = `https://api.simpleminecraft.${domain}/v2/payments/createPayment/${paymentSystem}/Aseo/${this.getPaymentSum()}/${timestamp}${urlParams}`;
        }

        getPaymentSum() {
            const paymentSum = parseInt(this.unitpayCount.value);
            return isNaN(paymentSum) || paymentSum < 50 ? 50 : paymentSum;
        }
    }
