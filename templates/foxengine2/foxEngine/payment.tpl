    <div class="payment_buttons_list">
        <div id="payment_1000" class="payment_button payment_button_selected" onclick="foxEngine.payment.selectPaymentBlock(1000);">
            <img src="/uploads/icons/coal-1.png">
            <div class="sum">1 000 угля</div>
            <div class="sum_percent">Бонус +5% в подарок</div>
        </div>
        <div id="payment_2000" class="payment_button" onclick="foxEngine.payment.selectPaymentBlock(2000);">
            <img src="/uploads/icons/coal-2.png">
            <div class="sum">2 000 угля</div>
            <div class="sum_percent">Бонус +10% в подарок</div>
        </div>
        <div id="payment_3000" class="payment_button" onclick="foxEngine.payment.selectPaymentBlock(3000);">
            <img src="/uploads/icons/coal-3.png">
            <div class="sum">3 000 угля</div>
            <div class="sum_percent">Бонус +20% в подарок</div>
        </div>
        <div id="payment_5000" class="payment_button" onclick="foxEngine.payment.selectPaymentBlock(5000);">
            <img src="/uploads/icons/coal-4.png">
            <div class="sum">5 000 угля</div>
            <div class="sum_percent">Бонус +25% в подарок</div>
        </div>
    </div>
	
	<div class="importantText">
		В данный момент текущая опция находится в разработке и поезда не возят уголь в наш город :coal: 
		<p>Держитесь жители! <b>City Must Not Fall!</b></p>
	</div>

    <div class="payment_custom">
        <div class="description">
            Или самостоятельно укажите нужную вам сумму угля
            в специальном поле справа
        </div>
        <div class="payment_custom_form">
            <div class="input_block" style="max-width: 418px; float: left;">
                <input type="number" id="unitpay_count" name="unitpay_count" class="input" required="" />
                <label class="label">Введите количество угля</label>
            </div>
        </div>

        <div class="description">
            После пополнения на Ваш счет будет зачислено:
            <br>
            <span id="bonus_information">Включая бонус размером 5%!</span>
        </div>
        <div class="payment_custom_form">
            <b id="count_after_donate">1050 угля</b>
        </div>
    </div>

<script>
	foxEngine.payment.init();
	//document.getElementById('unitpay_count').addEventListener('input', (event) => foxEngine.payment.onInputChange(event));
