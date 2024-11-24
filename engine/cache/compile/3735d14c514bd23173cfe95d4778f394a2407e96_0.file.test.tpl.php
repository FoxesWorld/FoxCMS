<?php
/* Smarty version 4.0.4, created on 2024-11-08 14:20:48
  from '/var/www/FoxCMS/templates/foxengine2/test.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_672df41085ef57_24062231',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3735d14c514bd23173cfe95d4778f394a2407e96' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/test.tpl',
      1 => 1731064702,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_672df41085ef57_24062231 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html lang="en">
<head>
	<style>
	body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.navbar {
    background-color: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-toggler {
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    display: none;
}

.navbar-collapse {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: -340px;
    top: 60px;
    width: 340px;
    height: calc(100% - 60px);
    background-color: #333;
    transition: 0.3s;
}

.navbar-collapse.show {
    right: 0;
}

.navbar-nav {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.navbar-nav li {
    padding: 1rem;
}

.navbar-nav a {
    color: white;
    text-decoration: none;
    display: block;
}

.navbar-nav a:hover {
    background-color: #575757;
}

@media (max-width: 768px) {
    .navbar-toggler {
        display: block;
    }

    .navbar-collapse {
        right: -100%;
    }
}

</style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Navbar</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <button class="navbar-toggler" type="button" aria-expanded="false">
            ☰
        </button>
        <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <!-- Elements will be dynamically added here -->
            </ul>
        </div>
    </nav>
    <?php echo '<script'; ?>
>
	class UniversalNavbar {
    constructor(navbarSelector, togglerSelector, collapseSelector) {
        this.navbar = document.querySelector(navbarSelector);
        this.navbarToggler = document.querySelector(togglerSelector);
        this.navbarCollapse = document.querySelector(collapseSelector);

        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', (event) => this.documentClickHandler(event));
        this.navbarToggler.addEventListener('click', () => this.navbarTogglerClickHandler());
    }

    toggleNavbar() {
        this.navbarCollapse.classList.toggle('show');
        this.navbarToggler.setAttribute('aria-expanded', this.navbarCollapse.classList.contains('show'));
    }

    closeNavbar() {
        this.navbarCollapse.classList.remove('show');
        this.navbarToggler.setAttribute('aria-expanded', 'false');
    }

    documentClickHandler(event) {
        if (!this.navbar.contains(event.target) && this.navbarCollapse.classList.contains('show')) {
            this.closeNavbar();
        }
    }

    navbarTogglerClickHandler() {
        this.toggleNavbar();
    }

    addNavItem(text, href) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
        this.navbarCollapse.querySelector('.navbar-nav').appendChild(li);
    }

    addDropdownItem(text, items) {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'dropdown');
        const a = document.createElement('a');
        a.classList.add('nav-link', 'dropdown-toggle');
        a.href = '#';
        a.textContent = text;
        li.appendChild(a);

        const ul = document.createElement('ul');
        ul.classList.add('dropdown-menu');

        items.forEach(item => {
            const dropdownItem = document.createElement('li');
            const dropdownLink = document.createElement('a');
            dropdownLink.classList.add('dropdown-item');
            dropdownLink.href = item.href;
            dropdownLink.textContent = item.text;
            dropdownItem.appendChild(dropdownLink);
            ul.appendChild(dropdownItem);
        });

        li.appendChild(ul);
        this.navbarCollapse.querySelector('.navbar-nav').appendChild(li);

        a.addEventListener('click', (event) => {
            event.preventDefault();
            ul.classList.toggle('show');
        });
    }
}


    const navbar = new UniversalNavbar('.navbar', '.navbar-toggler', '#navbarContent');

    // Adding items to the navbar
    navbar.addNavItem('Home', '#home');
    navbar.addNavItem('About', '#about');
    navbar.addNavItem('Contact', '#contact');

    // Adding a dropdown menu to the navbar
    navbar.addDropdownItem('Services', [
        { text: 'Web Design', href: '#webdesign' },
        { text: 'SEO', href: '#seo' },
        { text: 'Marketing', href: '#marketing' }
    ]);

<?php echo '</script'; ?>
>
</body>
</html>
<?php }
}
