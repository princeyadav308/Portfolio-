const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size').imageSize;

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Optimize CSS preloading
const oldCSS = `    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/font-awesome.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="css/color-1.min.css">
    <link rel="stylesheet" href="css/responsive.min.css">`;

const newCSS = `    <link rel="preload" href="css/style.css" as="style">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preload" href="css/font-awesome.css" as="style" media="print">
    <link rel="stylesheet" href="css/font-awesome.css" media="print" onload="this.media='all'">
    <link rel="preload" href="css/color-1.min.css" as="style">
    <link rel="stylesheet" href="css/color-1.min.css">
    <link rel="preload" href="css/responsive.min.css" as="style">
    <link rel="stylesheet" href="css/responsive.min.css">`;

html = html.replace(oldCSS, newCSS);

// 2. Fix 404 image
html = html.replace('src="img/portfolio-img/large/project-2/1.png "', 'src="img/portfolio-img/large/project-2/1.webp" ');

// 3. Conditional Shader loading
const oldShader = `<script defer src="js/axion-shader-bundle.iife.js"></script>`;
const newShader = `<script>
    if (window.innerWidth > 768) {
        const shaderScript = document.createElement('script');
        shaderScript.src = "js/axion-shader-bundle.iife.js";
        shaderScript.defer = true;
        document.body.appendChild(shaderScript);
    }
</script>`;

html = html.replace(oldShader, newShader);

// 4. Add width and height to images to fix CLS
let missingImgCount = 0;
html = html.replace(/<img([^>]+)>/g, (match, attrs) => {
    // If it already has width or height, skip
    if (attrs.includes('width=') || attrs.includes('height=')) {
        return match;
    }

    // Extract src
    const srcMatch = attrs.match(/src=["']([^"']+)["']/);
    if (!srcMatch) return match;

    let imgSrc = srcMatch[1].trim();

    // Remove any query params like ?v=2
    if (imgSrc.includes('?')) {
        imgSrc = imgSrc.split('?')[0];
    }
    
    // Ignore external images
    if (imgSrc.startsWith('http')) {
        return match;
    }

    // handle uri encoding like spaces
    imgSrc = decodeURIComponent(imgSrc);

    try {
        const imgPath = path.join(__dirname, imgSrc);
        const dimensions = sizeOf(imgPath);
        // add width and height at the end of attrs
        return `<img${attrs} width="${dimensions.width}" height="${dimensions.height}">`;
    } catch (e) {
        missingImgCount++;
        console.warn('Could not read image:', imgSrc, e.message);
        return match;
    }
});

// Remove lazy loading from hero image (if any) to improve LCP
html = html.replace(/<img src="img\/prince\.webp" class="outer-shadow" alt="profile-pic"([^>]+)>/g, (m, g1) => {
   if (!g1.includes('fetchpriority')) {
       return `<img src="img/prince.webp" class="outer-shadow" alt="profile-pic"${g1} fetchpriority="high">`;
   }
   return m;
});

fs.writeFileSync(htmlPath, html, 'utf8');

console.log('Optimizations applied successfully!');
console.log('Images that could not be processed:', missingImgCount);