</script>

	<style>

		.payment_buttons_list {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}

		.payment_button {
			width: 200px;
			height: 200px;
			text-align: center;
			box-sizing: border-box;
			display: inline-block;
			background: #fffefc;
			box-shadow: 0 4px 20px 4px rgba(0, 0, 0, 0.12);
			margin-right: 18px;
			cursor: pointer;
			transition: 0.3s ease;
			border-radius: 4px;
		}

		.payment_button:hover {
			transform: translateY(-8px);
		}

		.payment_button .sum {
			font-size: 26px;
			font-weight: 800;
			margin-bottom: 4px;
		}

		.payment_button .sum_percent {
			font-size: 14px;
			font-weight: 600;
			color: #cc8c11;
		}

		.payment_button img {
			width: 104px;
			height: 78px;
			margin: 25px;
		}

		.payment_button_selected {
			background: #abca4e;
			transform: translateY(-8px);
			box-shadow: 0 4px 20px 4px rgba(179, 199, 117, 0.5);
		}

		.payment_button_selected .sum {
			color: #3a4e00;
		}

		.payment_button_selected .sum_percent {
			color: #ffffff;
		}

		.payment_custom {
			font-size: 16px;
			color: #8e8b80;
			margin-top: 16px;
			display: inline-grid;
		}

		.payment_custom .description {
			text-align: left;
			margin: 34px 0 0 0;
			display: inline-block;
			width: 418px;
			font-size: 16px;
			line-height: 20px;
			color: #343434;
			font-weight: 500;
			float: left;
			min-height: 46px;
		}

		.payment_custom #count_after_donate {
			font-size: 34px;
			font-weight: 700;
			color: #c06b7b;
			padding-top: 4px;
			display: block;
		}

		.payment_custom #bonus_information {
			font-size: 16px;
			font-weight: 700;
			color: black;
		}

		.payment_custom .payment_custom_form {
			display: inline-block;
			width: 436px;
			height: 46px;
			float: right;
			margin-top: 34px;
		}

		.payment_custom .payment_thanks i {
			color: red;
			font-size: 28px;
			margin-top: 3px;
			margin-left: 4px;
			float: left;
		}

		.qiwi {
			background: #fba029;
			box-shadow: 0 3px 21px rgb(255 193 112);
		}

		.qiwi:hover {
			background: #fbb829;
			box-shadow: 0 3px 21px rgb(255 193 112);
		}

		.pay_button {
			font-size: 18px;
			text-transform: uppercase;
			font-weight: 800;
			margin-bottom: 34px;
		}

		.pay_button div {
			font-size: 12px;
			font-weight: 600;
			margin-top: 4px;
		}

		.payment_info {
		background: #ecebe4;
		/* width: 926px; */
		float: left;
		box-sizing: border-box;
		text-align: center;
		padding: 18px 0 18px 18px;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: space-between;
		justify-content: flex-start;
		flex-direction: row;
		}

		.payment_info h3 {
			width: 856px;
			text-align: left;
			font-size: 21px;
			font-weight: 600;
			color: #747262;
			margin-bottom: 34px;
		}

		.payment_rights {
			display: inline-block;
			font-size: 14px;
			width: 684px;
			margin: 18px auto auto auto;
		}

		.payment_type_button {
			overflow: hidden;
			position: relative;
			display: inline-flex;
			background: #FFFFFF;
			border-radius: 4px;
			text-align: center;
			padding: 28px;
			box-sizing: border-box;
			box-shadow: 0 -8px 16px 6px rgba(0, 0, 0, 0.05);
			cursor: pointer;
			margin-right: 17px;
			margin-bottom: 17px;
			transition: all .3s .05s ease;
			-moz-transition: all .3s .05s ease;
			-o-transition: all .3s .05s ease;
			-webkit-transition: all .3s .05s ease;
		}

		.payment_type_button p {
			position: absolute;
			right: 4px;
			bottom: 4px;
			padding: 4px 8px;
			background: black;
			font-size: 14px;
			color: white;
			border-radius: 4px;
		}

		.payment_type_button:hover {
			transform: translateY(-4px);
		}

		.payment_type_button img {
			width: 72px;
			height: 72px;
		}

	</style>

 <!--
	<div class="payment_info">
		<h3>Оплатить банковской картой (для России):</h3>
		
		<div class="payment_type_button" title="MIR" onclick="purchasecoal('unitpay', 'card');">
			<img src="/templates/foxengine/images/payments/mir.png">
		</div>

		<div class="payment_type_button" title="Visa" onclick="purchasecoal('unitpay', 'card');">
			<img src="/templates/foxengine/images/payments/visa.png">
		</div>

		<div class="payment_type_button" title="Mastercard" onclick="purchasecoal('unitpay', 'card');">
			<img src="/templates/foxengine/images/payments/mastercard.png">
		</div>

		<div class="payment_type_button" title="Union Pay" onclick="purchasecoal('unitpay', 'card');">
			<img src="/templates/foxengine/images/payments/unionpay.png?">
		</div>

		<div class="payment_type_button" title="Tinkoff Pay" onclick="purchasecoal('unitpay', 'card');">
			<img src="/templates/foxengine/images/payments/tinkoffpay.png?v2">
		</div>

		<div class="payment_type_button" title="Система быстрых платежей" onclick="purchasecoal('freekassa', '42')">
			<img src="/templates/foxengine/images/payments/sbp.png">
		</div>

		<h3 style="margin-top: 24px">Оплатить банковской картой:</h3>
		<!--div class="payment_type_button" title="VISA UA" onclick="purchasecoal('freekassa', '7');">
			<img src="/templates/foxengine/images/payments/visa.png"/>
			<p>гривны</p>
		</div>

		<div class="payment_type_button" title="Master Card UA" onclick="purchasecoal('freekassa', '7');">
			<img src="/templates/foxengine/images/payments/mastercard.png"/>
			<p>гривны</p>
		</div>

		<div class="payment_type_button" title="VISA" onclick="purchasecoal('freekassa', '41');">
			<img src="/templates/foxengine/images/payments/visa.png">
			<p>тенге</p>
		</div>

		<div class="payment_type_button" title="Master Card" onclick="purchasecoal('freekassa', '41');">
			<img src="/templates/foxengine/images/payments/mastercard.png">
			<p>тенге</p>
		</div>

		<h3 style="margin-top: 24px">Прочие способы:</h3>

		<!--div class="payment_type_button" title="QIWI" onclick="purchasecoal('freekassa', '10')">
			<img src="/templates/foxengine/images/payments/qiwi.png"/>
		</div>

		<div class="payment_type_button" title="Оплата скинами" onclick="purchasecoal('freekassa', '27')">
			<img src="/templates/foxengine/images/payments/steam.png">
		</div>

		<!--div class="payment_type_button" title="WebMoney" onclick="purchasecoal('freekassa')">
			<img src="/templates/foxengine/images/payments/webmoney.png"/>
		</div>

		<!--div class="payment_type_button" title="YooMoney" onclick="purchasecoal('freekassa', '6');">
			<img src="/templates/foxengine/images/payments/yoomoney.png"/>
		</div>

		<div class="payment_type_button" title="Perfect Money" onclick="purchasecoal('enot', 'pm');">
			<img src="/templates/foxengine/images/payments/perfectmoney.png">
		</div>

		<div class="payment_type_button" title="Bitcoin" onclick="purchasecoal('enot', 'bt')">
			<img src="/templates/foxengine/images/payments/bitcoin.png">
		</div>

		<div class="payment_type_button" title="Ton" onclick="purchasecoal('enot', 'ton');">
			<img src="/templates/foxengine/images/payments/ton.png?">
		</div>

		<div class="payment_type_button" title="Ethereum" onclick="purchasecoal('enot', 'et');">
			<img src="/templates/foxengine/images/payments/ethereum.png">
		</div>

		<div class="payment_type_button" title="Dash" onclick="purchasecoal('enot', 'ds');">
			<img src="/templates/foxengine/images/payments/dash.png">
		</div>

		<div class="payment_type_button" title="LiteCoin" onclick="purchasecoal('enot', 'lt');">
			<img src="/templates/foxengine/images/payments/litecoin.png">
		</div>

		<div class="payment_type_button" title="TRON" onclick="purchasecoal('enot', 'trx');">
			<img src="/templates/foxengine/images/payments/tron.png?">
		</div>

		<div class="payment_type_button" title="USDT" onclick="purchasecoal('enot', 'erc');">
			<img src="/templates/foxengine/images/payments/usdt.png">
		</div>

		<div class="payment_rights">Нажимая кнопку "Пополнить" Вы подтверждаете своё согласие с
			<a href="/rules.html" target="_blank">правилами проекта</a>, принимаете
			<a href="/rules.html" target="_blank">условия возврата товара и услуг</a>, а также
			<a href="/safety.html">политику безопасной оплаты</a> товара через банковскую карту.
		</div>
	 </div>
	 -->