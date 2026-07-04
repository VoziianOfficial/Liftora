"use strict";

window.LIFTORA_CONFIG = {
    brand: {
        name: "Liftora",
        tagline: "Independent Garage Door Matching Platform",
        shortTagline: "Independent garage door matching platform",
        logo: "assets/images/logo.svg",
        logoLight: "assets/images/logo-light.svg",
        favicon: "assets/images/favicon.svg"
    },

    contact: {
        phone: "+1 (786) 543-1234",
        phoneText: "Call Platform",
        email: "support@liftora.com",
        address: "Platform Address Here",
        companyId: "Company ID Here"
    },

    form: {
        recipient: "support@liftora.com",
        endpoint: "contact.php",
        successMessage: "Thank you. Your garage door request has been received.",
        errorMessage: "Something went wrong. Please check your details and try again.",
        legalNote:
            "By submitting, you request to be contacted about your garage door project. Provider availability, pricing, credentials, timelines, and terms may vary."
    },

    legal: {
        privacyUpdated: "2026",
        termsUpdated: "2026",
        disclaimer:
            "Liftora is an independent garage door matching platform. Liftora does not perform garage door repair, installation, replacement, inspection, manufacturing, or contracting services. Provider availability, pricing, credentials, licensing, insurance, warranties, timelines, and service terms are supplied by participating providers and should be reviewed directly with them.",
        shortDisclaimer:
            "Liftora does not perform garage door services directly. Provider availability, pricing, credentials, licensing, insurance, warranties, timelines, and service terms are supplied by participating providers and should be reviewed directly with them.",
        cookieText:
            "Liftora uses essential local storage to remember basic site preferences, including cookie notice acceptance. By continuing, you agree to our Privacy Policy and Terms."
    },

    footer: {
        description:
            "Liftora helps homeowners start clearer garage door requests and compare provider-supplied options from independent local providers.",
        copyright: "© 2026 Liftora. All rights reserved.",
        ctaTitle: "Ready to start a clearer garage door request?",
        ctaText:
            "Use Liftora to organize your request before comparing provider-supplied details."
    },

    social: {
        facebook: "",
        instagram: "",
        linkedin: "",
        x: ""
    },

    nav: [
        {
            label: "Home",
            url: "index.html"
        },
        {
            label: "About",
            url: "about.html"
        },
        {
            label: "Services",
            url: "services.html"
        },
        {
            label: "Contact",
            url: "contact.html"
        }
    ],

    serviceNeedOptions: [
        "Garage Door Repair",
        "Garage Door Installation",
        "Garage Door Replacement",
        "Garage Door Opener Services",
        "Spring & Cable Repair",
        "Track, Roller & Panel Repair",
        "Not Sure Yet"
    ],

    services: [
        {
            id: "garage-door-repair",
            title: "Garage Door Repair",
            shortTitle: "Repair",
            url: "garage-door-repair.html",
            icon: "wrench",
            image: "assets/images/card-5.jpg",
            cardImage: "assets/images/service-repair-card.jpg",
            description:
                "Start a request for a stuck, noisy, uneven, or malfunctioning garage door and compare provider-supplied repair options.",
            metaTitle: "Garage Door Repair Requests | Liftora",
            metaDescription:
                "Start a garage door repair request through Liftora and compare provider-supplied options from independent local providers.",
            heroTitle: "Garage Door Repair Requests Start Here",
            heroText:
                "Liftora helps homeowners organize repair-related garage door requests before comparing provider-supplied options from independent local providers.",
            overviewTitle: "A Clearer Way to Start a Garage Door Repair Request",
            overviewText:
                "When a garage door is stuck, noisy, uneven, or not moving correctly, a clear request can help providers understand the situation before the next conversation begins.",
            focusPoints: [
                "Stuck or uneven garage door movement",
                "Noisy, shaky, or inconsistent operation",
                "Visible wear, damage, or general malfunction"
            ],
            commonSituations: [
                "Door will not open or close",
                "Door stops halfway",
                "Loud grinding or scraping",
                "Door feels uneven",
                "Remote works but door does not move",
                "Visible wear or damage"
            ],
            providerMayEvaluate: [
                "Door movement and balance concerns",
                "Track, roller, panel, spring, or opener-related symptoms",
                "Repair scope and parts that may be involved",
                "Timing, access, and provider-supplied service terms"
            ],
            requestPreparation: [
                "Describe when the issue started",
                "Note whether the door opens, closes, or stops halfway",
                "Mention visible damage, unusual sounds, or uneven movement",
                "Prepare your ZIP or city and timing preferences"
            ],
            related: [
                "spring-cable-repair",
                "track-roller-panel-repair",
                "garage-door-opener-services"
            ]
        },

        {
            id: "garage-door-installation",
            title: "Garage Door Installation",
            shortTitle: "Installation",
            url: "garage-door-installation.html",
            icon: "door-open",
            image: "assets/images/card-6.jpg",
            cardImage: "assets/images/service-installation-card.jpg",
            description:
                "Start a new garage door installation request and compare provider-supplied details for door style, fit, insulation, and opener compatibility.",
            metaTitle: "Garage Door Installation Requests | Liftora",
            metaDescription:
                "Use Liftora to start a garage door installation request and compare provider-supplied options from independent local providers.",
            heroTitle: "Start a New Garage Door Installation Request",
            heroText:
                "Liftora helps organize new garage door installation requests so homeowners can compare provider-supplied product, fit, timing, and service details.",
            overviewTitle: "Plan a New Garage Door Request With Better Structure",
            overviewText:
                "A new garage door request may involve style, material, insulation, opener compatibility, and fit. Liftora helps organize those details before provider comparison.",
            focusPoints: [
                "New garage build or exterior update",
                "Style, material, insulation, and door fit discussion",
                "Opener compatibility and provider-supplied product options"
            ],
            commonSituations: [
                "New garage build",
                "Replacing manual door with automated setup",
                "Choosing insulated door",
                "Exterior style upgrade",
                "Measuring and fit discussion",
                "Provider-supplied product options"
            ],
            providerMayEvaluate: [
                "Opening size and installation conditions",
                "Door material, style, and insulation options",
                "Opener compatibility and setup requirements",
                "Product, warranty, timing, and service terms"
            ],
            requestPreparation: [
                "Share whether this is a new build or a door upgrade",
                "Prepare style, material, or insulation preferences",
                "Mention opener needs or automation goals",
                "Prepare ZIP or city and general timing expectations"
            ],
            related: [
                "garage-door-replacement",
                "garage-door-opener-services",
                "track-roller-panel-repair"
            ]
        },

        {
            id: "garage-door-replacement",
            title: "Garage Door Replacement",
            shortTitle: "Replacement",
            url: "garage-door-replacement.html",
            icon: "replace",
            image: "assets/images/card-7.jpg",
            cardImage: "assets/images/service-replacement-card.jpg",
            description:
                "Compare garage door replacement options when an older, damaged, inefficient, or outdated door may need a new direction.",
            metaTitle: "Garage Door Replacement Options | Liftora",
            metaDescription:
                "Start a garage door replacement request through Liftora and compare provider-supplied replacement options.",
            heroTitle: "Compare Garage Door Replacement Options",
            heroText:
                "Liftora helps homeowners start replacement-focused garage door requests and compare provider-supplied options for products, timing, and scope.",
            overviewTitle: "Replacement Requests Need the Right Details Up Front",
            overviewText:
                "When a garage door has repeated issues, visible damage, or no longer fits the home’s needs, a structured request can make provider conversations more practical.",
            focusPoints: [
                "Older or repeatedly problematic garage doors",
                "Damaged panels or inefficient door performance",
                "Repair vs replacement conversations with providers"
            ],
            commonSituations: [
                "Door has repeated issues",
                "Panels are badly damaged",
                "Door is outdated",
                "Insulation improvement",
                "Heavy or noisy movement",
                "Upgrade appearance"
            ],
            providerMayEvaluate: [
                "Existing door condition and replacement scope",
                "Door style, material, and insulation options",
                "Opener compatibility and track considerations",
                "Provider-supplied pricing, warranty, and timing terms"
            ],
            requestPreparation: [
                "Describe current door condition and age if known",
                "Mention panel damage, repeated issues, or insulation concerns",
                "Prepare style or material preferences",
                "Share location and timing expectations"
            ],
            related: [
                "garage-door-installation",
                "garage-door-repair",
                "garage-door-opener-services"
            ]
        },

        {
            id: "garage-door-opener-services",
            title: "Garage Door Opener Services",
            shortTitle: "Openers",
            url: "garage-door-opener-services.html",
            icon: "radio-tower",
            image: "assets/images/card-4.jpg",
            cardImage: "assets/images/service-opener-card.jpg",
            description:
                "Start an opener-related request for remote, keypad, motor, sensor, smart opener, chain, or belt-drive concerns.",
            metaTitle: "Garage Door Opener Service Requests | Liftora",
            metaDescription:
                "Use Liftora to start a garage door opener service request and compare provider-supplied options.",
            heroTitle: "Start a Garage Door Opener Service Request",
            heroText:
                "Liftora helps organize opener-related garage door requests before homeowners compare provider-supplied options for motor, remote, keypad, sensor, or smart opener concerns.",
            overviewTitle: "Opener Requests Can Involve Several Moving Details",
            overviewText:
                "Garage door opener concerns may involve remotes, keypads, motors, sensors, smart controls, or drive systems. Liftora helps structure the request before provider comparison.",
            focusPoints: [
                "Remote, keypad, or smart opener concerns",
                "Motor running without expected door movement",
                "Chain, belt, sensor, and compatibility discussions"
            ],
            commonSituations: [
                "Remote not responding",
                "Keypad issue",
                "Motor runs but door does not move",
                "Smart opener setup discussion",
                "Chain or belt noise",
                "Safety sensor concern"
            ],
            providerMayEvaluate: [
                "Opener model and visible symptoms",
                "Remote, keypad, sensor, or smart-control behavior",
                "Drive system noise or compatibility concerns",
                "Provider-supplied repair, replacement, and product terms"
            ],
            requestPreparation: [
                "Note opener brand or model if visible",
                "Describe remote, keypad, sensor, or motor behavior",
                "Mention whether the door moves manually or stops",
                "Prepare location and preferred timing"
            ],
            related: [
                "garage-door-repair",
                "garage-door-installation",
                "garage-door-replacement"
            ]
        },

        {
            id: "spring-cable-repair",
            title: "Spring & Cable Repair",
            shortTitle: "Springs/Cables",
            url: "spring-cable-repair.html",
            icon: "rotate-cw",
            image: "assets/images/card-3.jpg",
            description:
                "Start a spring or cable-related request for heavy doors, loose cables, broken springs, uneven movement, or tension-system concerns.",
            metaTitle: "Spring & Cable Garage Door Requests | Liftora",
            metaDescription:
                "Start a spring and cable garage door request through Liftora. Compare provider-supplied options for safety-sensitive garage door concerns.",
            heroTitle: "Spring & Cable Garage Door Requests",
            heroText:
                "Liftora helps homeowners organize spring and cable-related garage door requests for provider evaluation. Spring and cable systems can involve tension and should be handled by qualified providers.",
            overviewTitle: "Spring and Cable Requests Should Stay Safety-Focused",
            overviewText:
                "Garage door springs and cables can involve heavy moving parts and tension systems. Liftora helps organize the request without giving DIY repair instructions.",
            focusPoints: [
                "Broken spring or loose cable concerns",
                "Heavy, uneven, or partially opening doors",
                "Safety-sensitive provider evaluation"
            ],
            commonSituations: [
                "Spring appears broken",
                "Cable loose or off track",
                "Door feels extremely heavy",
                "Door opens only a few inches",
                "Loud snap was heard",
                "Uneven movement"
            ],
            providerMayEvaluate: [
                "Visible spring or cable concerns",
                "Door weight, balance, and movement symptoms",
                "Whether other door components may be involved",
                "Provider-supplied timing, safety, and service terms"
            ],
            requestPreparation: [
                "Do not attempt to loosen, tighten, or replace tension parts yourself",
                "Describe what you noticed without touching the system",
                "Mention whether a loud snap was heard or the door became heavy",
                "Prepare location, access notes, and timing preferences"
            ],
            related: [
                "garage-door-repair",
                "track-roller-panel-repair",
                "garage-door-opener-services"
            ]
        },

        {
            id: "track-roller-panel-repair",
            title: "Track, Roller & Panel Repair",
            shortTitle: "Tracks/Panels",
            url: "track-roller-panel-repair.html",
            icon: "panel-top",
            image: "assets/images/service-track-panel.jpg",
            description:
                "Start a request for bent tracks, worn rollers, dented panels, scraping, shaking, alignment, or visible door damage.",
            metaTitle: "Track, Roller & Panel Garage Door Requests | Liftora",
            metaDescription:
                "Use Liftora to start a track, roller, or panel garage door request and compare provider-supplied options.",
            heroTitle: "Track, Roller & Panel Garage Door Requests",
            heroText:
                "Liftora helps homeowners organize requests involving tracks, rollers, panels, alignment, scraping, or visible garage door damage.",
            overviewTitle: "Track, Roller, and Panel Details Can Shape the Request",
            overviewText:
                "Visible damage, scraping, shaking, bent tracks, worn rollers, or panel concerns can all affect the provider conversation. Liftora helps organize those details clearly.",
            focusPoints: [
                "Bent track or worn roller concerns",
                "Dented or damaged garage door panels",
                "Scraping, shaking, or uneven alignment"
            ],
            commonSituations: [
                "Door rubs or scrapes",
                "Track looks bent",
                "Roller appears worn",
                "Panel dented",
                "Door shakes while moving",
                "Gaps or uneven alignment"
            ],
            providerMayEvaluate: [
                "Track alignment and roller condition",
                "Panel damage and replacement discussion",
                "Movement, scraping, and balance symptoms",
                "Provider-supplied repair scope and timing terms"
            ],
            requestPreparation: [
                "Describe where scraping, shaking, or rubbing happens",
                "Mention visible dents, gaps, or bent areas",
                "Do not force a stuck or misaligned door",
                "Prepare photos, location, and timing preferences"
            ],
            related: [
                "garage-door-repair",
                "garage-door-replacement",
                "spring-cable-repair"
            ]
        }
    ],

    quickNeeds: [
        {
            title: "Door will not open",
            icon: "door-open",
            text:
                "Start with the movement issue, when it began, and whether the opener responds. Liftora helps organize the request before provider comparison.",
            supportText:
                "Include whether the door is fully stuck, opens only partway, reverses unexpectedly, or makes noise when the opener is activated. Clear symptom detail helps providers understand the starting point faster.",
            detailPoints: [
                "Note whether wall control, remote, or keypad responds",
                "Mention unusual sounds, resistance, or one-sided movement",
                "Share timing preferences and whether access is urgent"
            ],
            cta: "Start Repair Request",
            url: "garage-door-repair.html"
        },
        {
            title: "Broken spring or cable",
            icon: "rotate-cw",
            text:
                "Spring and cable concerns can involve tension systems. Describe visible symptoms and continue through qualified provider evaluation.",
            supportText:
                "If a spring looks separated, a cable appears loose, or the door suddenly feels very heavy, describe only what you can safely observe. Liftora keeps the request structured without suggesting DIY tension-part handling.",
            detailPoints: [
                "Mention if you heard a loud snap before the issue started",
                "Describe whether the door opens a few inches and stops",
                "Add visible cable, spring, or balance symptoms if present"
            ],
            cta: "View Spring & Cable Requests",
            url: "spring-cable-repair.html"
        },
        {
            title: "Noisy or shaky movement",
            icon: "activity",
            text:
                "Noises, shaking, scraping, or uneven movement can help providers understand what may need evaluation.",
            supportText:
                "This type of request is most useful when you describe where the sound happens, whether the motion feels rough or unstable, and if the issue changes while opening versus closing.",
            detailPoints: [
                "Describe grinding, scraping, rattling, or vibration",
                "Mention if shaking happens near the floor, midway, or near the top",
                "Include whether the issue is occasional or every cycle"
            ],
            cta: "Compare Repair Options",
            url: "garage-door-repair.html"
        },
        {
            title: "Damaged panels",
            icon: "panel-top",
            text:
                "Dents, gaps, bent areas, and visible panel damage can be included in your request details.",
            supportText:
                "Panel and track-related requests are easier to compare when they include visible damage notes, alignment changes, and whether the door still moves normally or rubs while traveling.",
            detailPoints: [
                "Mention dents, cracks, gaps, bent areas, or loose sections",
                "Describe scraping, rubbing, or visible misalignment",
                "Add whether you are comparing repair and replacement possibilities"
            ],
            cta: "View Track & Panel Requests",
            url: "track-roller-panel-repair.html"
        },
        {
            title: "Opener not responding",
            icon: "radio-tower",
            text:
                "Remote, keypad, motor, sensor, or smart opener behavior can be described before comparing provider-supplied options.",
            supportText:
                "Opener-related requests often involve one of several separate issues, so it helps to say whether the problem is with controls, motor response, sensors, or smart features rather than only saying the opener is not working.",
            detailPoints: [
                "Note if lights blink, motor hums, or sensors appear blocked",
                "Mention remote, keypad, wall switch, or app behavior",
                "Include opener brand or model if it is visible"
            ],
            cta: "View Opener Services",
            url: "garage-door-opener-services.html"
        },
        {
            title: "New door planning",
            icon: "badge-plus",
            text:
                "For a new door or replacement, include style, insulation, material, and opener compatibility preferences.",
            supportText:
                "Planning requests are stronger when they describe the result you want, such as improved insulation, cleaner curb appeal, quieter operation, or compatibility with a new opener setup.",
            detailPoints: [
                "Share style, color, window, or material preferences",
                "Mention insulation goals or climate-related needs",
                "Add whether this is a fresh installation or a replacement decision"
            ],
            cta: "Start Installation Request",
            url: "garage-door-installation.html"
        }
    ],

    garageDoorTypes: [
        {
            title: "Sectional doors",
            icon: "panels-top-left"
        },
        {
            title: "Insulated doors",
            icon: "shield-check"
        },
        {
            title: "Carriage-style doors",
            icon: "warehouse"
        },
        {
            title: "Aluminum/glass doors",
            icon: "layout-grid"
        },
        {
            title: "Roll-up doors",
            icon: "rows-3"
        },
        {
            title: "Custom panel doors",
            icon: "panel-top"
        }
    ],

    doorTypesShowcase: {
        items: [
            {
                number: "01",
                title: "Sectional",
                icon: "panel-top",
                variant: "black",
                image: "assets/images/service-repair.jpg",
                alt: "Sectional garage door exterior",
                imageLabel: "Sectional doors are common and can shape opener, track, roller, panel, and repair conversations.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Sectional door requests may involve rollers, tracks, springs, opener behavior, or panel movement details.",
                        icon: "arrow-up-right",
                        url: "services.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For replacement requests",
                        title: "Panel layout, insulation, size, windows, and hardware preferences can shape provider-supplied options.",
                        icon: "arrow-up-right",
                        url: "garage-door-replacement.html",
                        accent: "sky"
                    }
                ]
            },
            {
                number: "02",
                title: "Insulated",
                icon: "shield-check",
                variant: "eggplant",
                image: "assets/images/service-replacement.jpg",
                alt: "Insulated garage door replacement example",
                imageLabel: "Insulated doors can affect comfort, noise, energy goals, product selection, and replacement conversations.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Insulated door concerns may involve panel condition, weight, movement, seals, or opener strain.",
                        icon: "arrow-up-right",
                        url: "garage-door-repair.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For replacement requests",
                        title: "Insulation level, material, thickness, color, windows, and warranty terms can shape provider options.",
                        icon: "arrow-up-right",
                        url: "garage-door-replacement.html",
                        accent: "sky"
                    }
                ]
            },
            {
                number: "03",
                title: "Glass doors",
                icon: "square-stack",
                variant: "sky",
                image: "assets/images/service-installation.jpg",
                alt: "Modern glass garage door style example",
                imageLabel: "Glass and aluminum-style doors can shift the conversation toward modern design, panel layout, hardware, and product options.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Glass-style door requests may include panel, frame, roller, track, seal, or opener compatibility details.",
                        icon: "arrow-up-right",
                        url: "track-roller-panel-repair.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For installation requests",
                        title: "Frame finish, glass opacity, insulation, panel layout, and opener setup can affect provider-supplied options.",
                        icon: "arrow-up-right",
                        url: "garage-door-installation.html",
                        accent: "sky"
                    }
                ]
            },
            {
                number: "04",
                title: "Carriage style",
                icon: "warehouse",
                variant: "gray",
                image: "assets/images/about-garage-door.jpg",
                alt: "Carriage style garage door exterior",
                imageLabel: "Carriage-style doors can influence design, hardware, windows, panel pattern, and curb-appeal conversations.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Carriage-style requests may involve decorative hardware, panel alignment, opener behavior, or visible wear.",
                        icon: "arrow-up-right",
                        url: "garage-door-repair.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For replacement requests",
                        title: "Window placement, decorative hardware, color, material, and insulation choices can shape provider options.",
                        icon: "arrow-up-right",
                        url: "garage-door-replacement.html",
                        accent: "sky"
                    }
                ]
            },
            {
                number: "05",
                title: "Roll-up doors",
                icon: "rotate-cw",
                variant: "soft",
                image: "assets/images/service-track-panel.jpg",
                alt: "Roll-up garage door request context",
                imageLabel: "Roll-up door requests can involve access, movement, track condition, slats, hardware, and provider evaluation details.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Roll-up door issues may involve movement, tracks, slats, rollers, noise, access, or opening limitations.",
                        icon: "arrow-up-right",
                        url: "garage-door-repair.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For provider comparison",
                        title: "Door size, usage, access conditions, product type, timing, and service scope should be reviewed directly.",
                        icon: "arrow-up-right",
                        url: "services.html",
                        accent: "sky"
                    }
                ]
            },
            {
                number: "06",
                title: "Custom panels",
                icon: "layout-panel-top",
                variant: "outline",
                image: "assets/images/hero-garage-door.jpg",
                alt: "Custom garage door panel design",
                imageLabel: "Custom panel requests can depend on size, material, pattern, windows, color, hardware, and provider-supplied product details.",
                notes: [
                    {
                        label: "For repair requests",
                        title: "Custom panel concerns may involve matching existing panels, visible damage, hardware, or movement issues.",
                        icon: "arrow-up-right",
                        url: "track-roller-panel-repair.html",
                        accent: "eggplant"
                    },
                    {
                        label: "For replacement requests",
                        title: "Custom panel layout, color, finish, windows, and hardware preferences can shape replacement discussions.",
                        icon: "arrow-up-right",
                        url: "garage-door-replacement.html",
                        accent: "sky"
                    }
                ]
            }
        ]
    },

    comparisonItems: [
        "Door type and size",
        "Repair vs replacement scope",
        "Spring, cable, opener, track, roller, or panel details",
        "Quote inclusions",
        "Timing and scheduling terms",
        "Warranty and product details",
        "Licensing, insurance, and permits where relevant"
    ],

    providerChecklist: [
        "Quote scope",
        "Parts or products involved",
        "Labor and service terms",
        "Timing and scheduling availability",
        "Warranty terms",
        "Licensing and insurance where relevant",
        "Permits, HOA, or local requirements where relevant"
    ],

    ctaMarquee: [
        "Repair",
        "Installation",
        "Replacement",
        "Openers",
        "Springs",
        "Tracks",
        "Panels"
    ],

    faq: {
        home: [
            {
                question: "Does Liftora repair garage doors directly?",
                answer:
                    "No. Liftora is an independent matching platform. It helps homeowners organize garage door requests and compare provider-supplied options, but it does not perform repair, installation, replacement, inspection, manufacturing, or contracting services."
            },
            {
                question: "Can I start a request for a broken spring?",
                answer:
                    "Yes. You can start a spring or cable-related request through Liftora. Spring and cable systems can involve tension and should be evaluated by qualified providers rather than handled through DIY steps."
            },
            {
                question: "Can I compare repair and replacement options?",
                answer:
                    "Yes. Liftora helps structure the request so homeowners can compare provider-supplied repair and replacement options where applicable."
            },
            {
                question: "Are provider prices guaranteed?",
                answer:
                    "No. Pricing, availability, credentials, warranties, timelines, and service terms are supplied by providers and should be reviewed directly with them."
            },
            {
                question: "Can I request opener-related help?",
                answer:
                    "Yes. You can start a request for garage door opener concerns, including remote, keypad, motor, sensor, smart opener, chain, or belt-drive issues."
            },
            {
                question: "What should I review before choosing a provider?",
                answer:
                    "Review quote scope, timing, parts or product details, warranty terms, credentials, licensing, insurance, and any terms supplied directly by the provider."
            }
        ],

        about: [
            {
                question: "Is Liftora a garage door company?",
                answer:
                    "No. Liftora is an independent garage door matching platform. It does not repair, install, replace, manufacture, or inspect garage doors directly."
            },
            {
                question: "Why use a matching platform?",
                answer:
                    "A matching platform can help homeowners start with clearer request details and compare provider-supplied options before continuing directly with a provider."
            },
            {
                question: "Can I choose the provider myself?",
                answer:
                    "Yes. Homeowners should review provider-supplied details directly and decide how they want to continue."
            },
            {
                question: "Does Liftora set prices?",
                answer:
                    "No. Pricing and service terms are supplied by participating providers and may vary."
            },
            {
                question: "Are service details guaranteed?",
                answer:
                    "No. Availability, pricing, credentials, licensing, insurance, warranties, timelines, and service terms should be reviewed directly with providers."
            },
            {
                question: "Can I submit more than one garage door issue?",
                answer:
                    "Yes. You can describe multiple symptoms or goals in the request details so providers can better understand the situation."
            }
        ],

        services: [
            {
                question: "Which service category should I choose?",
                answer:
                    "Choose the category closest to your current need. If you are unsure, select Not Sure Yet in the form and describe the issue in your own words."
            },
            {
                question: "Can I submit an opener and door issue together?",
                answer:
                    "Yes. You can include multiple symptoms, such as opener behavior and door movement, in the same request."
            },
            {
                question: "Does Liftora decide repair vs replacement?",
                answer:
                    "No. Liftora helps organize the request. Providers supply evaluation details, options, pricing, timing, and terms."
            },
            {
                question: "Are quotes final?",
                answer:
                    "Quotes and estimate details are provider-supplied and may depend on the provider’s evaluation, scope, parts, products, location, and timing."
            },
            {
                question: "Can I compare more than one provider?",
                answer:
                    "Liftora is designed to support provider comparison so homeowners can review provider-supplied options before continuing."
            },
            {
                question: "Are spring repairs safe to do myself?",
                answer:
                    "Garage door springs and cable systems can involve tension and heavy moving parts. Liftora does not provide DIY repair instructions. Discuss these concerns with qualified providers."
            }
        ],

        contact: [
            {
                question: "Is this a garage door repair company?",
                answer:
                    "No. Liftora is an independent matching platform and does not perform garage door services directly."
            },
            {
                question: "What details should I submit?",
                answer:
                    "Include the service category, door symptoms, visible damage, opener behavior, location, timing preferences, and any photos or notes you can describe."
            },
            {
                question: "Can I ask about multiple services?",
                answer:
                    "Yes. You can describe multiple garage door issues or goals in one request."
            },
            {
                question: "Will I receive guaranteed pricing?",
                answer:
                    "No. Pricing is supplied by participating providers and should be reviewed directly with them."
            },
            {
                question: "Can I update my request?",
                answer:
                    "You can contact the platform email listed on the site if you need to clarify or update request details."
            }
        ]
    }
};
