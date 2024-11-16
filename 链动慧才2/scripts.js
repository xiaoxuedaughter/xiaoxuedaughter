$(document).ready(function() {
    // 密码显示/隐藏切换
    $('.toggle-password').click(function() {
        const passwordInput = $(this).siblings('input');
        const type = passwordInput.attr('type');
        
        if (type === 'password') {
            passwordInput.attr('type', 'text');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordInput.attr('type', 'password');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });

    // 登录按钮点击事件
    $('#loginBtn').click(function() {
        const username = $('#username').val();
        const password = $('#password').val();
        const role = $('input[name="role"]:checked').val();
        const rememberMe = $('#remember').is(':checked');

        // 表单验证
        if (!username || !password) {
            alert('请填写完整的登录信息');
            return;
        }

        // 模拟登录验证
        const mockUsers = {
            investor: { username: 'investor', password: '123456' },
            issuer: { username: 'issuer', password: '123456' },
            admin: { username: 'admin', password: '123456' }
        };

        const user = mockUsers[role];
        
        if (user && user.username === username && user.password === password) {
            // 保存登录信息
            localStorage.setItem('userRole', role);
            localStorage.setItem('username', username);
            
            // 根据角色跳转到不同页面
            switch(role) {
                case 'investor':
                    // 投资者界面
                    window.location.href = 'platform.html#investor';
                    break;
                case 'issuer':
                    // 发行者界面
                    window.location.href = 'platform.html#issuer';
                    break;
                case 'admin':
                    // 管理员界面
                    window.location.href = 'platform.html#admin';
                    break;
            }
        } else {
            alert('用户名或密码错误');
        }
    });

    // 社交媒体登录处理
    $('.social-icon').click(function(e) {
        e.preventDefault();
        const platform = $(this).hasClass('wechat') ? '微信' : 'QQ';
        alert(`正在跳转到${platform}登录...`);
    });

    // 注册链接处理
    $('.register-link a').click(function(e) {
        e.preventDefault();
        alert('正在开发注册功能...');
    });

    // 忘记密码链接处理
    $('.forgot-link').click(function(e) {
        e.preventDefault();
        alert('正在开发找回密码功能...');
    });
}); 