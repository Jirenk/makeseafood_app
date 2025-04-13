// common.js - 处理所有原型页面的共享功能

// 检查Tailwind CSS是否成功加载
document.addEventListener('DOMContentLoaded', function() {
    // 尝试检测Tailwind是否加载成功
    setTimeout(function() {
        const testElement = document.createElement('div');
        testElement.className = 'hidden sm:block';
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        const isHidden = computedStyle.display === 'none';
        
        document.body.removeChild(testElement);
        
        // 如果Tailwind未加载成功，应用备用样式
        if (!isHidden) {
            document.body.classList.add('tailwind-failed');
            console.log('Tailwind CSS加载失败，应用备用样式');
        } else {
            console.log('Tailwind CSS加载成功');
        }
    }, 500);
});

// 处理图片加载错误
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            // 如果图片加载失败，应用默认图片或样式
            this.src = 'https://via.placeholder.com/300x300?text=图片加载失败';
            this.alt = '图片加载失败';
            
            // 添加失败样式
            img.parentElement.classList.add('img-error');
        });
    });
});

// 添加页面切换动画
const pageLinks = document.querySelectorAll('a[href]');
pageLinks.forEach(function(link) {
    // 只处理站内链接
    if (link.getAttribute('href').startsWith('http')) {
        return;
    }
    
    link.addEventListener('click', function(e) {
        const currentPage = document.querySelector('.content-area');
        
        // 只在有内容区域的情况下添加动画
        if (currentPage) {
            e.preventDefault();
            const targetHref = this.getAttribute('href');
            
            // 添加过渡效果
            currentPage.style.opacity = '0';
            currentPage.style.transition = 'opacity 0.3s ease';
            
            setTimeout(function() {
                window.location.href = targetHref;
            }, 300);
        }
    });
});

// 处理底部导航的活跃状态
function updateActiveNav() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    // 清除所有活跃状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // 根据当前页面设置活跃状态
    let activeSelector = '.nav-item[href="' + filename + '"]';
    if (filename === '' || filename === 'index.html') {
        activeSelector = '.nav-item[href="home.html"]';
    } else {
        navItems.forEach(item => {
            if (item.getAttribute('href') === filename) {
                item.classList.add('active');
            }
        });
    }
}

// 检查Font Awesome是否加载成功
function checkFontAwesome() {
    var testIcon = document.createElement('i');
    testIcon.className = 'fas fa-home';
    document.body.appendChild(testIcon);
    
    var iconStyle = window.getComputedStyle(testIcon);
    var isFontAwesomeLoaded = (iconStyle.fontFamily.toLowerCase().indexOf('awesome') !== -1);
    
    if (!isFontAwesomeLoaded) {
        console.log('Font Awesome 加载失败，已替换为Emoji图标');
        replaceIcons();
    }
    
    document.body.removeChild(testIcon);
}

// 替换图标为Emoji
function replaceIcons() {
    var iconMap = {
        'fa-home': '🏠',
        'fa-compass': '🧭',
        'fa-camera': '📷',
        'fa-book': '📖',
        'fa-user': '👤',
        'fa-chevron-right': '▶',
        'fa-chevron-left': '◀',
        'fa-chevron-down': '▼',
        'fa-chevron-up': '▲',
        'fa-search': '🔍',
        'fa-heart': '❤️',
        'fa-star': '⭐',
        'fa-check': '✅',
        'fa-times': '❌',
        'fa-clock': '⏰',
        'fa-calendar': '📅',
        'fa-image': '🖼️',
        'fa-arrow-left': '←',
        'fa-arrow-right': '→',
        'fa-signal': '📶',
        'fa-wifi': '📡',
        'fa-battery-three-quarters': '🔋'
    };
    
    // 替换所有图标
    document.querySelectorAll('i[class*="fa-"]').forEach(function(icon) {
        // 找出匹配的图标
        for (var faClass in iconMap) {
            if (icon.classList.contains(faClass)) {
                icon.textContent = iconMap[faClass];
                break;
            }
        }
    });
}

// 添加移动设备兼容性
function addMobileCompatibility() {
    // 防止iOS Safari上的双击缩放
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 处理iPhone X及以上机型的底部安全区域
    var bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav && hasNotch()) {
        bottomNav.style.paddingBottom = 'calc(0.5rem + env(safe-area-inset-bottom))';
    }
}

// 检测是否是刘海屏设备
function hasNotch() {
    // 简单检测，iOS设备的安全区域
    return CSS.supports('padding-bottom: env(safe-area-inset-bottom)');
}

// 设置底部导航栏
function setupNavigation() {
    var navItems = document.querySelectorAll('.nav-item');
    var currentPage = getCurrentPage();
    
    navItems.forEach(function(item) {
        var href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 获取当前页面名称
function getCurrentPage() {
    var path = window.location.pathname;
    var filename = path.split('/').pop();
    return filename.split('.')[0];
} 