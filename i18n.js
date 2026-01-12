/**
 * i18n 国际化支持
 * 根据浏览器 Accept-Language 请求头自动检测语言
 */

// 翻译资源
const translations = {
    'zh-CN': {
        // 页面标题和描述
        title: '智能文本处理工具',
        subtitle: '多功能文本处理与解析工具集',
        
        // 输入输出
        inputLabel: '输入内容',
        inputPlaceholder: '智能识别：输入 URL、JSON、UA、Go Struct 或 Base64，系统会自动检测并处理...',
        outputLabel: '输出结果',
        outputPlaceholder: '处理结果将显示在这里...',
        
        // 按钮
        process: '✨ 处理',
        clear: '🗑️ 清空',
        copy: '📋 复制结果',
        copied: '✅ 已复制',
        
        // 错误消息
        errorEmpty: '请输入内容！',
        errorPrefix: '错误: ',
        
        // URL 解析
        urlTool: '🔗 URL 解析',
        urlBasicInfo: 'URL 基本信息',
        urlProtocol: '协议:',
        urlHost: '主机:',
        urlPort: '端口:',
        urlPath: '路径:',
        urlHash: '哈希:',
        urlDefaultPort: '默认',
        urlNoHash: '无',
        urlQueryParams: 'Query String 参数',
        urlNoQueryParams: '未找到 Query String 参数',
        urlParseError: 'URL 解析错误: ',
        
        // JSON 工具
        jsonCompressTool: '📦 JSON 压缩/解压',
        jsonFormatTool: '📄 JSON 格式化',
        jsonDecompressed: '解压缩后的 JSON',
        jsonCompressed: '压缩后的 JSON',
        jsonFormatted: '格式化后的 JSON',
        jsonError: 'JSON 处理错误: ',
        jsonFormatError: 'JSON 格式化错误: ',
        
        // UA 分析
        uaTool: '🌐 UA 分析',
        uaClientInfo: '客户端信息分析',
        uaBrowser: '浏览器',
        uaOS: '操作系统',
        uaEngine: '渲染引擎',
        uaDevice: '设备类型',
        uaMobile: '📱 移动设备',
        uaTablet: '📱 平板设备',
        uaDesktop: '💻 桌面设备',
        uaUnknown: '未知',
        uaOriginal: '原始 UA',
        
        // Base64 工具
        base64Tool: '🔐 Base64 工具',
        base64Image: 'Base64 图片',
        base64ImageType: '图片类型: ',
        base64Decoded: '解码后的内容',
        base64Encoded: '编码后的 Base64',
        base64DecodeError: 'Base64 字符串格式正确，但解码失败',
        base64Error: '错误: ',
        
        // Go Struct
        goStructTool: '🔷 Go Struct 转 JSON',
        goStructJSON: '转换后的 JSON 结构',
        goStructExamples: '示例数据',
        goStructExample: '示例',
        goStructParseError: 'Go Struct 解析错误: ',
        
        // 复制
        copyError: '复制失败: '
    },
    'en-US': {
        // Page title and description
        title: 'Smart Text Processing Tool',
        subtitle: 'Multi-functional text processing and parsing toolset',
        
        // Input/Output
        inputLabel: 'Input Content',
        inputPlaceholder: 'Smart detection: Enter URL, JSON, UA, Go Struct or Base64, the system will automatically detect and process...',
        outputLabel: 'Output Result',
        outputPlaceholder: 'Processing results will be displayed here...',
        
        // Buttons
        process: '✨ Process',
        clear: '🗑️ Clear',
        copy: '📋 Copy Result',
        copied: '✅ Copied',
        
        // Error messages
        errorEmpty: 'Please enter content!',
        errorPrefix: 'Error: ',
        
        // URL Parser
        urlTool: '🔗 URL Parser',
        urlBasicInfo: 'URL Basic Information',
        urlProtocol: 'Protocol:',
        urlHost: 'Host:',
        urlPort: 'Port:',
        urlPath: 'Path:',
        urlHash: 'Hash:',
        urlDefaultPort: 'Default',
        urlNoHash: 'None',
        urlQueryParams: 'Query String Parameters',
        urlNoQueryParams: 'No Query String parameters found',
        urlParseError: 'URL parsing error: ',
        
        // JSON Tools
        jsonCompressTool: '📦 JSON Compress/Decompress',
        jsonFormatTool: '📄 JSON Format',
        jsonDecompressed: 'Decompressed JSON',
        jsonCompressed: 'Compressed JSON',
        jsonFormatted: 'Formatted JSON',
        jsonError: 'JSON processing error: ',
        jsonFormatError: 'JSON formatting error: ',
        
        // UA Analyzer
        uaTool: '🌐 UA Analyzer',
        uaClientInfo: 'Client Information Analysis',
        uaBrowser: 'Browser',
        uaOS: 'Operating System',
        uaEngine: 'Rendering Engine',
        uaDevice: 'Device Type',
        uaMobile: '📱 Mobile Device',
        uaTablet: '📱 Tablet Device',
        uaDesktop: '💻 Desktop Device',
        uaUnknown: 'Unknown',
        uaOriginal: 'Original UA',
        
        // Base64 Tools
        base64Tool: '🔐 Base64 Tool',
        base64Image: 'Base64 Image',
        base64ImageType: 'Image Type: ',
        base64Decoded: 'Decoded Content',
        base64Encoded: 'Encoded Base64',
        base64DecodeError: 'Base64 string format is correct, but decoding failed',
        base64Error: 'Error: ',
        
        // Go Struct
        goStructTool: '🔷 Go Struct to JSON',
        goStructJSON: 'Converted JSON Structure',
        goStructExamples: 'Example Data',
        goStructExample: 'Example',
        goStructParseError: 'Go Struct parsing error: ',
        
        // Copy
        copyError: 'Copy failed: '
    },
    'zh-TW': {
        // 頁面標題和描述
        title: '智能文本處理工具',
        subtitle: '多功能文本處理與解析工具集',
        
        // 輸入輸出
        inputLabel: '輸入內容',
        inputPlaceholder: '智能識別：輸入 URL、JSON、UA、Go Struct 或 Base64，系統會自動檢測並處理...',
        outputLabel: '輸出結果',
        outputPlaceholder: '處理結果將顯示在這裡...',
        
        // 按鈕
        process: '✨ 處理',
        clear: '🗑️ 清空',
        copy: '📋 複製結果',
        copied: '✅ 已複製',
        
        // 錯誤消息
        errorEmpty: '請輸入內容！',
        errorPrefix: '錯誤: ',
        
        // URL 解析
        urlTool: '🔗 URL 解析',
        urlBasicInfo: 'URL 基本資訊',
        urlProtocol: '協議:',
        urlHost: '主機:',
        urlPort: '端口:',
        urlPath: '路徑:',
        urlHash: '雜湊:',
        urlDefaultPort: '預設',
        urlNoHash: '無',
        urlQueryParams: 'Query String 參數',
        urlNoQueryParams: '未找到 Query String 參數',
        urlParseError: 'URL 解析錯誤: ',
        
        // JSON 工具
        jsonCompressTool: '📦 JSON 壓縮/解壓',
        jsonFormatTool: '📄 JSON 格式化',
        jsonDecompressed: '解壓縮後的 JSON',
        jsonCompressed: '壓縮後的 JSON',
        jsonFormatted: '格式化後的 JSON',
        jsonError: 'JSON 處理錯誤: ',
        jsonFormatError: 'JSON 格式化錯誤: ',
        
        // UA 分析
        uaTool: '🌐 UA 分析',
        uaClientInfo: '客戶端資訊分析',
        uaBrowser: '瀏覽器',
        uaOS: '作業系統',
        uaEngine: '渲染引擎',
        uaDevice: '設備類型',
        uaMobile: '📱 行動設備',
        uaTablet: '📱 平板設備',
        uaDesktop: '💻 桌面設備',
        uaUnknown: '未知',
        uaOriginal: '原始 UA',
        
        // Base64 工具
        base64Tool: '🔐 Base64 工具',
        base64Image: 'Base64 圖片',
        base64ImageType: '圖片類型: ',
        base64Decoded: '解碼後的內容',
        base64Encoded: '編碼後的 Base64',
        base64DecodeError: 'Base64 字串格式正確，但解碼失敗',
        base64Error: '錯誤: ',
        
        // Go Struct
        goStructTool: '🔷 Go Struct 轉 JSON',
        goStructJSON: '轉換後的 JSON 結構',
        goStructExamples: '範例資料',
        goStructExample: '範例',
        goStructParseError: 'Go Struct 解析錯誤: ',
        
        // 複製
        copyError: '複製失敗: '
    }
};

