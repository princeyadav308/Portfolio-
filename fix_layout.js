const fs = require("fs");
const file = "index.html";
let content = fs.readFileSync(file, "utf8");

const startStr = "<!-- Pricing Section -->";
const endStr = "<!-- Stat Strip Section -->";

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = `<!-- Pricing Section -->
            <div class="container services-subsection">
                <div class="row">
                    <div class="services-subsection-title" style="margin-bottom: 40px; text-align: center; width: 100%;">
                        <h2 data-heading="Pricing">Web, MVP & Retainers</h2>
                    </div>
                </div>
                <div class="row" style="justify-content: center; gap: 30px; display: flex; flex-wrap: wrap;">
                    <!-- Card 1 -->
                    <div class="pricing-item" style="flex: 1; min-width: 300px; max-width: 380px;">
                        <div class="pricing-item-inner outer-shadow">
                            <div class="pricing-header">
                                <h3>Individual</h3>
                                <p>Freelancers, early startups needing online presence</p>
                            </div>
                            <div class="pricing-price">
                                <h4>₹25k – ₹50k</h4>
                                <span>$500 – $1k</span>
                                <span class="timeline">Timeline: 1–2 weeks</span>
                            </div>
                            <ul class="pricing-features">
                                <li>Up to 5 pages</li>
                                <li>Responsive design</li>
                                <li>Contact form</li>
                                <li>Basic SEO setup</li>
                                <li>1 revision round</li>
                                <li>Support: 15 days post-launch</li>
                                <li>Payment: 50% upfront, 50% delivery</li>
                            </ul>
                            <div class="pricing-cta">
                                <a href="#contact" class="btn-1 outer-shadow hover-in-shadow link-item">Get a Quote</a>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="pricing-item" style="flex: 1; min-width: 300px; max-width: 380px;">
                        <div class="pricing-item-inner outer-shadow popular">
                            <div class="pricing-badge">Popular</div>
                            <div class="pricing-header">
                                <h3>Startups</h3>
                                <p>SMBs, growing startups needing custom functionality</p>
                            </div>
                            <div class="pricing-price">
                                <h4>₹50k – ₹1.2L</h4>
                                <span>$1k – $2.5k</span>
                                <span class="timeline">Timeline: 2–4 weeks</span>
                            </div>
                            <ul class="pricing-features">
                                <li>Up to 10 pages</li>
                                <li>Custom UI/UX design</li>
                                <li>CMS integration</li>
                                <li>Animations & transitions</li>
                                <li>Performance optimization</li>
                                <li>2 revision rounds</li>
                                <li>Support: 30 days post-launch</li>
                                <li>Payment: 40/30/30 milestone</li>
                            </ul>
                            <div class="pricing-cta">
                                <a href="#contact" class="btn-1 outer-shadow hover-in-shadow link-item">Get a Quote</a>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="pricing-item" style="flex: 1; min-width: 300px; max-width: 380px;">
                        <div class="pricing-item-inner outer-shadow">
                            <div class="pricing-header">
                                <h3>Enterprise</h3>
                                <p>Funded startups, companies needing full web ecosystem</p>
                            </div>
                            <div class="pricing-price">
                                <h4>₹1.2L – ₹2.5L</h4>
                                <span>$2.5k – $5k</span>
                                <span class="timeline">Timeline: 4–8 weeks</span>
                            </div>
                            <ul class="pricing-features">
                                <li>Unlimited pages</li>
                                <li>Full custom design system</li>
                                <li>API integrations</li>
                                <li>Advanced animations</li>
                                <li>A/B testing setup</li>
                                <li>3 revision rounds</li>
                                <li>Support: 60 days post-launch</li>
                                <li>Payment: 40/30/30 milestone</li>
                            </ul>
                            <div class="pricing-cta">
                                <a href="#contact" class="btn-1 outer-shadow hover-in-shadow link-item">Get a Quote</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 40px; justify-content: center; width: 100%;">
                    <p class="pricing-note">All MVP projects start with a paid Discovery & Architecture session (₹8,000 / $150) which is deducted from the project total if you proceed.</p>
                </div>
            </div>

            `;
    const finalContent = content.substring(0, startIndex) + newContent + content.substring(endIndex);
    fs.writeFileSync(file, finalContent, "utf8");
    console.log("Success");
}

