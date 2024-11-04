
const newsletters = [
    {
        id: 1,
        date: 'September 15, 2024',
        title: 'Exploring Alpine Cheeses',
        excerpt: 'Discover the rich traditions of Alpine cheesemaking, from Swiss Gruyère to French Beaufort. Learn how altitude and seasonal grazing practices influence the unique flavors of these mountain cheeses...',
        readTime: '5 min read',
        category: 'Traditional Cheese',
        image: '/assets/alpine-cheese.jpg'
    },
    {
        id: 2,
        date: 'September 8, 2024',
        title: 'The Art of Blue Cheese',
        excerpt: 'Dive into the fascinating world of blue cheeses, from Italian Gorgonzola to French Roquefort. Understand the role of Penicillium roqueforti and how it creates those distinctive blue-green veins...',
        readTime: '4 min read',
        category: 'Cheese Science',
        image: '/assets/blue-cheese.jpg'
    },
    {
        id: 3,
        date: 'September 1, 2024',
        title: 'Spanish Cheese Journey',
        excerpt: 'Take a virtual tour through Spains diverse cheese landscape, from the sharp Manchego of La Mancha to the smoky Idiazábal of the Basque Country...',
        readTime: '6 min read',
        category: 'Regional Spotlight',
        image: '/assets/spanish-cheese.jpg'
    }
];

const episodes = [
    {
        id: 1,
        title: 'Episode 1 (Halloumi) [FR]',
        date: 'Posted 12 September 2024',
        duration: '00:05:36',
        language: 'FR',
    },
    {
        id: 2,
        title: 'Episode 1 (Halloumi) [ES]',
        date: 'Posted 12 September 2024',
        duration: '00:05:59',
        language: 'ES',
    },
    {
        id: 3,
        title: 'Episode 1 (Halloumi) [IT]',
        date: 'Posted 12 September 2024',
        duration: '00:05:57',
        language: 'IT',
    },
    {
        id: 4,
        title: 'Episode 1 (Halloumi) [EN]',
        date: 'Posted 12 September 2024',
        duration: '00:04:53',
        language: 'EN',
    }
];

const recentChats = [
    {
        id: 1,
        title: 'Exploring the World of Cheese Through AI',
        time: '29 minutes ago'
    },
    {
        id: 2,
        title: 'Next.js SSR Error: window is not defined',
        project: null,
        time: '1 hour ago'
    },
    {
        id: 3,
        title: 'Rebuilding a Website with Organized Code',
        time: '3 hours ago'
    },
    {
        id: 4,
        title: 'Troubleshooting Styles in Next.js React App',
        time: '21 hours ago'
    },
    {
        id: 5,
        title: 'Cheese Icon Request',
        time: '1 day ago'
    }
];

// Sample chat conversation data
const chatConversation = {
    id: 1,
    title: 'Exploring the World of Cheese Through AI',
    messages: [
        {
            role: 'user',
            content: 'What are the best cheeses for a cheese board?'
        },
        {
            role: 'assistant',
            content: 'For a well-balanced cheese board, I recommend including: 1) A soft cheese like Brie or Camembert, 2) A hard aged cheese like Parmigiano-Reggiano, 3) A blue cheese like Roquefort, and 4) A semi-firm cheese like Gouda or Manchego.'
        }
    ]
};

const MockDataService = {
    Init: function () {
        console.log('Mock Data Service Initialized');
        return Promise.resolve();
    },

    GetPodcasts: async function (limit) {
        const limitedEpisodes = limit ? episodes.slice(0, limit) : episodes;
        return Promise.resolve({ data: limitedEpisodes });
    },

    GetNewsletters: async function (limit) {
        const limitedNewsletters = limit ? newsletters.slice(0, limit) : newsletters;
        return Promise.resolve({ data: limitedNewsletters });
    },

    GetChats: async function (limit) {
        const limitedChats = limit ? recentChats.slice(0, limit) : recentChats;
        return Promise.resolve({ data: limitedChats });
    },

    GetChat: async function (id) {
        if (id === 1) {
            return Promise.resolve({ data: chatConversation });
        }
        return Promise.reject(new Error('Chat not found'));
    },

    ChatWithLLM: async function (id, chat_data) {
        // Simulate a delay to mimic API response time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response
        const response = {
            role: 'assistant',
            content: 'This is a mock response to your message: ' + chat_data.message
        };

        return Promise.resolve({ data: response });
    }
};

export default MockDataService;