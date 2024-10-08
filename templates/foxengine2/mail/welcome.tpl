<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Добро пожаловать в Лисий Мир!</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f8ff;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
			min-height: 300px;
            margin: auto;
            text-align: center;
            border: 2px solid #8b4513;
        }
        h1 {
            color: #d2691e; /* Цвет моркови */
            margin-bottom: 20px;
            font-family: 'lato', 'arial', sans-serif;
        }
        p {
            color: #e7bcbc;
            line-height: 1.6;
        }
        .button {
            background-color: #6b8e23; /* Оливковый цвет */
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #556b2f; /* Темно-оливковый */
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
        }
        .imgBg {
            background: url('https://foxescraft.ru/templates/foxengine2/assets/img/welcome.jpg');
			background-size: cover;
			background-position: bottom;
            padding: 20px;
            border-radius: 10px;
        }
		
		 .imgBg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(107, 142, 35, 0.5);
            z-index: 2;
        }
    </style>
</head>
<body>
    <div class="container imgBg">
        <h1>Добро пожаловать в Лисий Мир, {{username}}!</h1>
        <p>Спасибо за регистрацию на нашем проекте. Мы рады видеть вас среди наших пользователей, готовых исследовать волшебные леса и тайны Лисьих миров!</p>
		<!--
        <p>Чтобы активировать вашу учетную запись, пожалуйста, нажмите на кнопку ниже:</p>
        <a class="button" href="{{activation_link}}">Активировать учетную запись</a> -->
        <p>Если у вас возникли вопросы, не стесняйтесь обращаться к нашей поддержке.</p>
        <div class="footer">
            <p>С уважением,<br>Команда Лисьего Мира</p>
        </div>
    </div>
</body>
</html>
