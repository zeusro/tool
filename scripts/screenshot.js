const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const filePath = path.join(projectRoot, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error('index.html 不存在，无法截图');
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const docsDir = path.join(projectRoot, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const outputPath = path.join(docsDir, 'screenshot.png');
  await page.setViewport({ width: 1280, height: 720 });
  await page.screenshot({ path: outputPath, fullPage: true });

  await browser.close();
  console.log('页面截图已保存到:', outputPath);
}

main().catch(err => {
  console.error('截图失败:', err);
  process.exit(1);
});