// 当前语言
let currentLang = 'zh-CN';

// 支持的语言列表
const supportedLanguages = ['zh-CN', 'zh-TW', 'en-US'];

// 语言映射（将浏览器语言代码映射到支持的语言）
const languageMap = {
    'zh': 'zh-CN',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'zh-HK': 'zh-TW',
    'en': 'en-US',
    'en-US': 'en-US',
    'en-GB': 'en-US',
    'en-AU': 'en-US',
    'en-CA': 'en-US'
};

/**
 * 从浏览器 Accept-Language 请求头检测语言
 */
function detectLanguage() {
    // 优先使用 localStorage 中保存的语言
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && supportedLanguages.includes(savedLang)) {
        return savedLang;
    }
    
    // 从浏览器语言设置检测
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 精确匹配
    if (languageMap[browserLang]) {
        return languageMap[browserLang];
    }
    
    // 部分匹配（如 zh-Hans -> zh-CN）
    const langPrefix = browserLang.split('-')[0].toLowerCase();
    if (languageMap[langPrefix]) {
        return languageMap[langPrefix];
    }
    
    // 检查所有 Accept-Language
    if (navigator.languages) {
        for (const lang of navigator.languages) {
            const exact = languageMap[lang];
            if (exact) return exact;
            
            const prefix = lang.split('-')[0].toLowerCase();
            if (languageMap[prefix]) {
                return languageMap[prefix];
            }
        }
    }
    
    // 默认返回中文
    return 'zh-CN';
}

