$(document).ready(function() {
    // 获取用户角色
    const userRole = localStorage.getItem('userRole');
    console.log('当前用户角色:', userRole);
    
    // 根据角色显示对应的导航栏和内容
    function initializeByRole() {
        // 隐藏所有导航栏和内容
        $('.nav-links').hide();
        $('.investor-dashboard, .issuer-dashboard, .admin-dashboard').hide();
        
        // 根据角色显示对应内容
        switch(userRole) {
            case 'investor':
                console.log('显示投资者界面');
                $('.investor-nav').show();
                $('.investor-dashboard').show();
                break;
            case 'issuer':
                console.log('显示发行者界面');
                $('.issuer-nav').show();
                $('.issuer-dashboard').show();
                break;
            case 'admin':
                console.log('显示管理员界面');
                $('.admin-nav').show();
                $('.admin-dashboard').show();
                break;
            default:
                console.log('未找到用户角色，返回登录页');
                window.location.href = 'index.html';
        }
    }

    // 初始化页面
    initializeByRole();

    // 导航菜单点击事件
    $('.nav-links a').click(function(e) {
        e.preventDefault();
        const $this = $(this);
        
        // 移除所有active类
        $('.nav-links a').removeClass('active');
        // 添加active类到当前点击的链接
        $this.addClass('active');

        const menuText = $this.text().trim();
        
        if (userRole === 'admin') {
            // 管理员界面处理
            $('.admin-dashboard > div').hide();
            switch(menuText) {
                case '用户管理':
                    $('.user-management').show();
                    break;
                case '项目审核':
                    showProjectAudit();
                    break;
                case '数据分析':
                    showDataAnalysis();
                    break;
                case '论坛管理':
                    showForumManagement();
                    break;
                case '系统设置':
                    showSystemSettings();
                    break;
            }
        } else if (userRole === 'investor') {
            // 投资者界面处理
            $('.investor-dashboard > div').hide();
            switch(menuText) {
                case '投资概览':
                    $('.dashboard-header, .stats-cards').show();
                    break;
                case '投资项目':
                    $('.investment-projects').show();
                    loadInvestmentProjects();
                    break;
                case '人才项目':
                    showTalentProjects();
                    break;
                case '投资市场':
                    showMarketAnalysis();
                    break;
                case '资金管理':
                    $('.fund-management').show();
                    break;
            }
        } else if (userRole === 'issuer') {
            // 发行者界面处理
            $('.issuer-dashboard > div').hide();
            switch(menuText) {
                case '项目管理':
                    $('.projects-list').show();
                    break;
                case '人才项目':
                    const talentContent = showTalentProjects();
                    $('.issuer-dashboard').html(talentContent);
                    break;
                case '投资者互动':
                    showInvestorInteraction();
                    break;
                case '数据分析':
                    showIssuerDataAnalysis();
                    break;
                case '发布项目':
                    showPublishProject();
                    break;
            }
        }
    });

    // 添加投资者界面的功能处理
    function loadInvestmentProjects() {
        // 加载投资项目数据
        console.log('加载投资项目列表...');
    }

    function loadMarketData() {
        // 加载市场数据
        console.log('加载市场数据...');
    }

    function loadFundManagement() {
        // 加载资金管理界面
        console.log('加载资金管理界面...');
    }

    // 投资概览详情按钮点击事件
    $('.view-details-btn').click(function() {
        alert('正在加载详细的资产分布和历史收益数据...');
    });

    // 项目详情按钮点击事件
    $('.view-details').click(function() {
        alert('正在加载项目详细信息...');
    });

    // 市场分析按钮点击事件
    $('.view-market-btn').click(function() {
        alert('正在加载市场分析详情...');
    });

    // 资金管理按钮点击事件
    $('.fund-btn.deposit').click(function() {
        alert('正在跳转到充值页面...');
    });

    $('.fund-btn.withdraw').click(function() {
        alert('正在跳转到提现页面...');
    });

    $('.fund-btn.distribute').click(function() {
        alert('正在跳转到收益分配页面...');
    });

    // 用户下拉菜单
    $('.user-dropdown').click(function(e) {
        e.stopPropagation();
        $(this).find('.dropdown-content').toggleClass('show');
    });

    // 退出登录
    $('.dropdown-content a').click(function(e) {
        const action = $(this).find('i').attr('class');
        if (action.includes('sign-out')) {
            e.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        }
    });

    // 点击其他地方关闭下拉菜单
    $(document).click(function() {
        $('.dropdown-content').removeClass('show');
    });

    // 管理员界面功能处理
    if (userRole === 'admin') {
        // 项目审核界面
        $('.admin-nav a').click(function(e) {
            e.preventDefault();
            const menuText = $(this).text().trim();
            
            // 隐藏所有内容
            $('.admin-dashboard > div').hide();
            
            switch(menuText) {
                case '项目审核':
                    showProjectAudit();
                    break;
                case '数据分析':
                    showDataAnalysis();
                    break;
                case '论坛管理':
                    showForumManagement();
                    break;
                case '系统设置':
                    showSystemSettings();
                    break;
            }
        });
    }

    // 项目审核界面
    function showProjectAudit() {
        const projectAuditHtml = `
            <div class="project-audit-section">
                <div class="section-header">
                    <h2>项目审核</h2>
                    <div class="filter-bar">
                        <select class="audit-status-filter">
                            <option value="pending">待审核</option>
                            <option value="approved">已通过</option>
                            <option value="rejected">已拒绝</option>
                        </select>
                        <button class="refresh-btn">刷新</button>
                    </div>
                </div>
                <table class="audit-table">
                    <thead>
                        <tr>
                            <th>项目名称</th>
                            <th>发行方</th>
                            <th>目标金额</th>
                            <th>提交时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>创新科技项目B</td>
                            <td>某科技有限公司</td>
                            <td>¥2,000,000</td>
                            <td>2024-03-20</td>
                            <td><span class="status-badge pending">待审核</span></td>
                            <td>
                                <button class="action-btn approve">通过</button>
                                <button class="action-btn reject">拒绝</button>
                                <button class="action-btn view">查看</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        $('.admin-dashboard').html(projectAuditHtml);
        
        // 添加按钮事件处理
        $('.action-btn.approve').click(function() {
            alert('确认通过该项目？');
        });
        
        $('.action-btn.reject').click(function() {
            alert('确认拒绝该项目？');
        });
        
        $('.action-btn.view').click(function() {
            alert('查看项目详情...');
        });
    }

    // 数据分析界面
    function showDataAnalysis() {
        const dataAnalysisHtml = `
            <div class="data-analysis-section">
                <div class="section-header">
                    <h2>平台数据分析</h2>
                    <div class="date-range">
                        <input type="date" class="start-date">
                        <span>至</span>
                        <input type="date" class="end-date">
                        <button class="query-btn">查询</button>
                    </div>
                </div>
                <div class="analysis-cards">
                    <div class="analysis-card">
                        <h3>用户增长</h3>
                        <div class="chart-container">
                            <!-- 这里可以放置用户增长图表 -->
                            <p>新增用户：150</p>
                            <p>总用户数：1,234</p>
                        </div>
                    </div>
                    <div class="analysis-card">
                        <h3>交易数据</h3>
                        <div class="chart-container">
                            <!-- 这里可以放置交易数据图表 -->
                            <p>交易总额：¥5,678,900</p>
                            <p>交易笔数：234</p>
                        </div>
                    </div>
                    <div class="analysis-card">
                        <h3>项目分析</h3>
                        <div class="chart-container">
                            <!-- 这里可以放置项目分析图表 -->
                            <p>进行中项目：45</p>
                            <p>完成率：85%</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('.admin-dashboard').html(dataAnalysisHtml);
        
        // 添加查询按钮事件
        $('.query-btn').click(function() {
            alert('正在查询指定日期范围的数据...');
        });
    }

    // 系统设置界面
    function showSystemSettings() {
        const systemSettingsHtml = `
            <div class="system-settings-section">
                <div class="section-header">
                    <h2>系统设置</h2>
                </div>
                <div class="settings-container">
                    <div class="setting-group">
                        <h3>基本设置</h3>
                        <div class="setting-item">
                            <label>平台名称</label>
                            <input type="text" value="慧才">
                        </div>
                        <div class="setting-item">
                            <label>系统公告</label>
                            <textarea rows="3">欢迎使用链动慧才平台</textarea>
                        </div>
                    </div>
                    <div class="setting-group">
                        <h3>安全设置</h3>
                        <div class="setting-item">
                            <label>登录失败次数限制</label>
                            <input type="number" value="5">
                        </div>
                        <div class="setting-item">
                            <label>密码有效期（天）</label>
                            <input type="number" value="90">
                        </div>
                    </div>
                    <div class="setting-group">
                        <h3>通知设置</h3>
                        <div class="setting-item">
                            <label>邮件通知</label>
                            <input type="checkbox" checked>
                        </div>
                        <div class="setting-item">
                            <label>短信通知</label>
                            <input type="checkbox" checked>
                        </div>
                    </div>
                    <button class="save-settings-btn">保存设置</button>
                </div>
            </div>
        `;
        $('.admin-dashboard').html(systemSettingsHtml);
        
        // 添加保存按钮事件
        $('.save-settings-btn').click(function() {
            alert('保存设置成功！');
        });
    }

    // 发行者相关功能
    function showInvestorInteraction() {
        const interactionHtml = `
            <div class="investor-interaction">
                <div class="section-header">
                    <h2>投资者互动</h2>
                </div>
                <div class="interaction-list">
                    <div class="message-card">
                        <div class="message-header">
                            <span class="investor-name">张三</span>
                            <span class="message-time">2024-03-20 15:30</span>
                        </div>
                        <div class="message-content">
                            请问项目A的具体收益模式是什么？
                        </div>
                        <div class="message-actions">
                            <button class="reply-btn">回复</button>
                        </div>
                    </div>
                    <!-- 更多消息 -->
                </div>
            </div>
        `;
        $('.issuer-dashboard').html(interactionHtml);
    }

    function showIssuerDataAnalysis() {
        const analysisHtml = `
            <div class="issuer-analysis">
                <div class="section-header">
                    <h2>数据分析</h2>
                    <div class="date-range">
                        <input type="date" class="start-date">
                        <span>至</span>
                        <input type="date" class="end-date">
                        <button class="query-btn">查询</button>
                    </div>
                </div>
                
                <div class="analysis-grid">
                    <!-- 投资趋势图 -->
                    <div class="chart-card">
                        <h3>投资趋势分析</h3>
                        <canvas id="investmentTrendChart"></canvas>
                    </div>
                    
                    <!-- 人才分布图 -->
                    <div class="chart-card">
                        <h3>人才学历分布</h3>
                        <canvas id="educationDistChart"></canvas>
                    </div>
                    
                    <!-- 专业分布图 -->
                    <div class="chart-card">
                        <h3>专业领分布</h3>
                        <canvas id="majorDistChart"></canvas>
                    </div>
                    
                    <!-- 投资回报率分析 -->
                    <div class="chart-card">
                        <h3>投资回报率分析</h3>
                        <canvas id="roiAnalysisChart"></canvas>
                    </div>
                </div>
            </div>
        `;
        
        $('.issuer-dashboard').html(analysisHtml);

        // 初始化图表
        initCharts();
    }

    // 初始化所有图表
    function initCharts() {
        // 投资趋势图
        const trendCtx = document.getElementById('investmentTrendChart').getContext('2d');
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [{
                    label: '投资金额（万元）',
                    data: [150, 200, 180, 250, 300, 280],
                    borderColor: '#2a5298',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '近6个月投资趋势'
                    }
                }
            }
        });

        // 人才学历分布图
        const educationCtx = document.getElementById('educationDistChart').getContext('2d');
        new Chart(educationCtx, {
            type: 'pie',
            data: {
                labels: ['博士', '硕士', '本科'],
                datasets: [{
                    data: [15, 45, 40],
                    backgroundColor: [
                        '#2a5298',
                        '#4CAF50',
                        '#FFC107'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

        // 专业分布图
        const majorCtx = document.getElementById('majorDistChart').getContext('2d');
        new Chart(majorCtx, {
            type: 'bar',
            data: {
                labels: ['计算机', '金融', '管理', '理工类', '其他'],
                datasets: [{
                    label: '人数',
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: '#2a5298'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // 投资回报率分析
        const roiCtx = document.getElementById('roiAnalysisChart').getContext('2d');
        new Chart(roiCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: '预期回报率',
                    data: [15, 18, 20, 22],
                    borderColor: '#2a5298',
                    tension: 0.4
                }, {
                    label: '实际回报率',
                    data: [14, 17, 19, 21],
                    borderColor: '#4CAF50',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '回报率分析 (%)'
                    }
                }
            }
        });
    }

    function showPublishProject() {
        const publishHtml = `
            <div class="publish-project">
                <div class="section-header">
                    <h2>发布新项目</h2>
                </div>
                <form class="project-form">
                    <div class="form-group">
                        <label>项目名称</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>目标金额</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>项目描述</label>
                        <textarea rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>预期收益</label>
                        <input type="text" required>
                    </div>
                    <button type="submit" class="submit-btn">发布项目</button>
                </form>
            </div>
        `;
        $('.issuer-dashboard').html(publishHtml);
    }

    // 投资者市场分析功能
    function showMarketAnalysis() {
        const marketHtml = `
            <div class="market-analysis">
                <div class="section-header">
                    <h2>市场分析</h2>
                </div>
                <div class="market-overview">
                    <div class="market-card">
                        <h3>市场趋势</h3>
                        <div class="chart-container">
                            <!-- 这里可以放置图 -->
                            <p>市场整体上涨 15%</p>
                        </div>
                    </div>
                    <div class="market-card">
                        <h3>热门项目</h3>
                        <ul class="hot-projects">
                            <li>
                                <span class="project-name">科技创新基金B</span>
                                <span class="project-return">预期收益：18%</span>
                            </li>
                            <!-- 更多项目 -->
                        </ul>
                    </div>
                </div>
            </div>
        `;
        $('.investor-dashboard').html(marketHtml);
    }

    // 添加人才项目展示函数
    function showTalentProjects() {
        const talentProjectsHtml = `
            <div class="talent-projects">
                <div class="section-header">
                    <h2>人才项目</h2>
                    <div class="filter-bar">
                        <select class="education-filter">
                            <option value="all">学历筛选</option>
                            <option value="985">985高校</option>
                            <option value="211">211高校</option>
                            <option value="双一流">双一流高校</option>
                            <option value="普通本科">普通本科</option>
                            <optgroup label="学历层次">
                                <option value="博士">博士</option>
                                <option value="硕士">硕士</option>
                                <option value="本科">本科</option>
                            </optgroup>
                        </select>
                        <select class="major-filter">
                            <option value="all">专业类型</option>
                            <optgroup label="工学类">
                                <option value="computer">计算机科学与技术</option>
                                <option value="software">软件工程</option>
                                <option value="ai">人工智能</option>
                                <option value="electronic">电子信息工程</option>
                                <option value="automation">自动化</option>
                            </optgroup>
                            <optgroup label="理学类">
                                <option value="math">数学</option>
                                <option value="physics">物理学</option>
                                <option value="chemistry">化学</option>
                            </optgroup>
                            <optgroup label="经管类">
                                <option value="finance">金融学</option>
                                <option value="economics">经济学</option>
                                <option value="management">工商管理</option>
                                <option value="accounting">会计学</option>
                            </optgroup>
                            <optgroup label="文社科类">
                                <option value="law">法学</option>
                                <option value="education">教育学</option>
                                <option value="literature">中国语言文学</option>
                            </optgroup>
                        </select>
                        <select class="skill-filter">
                            <option value="all">技能特长</option>
                            <optgroup label="编程语言">
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </optgroup>
                            <optgroup label="专业技能">
                                <option value="ai-ml">人工智能/机器学习</option>
                                <option value="data-analysis">数据分析</option>
                                <option value="web-dev">Web开发</option>
                            </optgroup>
                            <optgroup label="语言能力">
                                <option value="english">英语能力</option>
                                <option value="japanese">日语能力</option>
                            </optgroup>
                        </select>
                        <input type="text" placeholder="搜索专业、技能、奖项...">
                        <button class="search-btn">搜索</button>
                    </div>
                </div>

                <div class="talent-list">
                    <div class="talent-card">
                        <div class="talent-header">
                            <div class="talent-basic">
                                <img src="images/avatar-default.png" class="talent-avatar">
                                <div class="talent-info">
                                    <h3>张三 | 计算机科学与技术</h3>
                                    <p>清华大学 | 硕士研究生 | 2024届</p>
                                </div>
                            </div>
                            <div class="talent-status">
                                <span class="status-badge available">可投资</span>
                            </div>
                        </div>
                        <div class="talent-content">
                            <div class="achievements">
                                <h4>主要成就</h4>
                                <ul>
                                    <li>国家奖学金获得者</li>
                                    <li>ACM程序设计大赛金牌</li>
                                    <li>发表SCI论文2篇</li>
                                </ul>
                            </div>
                            <div class="skills">
                                <h4>技能特长</h4>
                                <div class="skill-tags">
                                    <span class="skill-tag">人工智能</span>
                                    <span class="skill-tag">深度学习</span>
                                    <span class="skill-tag">Python</span>
                                </div>
                            </div>
                        </div>
                        <div class="talent-footer">
                            <button class="action-btn view-detail">查看详情</button>
                            <button class="action-btn invest">投资意向</button>
                        </div>
                    </div>

                    <div class="talent-card">
                        <div class="talent-header">
                            <div class="talent-basic">
                                <img src="images/avatar-default.png" class="talent-avatar">
                                <div class="talent-info">
                                    <h3>李四 | 金融学</h3>
                                    <p>北京大学 | 硕士研究生 | 2024届</p>
                                </div>
                            </div>
                            <div class="talent-status">
                                <span class="status-badge available">可投资</span>
                            </div>
                        </div>
                        <div class="talent-content">
                            <div class="achievements">
                                <h4>主要成就</h4>
                                <ul>
                                    <li>CFA二级证书</li>
                                    <li>全国金融建模大赛一等奖</li>
                                    <li>北大五四奖学金</li>
                                </ul>
                            </div>
                            <div class="skills">
                                <h4>技能特长</h4>
                                <div class="skill-tags">
                                    <span class="skill-tag">量化交易</span>
                                    <span class="skill-tag">风险管理</span>
                                    <span class="skill-tag">金融分析</span>
                                </div>
                            </div>
                        </div>
                        <div class="talent-footer">
                            <button class="action-btn view-detail">查看详情</button>
                            <button class="action-btn invest">投资意向</button>
                        </div>
                    </div>

                    <div class="talent-card">
                        <div class="talent-header">
                            <div class="talent-basic">
                                <img src="images/avatar-default.png" class="talent-avatar">
                                <div class="talent-info">
                                    <h3>王五 | 人工智能</h3>
                                    <p>复旦大学 | 博士研究生 | 2024届</p>
                                </div>
                            </div>
                            <div class="talent-status">
                                <span class="status-badge available">可投资</span>
                            </div>
                        </div>
                        <div class="talent-content">
                            <div class="achievements">
                                <h4>主要成就</h4>
                                <ul>
                                    <li>发表顶会论文3篇</li>
                                    <li>国家奖学金</li>
                                    <li>谷歌AI竞赛全球前10</li>
                                </ul>
                            </div>
                            <div class="skills">
                                <h4>技能特长</h4>
                                <div class="skill-tags">
                                    <span class="skill-tag">机器学习</span>
                                    <span class="skill-tag">计算机视觉</span>
                                    <span class="skill-tag">深度学习</span>
                                </div>
                            </div>
                        </div>
                        <div class="talent-footer">
                            <button class="action-btn view-detail">查看详情</button>
                            <button class="action-btn invest">投资意向</button>
                        </div>
                    </div>

                    <div class="talent-card">
                        <div class="talent-header">
                            <div class="talent-basic">
                                <img src="images/avatar-default.png" class="talent-avatar">
                                <div class="talent-info">
                                    <h3>赵六 | 电子工程</h3>
                                    <p>浙江大学 | 硕士研究生 | 2024届</p>
                                </div>
                            </div>
                            <div class="talent-status">
                                <span class="status-badge available">可投资</span>
                            </div>
                        </div>
                        <div class="talent-content">
                            <div class="achievements">
                                <h4>主要成就</h4>
                                <ul>
                                    <li>国家发明专利3项</li>
                                    <li>浙大优秀研究生</li>
                                    <li>电子设计大赛特等奖</li>
                                </ul>
                            </div>
                            <div class="skills">
                                <h4>技能特长</h4>
                                <div class="skill-tags">
                                    <span class="skill-tag">芯片设计</span>
                                    <span class="skill-tag">嵌入式开发</span>
                                    <span class="skill-tag">硬件设计</span>
                                </div>
                            </div>
                        </div>
                        <div class="talent-footer">
                            <button class="action-btn view-detail">查看详情</button>
                            <button class="action-btn invest">投资意向</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 如果是投资者界面，直接显示
        if (userRole === 'investor') {
            $('.investor-dashboard').html(talentProjectsHtml);
        }
        
        // 返回HTML内容供其他地方使用
        return talentProjectsHtml;
    }

    // 筛选功能实现
    function filterTalents(education, major, skill) {
        console.log(`筛选条件：学历-${education}，专业-${major}，技能-${skill}`);
        // 这里可以添加实际的筛选逻辑
        alert('正在根据选择的条件筛选人才...');
    }

    // 显示投资意向表单
    function showInvestmentForm(talentCard) {
        const name = talentCard.find('h3').text();
        const formHtml = `
            <div class="investment-form">
                <h3>投资意向 - ${name}</h3>
                <form>
                    <div class="form-group">
                        <label>投资金额</label>
                        <input type="number" placeholder="请输入投资金额" required>
                    </div>
                    <div class="form-group">
                        <label>投资期限</label>
                        <select required>
                            <option value="">请选择投资期限</option>
                            <option value="1">1年</option>
                            <option value="2">2年</option>
                            <option value="3">3年</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>投资说明</label>
                        <textarea placeholder="请输入您的投资计划和期望..." rows="4"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">提交意向</button>
                        <button type="button" class="cancel-btn">取消</button>
                    </div>
                </form>
            </div>
        `;
        
        // 显示表单（这里可以使用模态框或其他方式）
        alert('投资意向表单将在这里显示');
    }

    // 查看人才详情
    function showTalentDetail(talentCard) {
        const name = talentCard.find('h3').text();
        const detailHtml = `
            <div class="talent-detail">
                <div class="section-header">
                    <button class="back-btn"><i class="fas fa-arrow-left"></i> 返回</button>
                    <h2>人才详情</h2>
                </div>
                
                <div class="talent-profile">
                    <div class="profile-header">
                        <img src="images/avatar-default.png" class="profile-avatar">
                        <div class="profile-info">
                            <h3>${name}</h3>
                            <p>清华大学 | 硕士研究生 | 2024届</p>
                            <div class="profile-tags">
                                <span class="profile-tag">985高校</span>
                                <span class="profile-tag">计算机专业</span>
                                <span class="profile-tag">应届生</span>
                            </div>
                        </div>
                        <div class="profile-status">
                            <span class="status-badge available">可投资</span>
                            <button class="contact-btn">立即联系</button>
                        </div>
                    </div>

                    <div class="profile-content">
                        <div class="profile-section">
                            <h4>教育景</h4>
                            <div class="education-item">
                                <h5>清华大学</h5>
                                <p>计算机科学与技术 | 硕士 | 2021-2024</p>
                                <p>GPA: 3.8/4.0 | 专业排名: 前5%</p>
                            </div>
                            <div class="education-item">
                                <h5>北京大学</h5>
                                <p>计算机科学与技术 | 学士 | 2017-2021</p>
                                <p>GPA: 3.9/4.0 | 专业排名: 前3%</p>
                            </div>
                        </div>

                        <div class="profile-section">
                            <h4>获奖经历</h4>
                            <ul class="awards-list">
                                <li>国家奖学金（2022-2023学年）</li>
                                <li>ACM程序设计大赛金牌（2023）</li>
                                <li>清华大学优秀研究生（2022）</li>
                                <li>发表SCI论文2篇（第一作者）</li>
                            </ul>
                        </div>

                        <div class="profile-section">
                            <h4>项目经历</h4>
                            <div class="project-item">
                                <h5>大规模分布式系统优化项目</h5>
                                <p class="project-role">核心开发者 | 2023.03-2023.12</p>
                                <p>负责分布式系统性能优化，提升系统吞吐量30%</p>
                            </div>
                            <div class="project-item">
                                <h5>AI算法优化项目</h5>
                                <p class="project-role">项目负责人 | 2022.09-2023.02</p>
                                <p>带领团队完成AI模型优化，降低计算资源消耗40%</p>
                            </div>
                        </div>

                        <div class="profile-section">
                            <h4>技能评估</h4>
                            <div class="skills-chart">
                                <div class="skill-bar">
                                    <span class="skill-name">算法设计</span>
                                    <div class="bar-container">
                                        <div class="bar" style="width: 95%"></div>
                                    </div>
                                </div>
                                <div class="skill-bar">
                                    <span class="skill-name">机器学习</span>
                                    <div class="bar-container">
                                        <div class="bar" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div class="skill-bar">
                                    <span class="skill-name">系统架构</span>
                                    <div class="bar-container">
                                        <div class="bar" style="width: 85%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('.issuer-dashboard').html(detailHtml);

        // 返回按钮事件
        $('.back-btn').click(function() {
            showTalentProjects();
        });

        // 联系按钮事件
        $('.contact-btn').click(function() {
            showContactForm(talentCard);
        });
    }

    // 联系表单
    function showContactForm(talentCard) {
        const name = talentCard.find('h3').text();
        alert(`正在打开与 ${name} 的联系表单...`);
    }

    // 添加论坛管理功能
    function showForumManagement() {
        const forumManagementHtml = `
            <div class="forum-management">
                <div class="section-header">
                    <h2>论坛管理</h2>
                    <div class="filter-bar">
                        <select class="post-type-filter">
                            <option value="all">所有帖子</option>
                            <option value="reported">被举报</option>
                            <option value="hot">热门帖子</option>
                        </select>
                        <input type="text" placeholder="搜索帖子内容或作者...">
                        <button class="search-btn">搜索</button>
                    </div>
                </div>

                <div class="forum-posts">
                    <table class="posts-table">
                        <thead>
                            <tr>
                                <th>标题</th>
                                <th>作者</th>
                                <th>发布时间</th>
                                <th>浏览/评论</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="post-title">清华大学计算机专业应届生求职</div>
                                    <div class="post-preview">本人清华大学计算机系应届毕业生，寻找AI算法工程师岗位...</div>
                                </td>
                                <td>张三<br><span class="user-type">学生用户</span></td>
                                <td>2024-03-20<br>15:30</td>
                                <td>1.2k / 45</td>
                                <td><span class="status-badge normal">正常</span></td>
                                <td>
                                    <button class="action-btn view">查看</button>
                                    <button class="action-btn delete">删除</button>
                                    <button class="action-btn block">屏蔽</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        $('.admin-dashboard').html(forumManagementHtml);

        // 添加事件处理
        $('.action-btn.view').click(function() {
            const postTitle = $(this).closest('tr').find('.post-title').text();
            showPostDetail(postTitle);
        });

        $('.action-btn.delete').click(function() {
            const postTitle = $(this).closest('tr').find('.post-title').text();
            if (confirm(`确定要删除帖子"${postTitle}"吗？`)) {
                $(this).closest('tr').remove();
                alert('帖子已删除');
            }
        });

        $('.action-btn.block').click(function() {
            const author = $(this).closest('tr').find('td:eq(1)').text().split('\n')[0];
            if (confirm(`确定要屏蔽用户"${author}"吗？`)) {
                alert(`用户"${author}"已被屏蔽`);
                $(this).closest('tr').find('.status-badge').removeClass('normal').addClass('blocked').text('已屏蔽');
            }
        });
    }

    // 发行者的人才项目展示函数
    function showIssuerTalentProjects() {
        const talentProjectsHtml = `
            <div class="talent-projects">
                <div class="section-header">
                    <h2>人才项目管理</h2>
                    <button class="add-talent-btn">添加新人才</button>
                </div>

                <div class="filter-bar">
                    <select class="education-filter">
                        <option value="all">学历筛选</option>
                        <option value="985">985高校</option>
                        <option value="211">211高校</option>
                        <option value="双一流">双一流高校</option>
                        <option value="普通本科">普通本科</option>
                    </select>
                    <select class="major-filter">
                        <option value="all">专业类型</option>
                        <optgroup label="工学类">
                            <option value="computer">计算机科学与技术</option>
                            <option value="software">软件工程</option>
                            <option value="ai">人工智能</option>
                        </optgroup>
                        <optgroup label="理学类">
                            <option value="math">数学</option>
                            <option value="physics">物理学</option>
                        </optgroup>
                    </select>
                    <input type="text" placeholder="搜索专业、技能、奖项...">
                    <button class="search-btn">搜索</button>
                </div>

                <div class="talent-list">
                    <div class="talent-card">
                        <div class="talent-header">
                            <div class="talent-basic">
                                <img src="images/avatar-default.png" class="talent-avatar">
                                <div class="talent-info">
                                    <h3>张三 | 计算机科学与技术</h3>
                                    <p>清华大学 | 硕士研究生 | 2024届</p>
                                </div>
                            </div>
                            <div class="talent-status">
                                <span class="status-badge">已发布</span>
                            </div>
                        </div>
                        <div class="talent-content">
                            <div class="achievements">
                                <h4>主要成就</h4>
                                <ul>
                                    <li>国家奖学金获得者</li>
                                    <li>ACM程序设计大赛金牌</li>
                                </ul>
                            </div>
                            <div class="investment-info">
                                <h4>投资情况</h4>
                                <p>已收到投资意向：5个</p>
                                <p>目标金额：50万</p>
                                <p>当前进度：60%</p>
                            </div>
                        </div>
                        <div class="talent-footer">
                            <button class="action-btn edit">编辑信息</button>
                            <button class="action-btn view-intentions">查看意向</button>
                            <button class="action-btn manage">项目管理</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('.issuer-dashboard').html(talentProjectsHtml);

        // 添加事件处理
        $('.add-talent-btn').click(function() {
            showAddTalentForm();
        });

        $('.action-btn.edit').click(function() {
            const talentCard = $(this).closest('.talent-card');
            showEditTalentForm(talentCard);
        });

        $('.action-btn.view-intentions').click(function() {
            const talentCard = $(this).closest('.talent-card');
            showInvestmentIntentions(talentCard);
        });

        $('.action-btn.manage').click(function() {
            const talentCard = $(this).closest('.talent-card');
            showTalentManagement(talentCard);
        });
    }
}); 