/**
 * Go Struct to JSON Converter
 * 将 Go struct 定义转换为 JSON 并生成示例数据
 */

// 检测是否为 Go struct
function isGoStruct(input) {
    const trimmed = input.trim();
    // 检查是否包含 Go struct 的关键特征
    return (
        trimmed.includes('type') &&
        trimmed.includes('struct') &&
        (trimmed.includes('{') && trimmed.includes('}'))
    );
}

// 生成随机字符串
function randomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 生成随机中文
function randomChinese(length = 3) {
    const chars = '示例数据值内容信息名称描述标题类型状态结果';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 解析 Go struct 字段类型并生成示例值
function generateExampleValue(goType, fieldName, seed = 0) {
    const type = goType.trim();
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // 基本类型
    if (type === 'string' || type === 'String') {
        const options = [
            `${randomChinese()}${randomString(4)}`,
            randomString(10),
            `${fieldName ? fieldName.toLowerCase() : 'value'}_${random(1000, 9999)}`,
            `${randomChinese(2)}_${random(1, 100)}`
        ];
        return options[Math.floor(Math.random() * options.length)];
    }
    if (type === 'int' || type === 'int8' || type === 'int16' || type === 'int32' || type === 'int64') {
        return random(-10000, 10000);
    }
    if (type === 'uint' || type === 'uint8' || type === 'uint16' || type === 'uint32' || type === 'uint64') {
        return random(0, 10000);
    }
    if (type === 'float32' || type === 'float64') {
        return parseFloat((Math.random() * 2000 - 1000).toFixed(2));
    }
    if (type === 'bool' || type === 'Boolean') {
        return Math.random() > 0.5;
    }
    
    // 指针类型
    if (type.startsWith('*')) {
        const innerType = type.substring(1).trim();
        // 指针可能为 nil，随机决定
        if (Math.random() > 0.7) {
            return null;
        }
        return generateExampleValue(innerType, fieldName, seed);
    }
    
    // 数组/切片类型
    if (type.startsWith('[]')) {
        const innerType = type.substring(2).trim();
        const arrayLength = random(1, 3);
        const result = [];
        for (let i = 0; i < arrayLength; i++) {
            result.push(generateExampleValue(innerType, fieldName, seed + i));
        }
        return result;
    }
    
    // Map 类型
    if (type.startsWith('map[')) {
        const match = type.match(/map\[(\w+)\](.+)/);
        if (match) {
            const keyType = match[1];
            const valueType = match[2].trim();
            const mapSize = random(1, 2);
            const result = {};
            for (let i = 0; i < mapSize; i++) {
                const key = keyType === 'string' 
                    ? randomString(5) 
                    : String(random(1, 10));
                result[key] = generateExampleValue(valueType, fieldName, seed + i);
            }
            return result;
        }
    }
    
    // 时间类型
    if (type === 'time.Time' || type.includes('Time')) {
        const year = random(2020, 2025);
        const month = String(random(1, 12)).padStart(2, '0');
        const day = String(random(1, 28)).padStart(2, '0');
        const hour = String(random(0, 23)).padStart(2, '0');
        const minute = String(random(0, 59)).padStart(2, '0');
        const second = String(random(0, 59)).padStart(2, '0');
        return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    }
    
    // 接口类型
    if (type === 'interface{}' || type === 'any') {
        return null;
    }
    
    // 自定义类型（递归处理）
    if (type.match(/^[A-Z][a-zA-Z0-9]*$/)) {
        return {};
    }
    
    // 默认返回 null
    return null;
}

// 解析 Go struct 定义
function parseGoStruct(structStr) {
    const result = {};
    const lines = structStr.split('\n');
    
    // 提取 struct 内容（在 { } 之间）
    let inStruct = false;
    let structContent = [];
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // 找到 struct 开始
        if (trimmed.includes('struct') && trimmed.includes('{')) {
            inStruct = true;
            // 提取 { 之后的内容
            const afterBrace = trimmed.substring(trimmed.indexOf('{') + 1);
            if (afterBrace.trim()) {
                structContent.push(afterBrace);
            }
            continue;
        }
        
        // 在 struct 内部
        if (inStruct) {
            // 检查是否结束
            if (trimmed.includes('}')) {
                // 提取 } 之前的内容
                const beforeBrace = trimmed.substring(0, trimmed.indexOf('}'));
                if (beforeBrace.trim()) {
                    structContent.push(beforeBrace);
                }
                break;
            }
            structContent.push(trimmed);
        }
    }
    
    // 解析字段
    for (const line of structContent) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) {
            continue; // 跳过空行和注释
        }
        
        // 移除行尾注释
        const cleanLine = trimmed.split('//')[0].trim();
        if (!cleanLine) continue;
        
        // 解析字段：可能的格式：
        // FieldName Type `json:"field_name"`
        // FieldName Type
        // FieldName Type `json:"field_name,omitempty"`
        
        // 匹配字段名和类型
        const fieldMatch = cleanLine.match(/^([A-Z][a-zA-Z0-9_]*)\s+([^\s`]+)/);
        if (!fieldMatch) continue;
        
        const fieldName = fieldMatch[1];
        let goType = fieldMatch[2];
        
        // 提取 JSON tag（如果存在）
        // 支持多种格式：`json:"name"`, `json:"name,omitempty"`, `json:"-"`, `json:",omitempty"`
        const jsonTagMatch = cleanLine.match(/`json:"([^"]*)"`/);
        let jsonFieldName = fieldName;
        let shouldSkip = false;
        
        if (jsonTagMatch) {
            const jsonTag = jsonTagMatch[1];
            // 处理空 tag 或只有选项的情况：`json:",omitempty"`
            if (!jsonTag || jsonTag.trim() === '') {
                // 空 tag，使用默认命名
                jsonFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
            } else {
                // 提取 tag 中的字段名（可能包含 omitempty 等选项）
                const parts = jsonTag.split(',');
                const namePart = parts[0].trim();
                
                if (namePart === '-' || namePart === '') {
                    // `json:"-"` 表示忽略该字段
                    shouldSkip = true;
                } else if (namePart) {
                    jsonFieldName = namePart;
                } else {
                    // 只有选项，没有名称，使用默认命名
                    jsonFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                }
            }
        } else {
            // 如果没有 JSON tag，将首字母转为小写（Go 的默认行为）
            jsonFieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
        }
        
        if (shouldSkip) {
            continue; // 跳过被忽略的字段
        }
        
        // 生成示例值（使用字段索引作为随机种子）
        const fieldIndex = Object.keys(result).length;
        const exampleValue = generateExampleValue(goType, fieldName, fieldIndex);
        result[jsonFieldName] = exampleValue;
    }
    
    return result;
}

