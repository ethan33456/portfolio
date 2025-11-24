const portfolio = [
    {
        id: 0,
        projectName: "Chuck's Boots",
        url: "https://chucksboots.com/",
        image: "images/card-bg.jpg",
        projectDetail: "An ecommerce platform offering a wide selection of boots, workwear, and western apparel for men, women, and kids. Features include a diverse catalog of brands like Thorogood and Carolina, 'Made in the USA' collections, and a user-friendly shopping experience.",
        technologiesUsed: [
            {
                tech: "Ecommerce"
            },
            {
                tech: "Web Development"
            },
            {
                tech: "UX/UI Design"
            }
        ]
    },
    {
        id: 1,
        projectName: "Stratus",
        url: "https://stratus-production.up.railway.app/",
        image: "images/card-bg.jpg",
        projectDetail: "An intelligent weather dashboard featuring AI-powered insights and a conversational weather assistant. Provides real-time current weather, 12-hour and 8-day forecasts, and personalized location saving capabilities.",
        technologiesUsed: [
            {
                tech: "ReactJS"
            },
            {
                tech: "Artificial Intelligence"
            },
            {
                tech: "Weather API"
            },
            {
                tech: "Railway"
            }
        ]
    },
    {
        id: 2,
        projectName: "Price Bot",
        url: "https://github.com/ethan33456/price-bot.git",
        image: "images/card-bg.jpg",
        projectDetail: "A Python-based automated deal hunter that scrapes the Best Buy API to find significant discounts on laptops and computers. Features configurable discount thresholds, automated email notifications, and detailed deal logging.",
        technologiesUsed: [
            {
                tech: "Python"
            },
            {
                tech: "Best Buy API"
            },
            {
                tech: "Automation"
            },
            {
                tech: "Web Scraping"
            }
        ]
    }
]
export default function handler(req, res) {
    res.status(200).json(portfolio)
}
