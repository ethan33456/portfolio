const background = [
    {
        eduCards: [
            {
                id: 0,
                title: 'Maryville University of Saint Louis',
                degree: 'BS, Computer Science',
                detail: "Bachelor of Science in Computer Science.",
                year: 'May 2024 - Dec 2027'
            },
            {
                id: 1,
                title: 'LaunchCode',
                degree: 'Computer Science',
                detail: "Completed Computer Science program.",
                year: '2019 - 2020'
            },
        ],
        expCards: [
            {
                id: 1,
                title: 'Beanstalk Web Solutions',
                role: 'Web Developer',
                url: 'https://beanstalkwebsolutions.com',
                desc: 'Developed custom WordPress themes and plugins tailored to client specifications. Managed and optimized AWS servers for high availability and security. Collaborated with design teams and integrated multiple external APIs to extend website functionality. Applied SEO best practices and ADA compliance guidelines while continuously refining development workflows.',
                year: '07/2021 - Present',
                location: 'St. Louis, Missouri'
            },
            {
                id: 2,
                title: 'Self Employed',
                role: 'Freelance Web Developer',
                url: 'no website',
                desc: 'Designed and developed WordPress websites, aligning closely with client visions. Handled all client communications and managed project expectations as the sole point of contact. Notable work includes fitzsrootbeer.com, afdentalstl.com, and ztsmusic.com.',
                year: '09/2018 - 07/2021',
                location: 'St. Louis, Missouri'
            },
        ]
    }
];

export default function handler(req, res) {
    res.status(200).json(background)
}