// 处理 Go struct 转换为 JSON
function processGoStructToJSON(input) {
    try {
        // 解析 struct
        const jsonObj = parseGoStruct(input);
        
        // 转换为格式化的 JSON
        const jsonStr = JSON.stringify(jsonObj, null, 2);
        
        // 生成多个随机示例数据
        const examples = [];
        const exampleCount = 3;
        
        for (let i = 0; i < exampleCount; i++) {
            const example = {};
            for (const key in jsonObj) {
                // 为每个示例重新生成随机值
                const originalValue = jsonObj[key];
                example[key] = generateRandomVariation(originalValue, i);
            }
            examples.push(example);
        }
        
        // 辅助函数：生成随机变化的值
        function generateRandomVariation(value, seed) {
            if (typeof value === 'string') {
                // 字符串值：生成新的随机字符串
                if (value.includes('T') && value.includes('Z') && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
                    // 时间格式
                    const year = Math.floor(Math.random() * 5) + 2020;
                    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
                    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
                    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
                    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                    const second = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
                }
                // 普通字符串：生成新的随机字符串
                const options = [
                    `${randomChinese()}${randomString(4)}`,
                    randomString(10),
                    `value_${Math.floor(Math.random() * 10000)}_${seed}`
                ];
                return options[Math.floor(Math.random() * options.length)];
            } else if (typeof value === 'number') {
                // 数字值：生成新的随机数字
                return Math.floor(Math.random() * 20000) - 10000;
            } else if (typeof value === 'boolean') {
                // 布尔值：随机切换
                return Math.random() > 0.5;
            } else if (Array.isArray(value)) {
                // 数组：为每个元素生成新值
                const newArray = [];
                const length = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < length; j++) {
                    if (value.length > 0) {
                        newArray.push(generateRandomVariation(value[0], seed + j));
                    }
                }
                return newArray;
            } else if (typeof value === 'object' && value !== null) {
                // 对象（Map）：生成新的键值对
                const newObj = {};
                const keys = Object.keys(value);
                if (keys.length > 0) {
                    const keyCount = Math.floor(Math.random() * 2) + 1;
                    for (let j = 0; j < keyCount; j++) {
                        const newKey = randomString(5);
                        newObj[newKey] = generateRandomVariation(value[keys[0]], seed + j);
                    }
                }
                return newObj;
            }
            return value;
        }
        
        const t = window.i18n ? window.i18n.t : (key) => key;
        
        let html = '<div class="space-y-4">';
        
        // JSON 结构
        html += '<div class="bg-emerald-500 bg-opacity-20 p-4 rounded-lg">';
        html += `<h3 class="text-lg font-semibold mb-2 text-emerald-300">${t('goStructJSON')}</h3>`;
        html += `<pre class="bg-black bg-opacity-40 p-4 rounded overflow-x-auto text-sm">${jsonStr}</pre>`;
        html += '</div>';
        
        // 示例数据
        html += '<div class="bg-teal-500 bg-opacity-20 p-4 rounded-lg">';
        html += `<h3 class="text-lg font-semibold mb-3 text-teal-300">${t('goStructExamples')}</h3>`;
        
        examples.forEach((example, index) => {
            html += `<div class="mb-3">`;
            html += `<p class="text-gray-400 text-sm mb-2">${t('goStructExample')} ${index + 1}:</p>`;
            html += `<pre class="bg-black bg-opacity-40 p-4 rounded overflow-x-auto text-sm">${JSON.stringify(example, null, 2)}</pre>`;
            html += `</div>`;
        });
        
        html += '</div>';
        html += '</div>';
        
        return html;
    } catch (error) {
        const t = window.i18n ? window.i18n.t : (key) => key;
        return `<div class="bg-red-500 bg-opacity-20 p-4 rounded-lg">
            <p class="text-red-300">${t('goStructParseError')}${error.message}</p>
        </div>`;
    }
}
