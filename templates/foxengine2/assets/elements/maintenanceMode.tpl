<div style="padding: 40px; background: linear-gradient(135deg, #1e1e2f, #2a2a40); color: #fff; border-radius: 15px; text-align: center; box-shadow: 0 0 30px rgba(255, 204, 0, 0.4); font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden;">
    <div style="font-size: 48px; font-weight: bold; color: #ffcc00; text-shadow: 2px 2px 10px #000; animation: pulse 2s infinite;">
        🚧 MAINTENANCE MODE 🚧
    </div>
	
		<p id="test"></p>
    <p style="margin-top: 20px; font-size: 20px; color: #ccc;">
        Наш проект находится в <span style="color: #ffcc00;">режиме судьбоносного обновления</span>.
    </p>
    <p style="font-size: 18px; margin-top: 10px;">
        Мы не просто чиним баги — <span style="color: #f88;">мы формируем будущее</span>.
    </p>
    <p style="margin-top: 20px; font-size: 16px; color: #aaa;">
        Скоро вы увидите улучшения, которые поднимут ваш опыт на <strong>совершенно новый уровень</strong>. Спасибо за ваше терпение, лояльность и поддержку.
    </p>
    <div style="margin-top: 30px; font-size: 14px; color: #666; font-style: italic;">
        ⏳ В этот момент переписывается история качества...
    </div>

    <!-- Animated stripe at bottom -->
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 15px; background: repeating-linear-gradient(45deg, #000, #000 10px, #ffcc00 10px, #ffcc00 20px);"></div>
</div>

<style>
@keyframes pulse {
    0% { transform: scale(1); text-shadow: 2px 2px 10px #000; }
    50% { transform: scale(1.05); text-shadow: 2px 2px 20px #ffcc00; }
    100% { transform: scale(1); text-shadow: 2px 2px 10px #000; }
}

#test {
	height: 256px;
	width: 256px;
	float: right;
}
</style>

<script>
	foxEngine.lottieAnimation.init("test", "/templates/foxengine2/assets/anim/maintenance.json")
</script>