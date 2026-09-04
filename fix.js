const fs = require("fs");
const file = "index.html";
let content = fs.readFileSync(file, "utf8");

if (!content.includes("<filter id=\"lg\">")) {
    content = content.replace("</body>", `    <!-- Frosted Glass Filter -->
    <svg width="0" height="0" style="display: none;">
        <filter id="lg">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
</body>`);
}

content = content.replace("<h3>Starter</h3>", "<h3>Individual</h3>");
content = content.replace("<h3>Professional</h3>", "<h3>Startups</h3>");
content = content.replace("<h3>Premium</h3>", "<h3>Enterprise</h3>");

content = content.replace(/&times;/g, "<i class=\"fas fa-times\"></i>");
content = content.replace(/&times(?!;)/g, "<i class=\"fas fa-times\"></i>");
content = content.replace(/&copy;/g, "<i class=\"far fa-copyright\"></i>");
content = content.replace(/&rarr;/g, "<i class=\"fas fa-arrow-right\"></i>");
content = content.replace(/&bull;/g, "<i class=\"fas fa-circle\" style=\"font-size: 8px; vertical-align: middle; margin: 0 4px;\"></i>");

fs.writeFileSync(file, content, "utf8");
console.log("Done");
