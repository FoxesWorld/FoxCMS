export class PaymentManager {
        constructor() {}

    init() {
        this.selectPaymentBlock(1000);
		 $("#unitpay_count").on("input", (event) => this.onInputChange(event));
    }

    selectPaymentBlock(count) {
        $(".payment_button").removeClass("payment_button_selected");
        $("#payment_" + count).addClass("payment_button_selected");
        $("#unitpay_count").val(count);
        this.setupCountAfterDonate(count);
    }

    setupCountAfterDonate(sum) {
        sum = parseInt(sum);
        let bonus_percent = 0;

        if (sum >= 1000) bonus_percent = 0.05;
        if (sum >= 2000) bonus_percent = 0.10;
        if (sum >= 3000) bonus_percent = 0.20;
        if (sum >= 5000) bonus_percent = 0.25;

        const bonus_count = bonus_percent * sum;

        if (sum < 1000) {
            $("#bonus_information").html("Вам доступен 5% бонус при пополнении от 1000 монет.");
            $(".payment_type").removeClass("payment_select");
        } else {
            $("#bonus_information").html("Включая бонус размером " + (bonus_percent * 100) + "%!");
        }

        $("#count_after_donate").html((sum + bonus_count) + " монет");
    }

    onInputChange(event) {
		console.log("GGGG");
        let count = parseInt(event.target.value);
        if (isNaN(count)) count = 0;
        this.selectPaymentBlock(count);
    }

    purchaseMonets(payment_system, type) {
        const domain = window.location.href.includes('.net') ? 'net' : 'ru';
        let timestamp = new Date().getMilliseconds();

        if (payment_system.includes("unitpay")) {
            if (payment_system.includes('netting')) {
                payment_system = 'unitpay-netting';
            }

            payment_system = `${payment_system}-${domain}`;
            timestamp += `/?customerEmail=aseo@gmail.com&paymentType=${type}`;
        } else if (payment_system.includes("enot")) {
            timestamp += `/?operator=${type}`;
        } else if (payment_system.includes("freekassa")) {
            timestamp += `/?email=aseo@gmail.com&currency=${type}`;
        }

        window.location.href = `https://api.simpleminecraft.${domain}/v2/payments/create/${payment_system}/Aseo/${this.getPaymentSum(type)}/${timestamp}`;
    }

    getPaymentSum(type) {
        let count = this.fetchSum();
        if (count < 50) count = 50;
        if (type === "sbp" && count < 100) count = 100;
        return count;
    }

    fetchSum() {
        let count = parseInt($("#unitpay_count").val());
        if (isNaN(count)) count = 0;
        return count;
    }
}