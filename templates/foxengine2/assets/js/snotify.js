const SnotifyPositions = {
  leftTop: SnotifyPosition.leftTop,
  leftCenter: SnotifyPosition.leftCenter,
  leftBottom: SnotifyPosition.leftBottom,
  rightTop: SnotifyPosition.rightTop,
  rightCenter: SnotifyPosition.rightCenter,
  rightBottom: SnotifyPosition.rightBottom,
  centerTop: SnotifyPosition.centerTop,
  centerCenter: SnotifyPosition.centerCenter,
  centerBottom: SnotifyPosition.centerBottom
};

// Определение параметров уведомлений
const options = {
  toast: {
    position: SnotifyPositions.rightTop // Выберите желаемую позицию
  }
};

// Добавление Snotify в прототип Vue и использование опций
Vue.prototype.$snotify = Snotify;
Vue.use(Snotify, options);