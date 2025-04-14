 export class LottieAnimation {
      constructor(foxEngine) {
		  this.foxEngine = foxEngine;
        this.anim = null;
      }
      
      /**
       * Инициализация анимации Lottie в заданном контейнере.
       */
      init(containerId, path, loop = true) {
        const container =  $('#' + containerId).get(0);
        if (!container) {
          this.foxEngine.log(`Container with id "${containerId}" for animation not found!`, "ERROR");
          return;
        }
        this.anim = bodymovin.loadAnimation({
          container: container,
          renderer: 'svg',        // Используемый рендерер (svg, canvas или html)
          loop: loop,        // Режим зацикливания
          autoplay: true,         // Автоматический запуск анимации
          path: path
        });
      }
      
      /**
       * Запускает воспроизведение анимации.
       */
      play() {
        if (this.anim) {
          this.anim.play();
        } else {
          console.error("Анимация не инициализирована.");
        }
      }
      
      /**
       * Приостанавливает анимацию.
       */
      pause() {
        if (this.anim) {
          this.anim.pause();
        } else {
          console.error("Анимация не инициализирована.");
        }
      }
      
      /**
       * Останавливает анимацию и сбрасывает её к начальному кадру.
       */
      stop() {
        if (this.anim) {
          this.anim.stop();
        } else {
          console.error("Анимация не инициализирована.");
        }
      }
      
      /**
       * Переключает режим зацикливания анимации.
       */
      toggleLoop() {
        if (this.anim) {
          this.isLooping = !this.isLooping;
          this.anim.loop = this.isLooping;
          console.log(`Зацикливание ${this.isLooping ? "включено" : "выключено"}.`);
        } else {
          console.error("Анимация не инициализирована.");
        }
      }
    }