/**
 * 设置语言
 */
function setLanguage(lang) {
    if (supportedLanguages.includes(lang)) {
        currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        document.documentElement.lang = lang;
        updatePageLanguage();
        return true;
    }
    return false;
}

/**
 * 获取翻译文本
 */
function t(key, defaultValue = '') {
    const translation = translations[currentLang];
    if (translation && translation[key]) {
        return translation[key];
    }
    
    // 如果当前语言没有，尝试使用中文
    if (currentLang !== 'zh-CN' && translations['zh-CN'] && translations['zh-CN'][key]) {
        return translations['zh-CN'][key];
    }
    
    return defaultValue || key;
}

/**
 * 更新页面语言
 */
function updatePageLanguage() {
    // 更新页面标题
    document.title = t('title');
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = text;
            } else {
                element.value = text;
            }
        } else {
            element.textContent = text;
        }
    });
    
    // 更新所有带有 data-i18n-html 属性的元素（支持 HTML）
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        element.innerHTML = t(key);
    });
    
    // 触发自定义事件，通知其他脚本语言已更改
    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: currentLang } 
    }));
}

/**
 * 初始化 i18n
 */
function initI18n() {
    currentLang = detectLanguage();
    document.documentElement.lang = currentLang;
    updatePageLanguage();
}

// 页面加载时自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

// 导出函数供外部使用
window.i18n = {
    t,
    setLanguage,
    getLanguage: () => currentLang,
    getSupportedLanguages: () => supportedLanguages,
    initI18n
};
