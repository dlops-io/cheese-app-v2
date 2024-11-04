import { uuid } from "./Common";

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
        "id": "4c4f1ad4-99db-4c62-b0ec-86cc353fc586",
        "title": "What is your take on the debate between raw milk versus pasteurized cheese aging processes and their impact on flavor development?",
        "time": "29 minutes ago"
    },
    {
        "id": "b959d7ad-f11b-4c53-8655-8d9d3f8e474a",
        "title": "Which lesser-known Alpine cheeses would you recommend to someone who loves Gruyère but wants to explore beyond the classics?",
        "time": "27 minutes ago"
    },
    {
        "id": "cbe312e2-3b39-4675-bcb4-d2a25d2d880b",
        "title": "How do you identify a perfectly ripe Epoisses, and what's the ideal timeframe for consuming it once it reaches peak ripeness?",
        "time": "25 minutes ago"
    },
    {
        "id": "cbe312e2-3b12-4675-bcb4-d2a25d2d8834",
        "title": "Can you explain the specific cave microflora that contributes to the distinct blue-gray rind of Valençay?",
        "time": "24 minutes ago"
    },
    {
        "id": "646b23ab-072b-41bf-997c-d8c539023f38",
        "title": "What's your opinion on the recent trend of washing cheese rinds with non-traditional liquids like craft beer or botanical spirits?",
        "time": "22 minutes ago"
    },
    {
        "id": "abc46c4c-10f2-4ef8-9bea-88bc80617dc9",
        "title": "How does the seasonal variation in goat's milk affect the texture and flavor profile of fresh chèvre throughout the year?",
        "time": "20 minutes ago"
    },
    {
        "id": uuid(),
        "title": "Which traditional Welsh cheeses do you think deserve more international recognition?",
        "time": "18 minutes ago"
    },
    {
        "id": uuid(),
        "title": "What are your thoughts on the optimal cellar humidity levels for aging washed-rind cheeses versus bloomy rinds?",
        "time": "16 minutes ago"
    },
    {
        "id": uuid(),
        "title": "How do you feel about the modernization of traditional PDO cheese-making methods to meet increasing demand?",
        "time": "15 minutes ago"
    },
    {
        "id": uuid(),
        "title": "Could you explain the role of thermophilic versus mesophilic cultures in cheese development?",
        "time": "13 minutes ago"
    },
    {
        "id": uuid(),
        "title": "What's your favorite cheese and wine pairing that challenges conventional wisdom?",
        "time": "11 minutes ago"
    },
    {
        "id": uuid(),
        "title": "How do you see climate change affecting traditional cheese-making regions and their signature products?",
        "time": "9 minutes ago"
    },
    {
        "id": uuid(),
        "title": "Which emerging cheese-making regions should we be paying attention to over the next decade?",
        "time": "7 minutes ago"
    },
    {
        "id": uuid(),
        "title": "What's your stance on the use of wooden boards versus plastic during the aging process?",
        "time": "5 minutes ago"
    },
    {
        "id": uuid(),
        "title": "Can you recommend some interesting cheese pairings specifically for oxidative-style sherries?",
        "time": "3 minutes ago"
    }
];

// Sample chat conversation data
const chatConversation = {
    messages: [
        {
            "id": uuid(),
            role: 'user',
            content: 'What are the best cheeses for a cheese board?'
        },
        {
            "id": uuid(),
            role: 'assistant',
            content: 'For a well-balanced cheese board, I recommend including: 1) A soft cheese like Brie or Camembert, 2) A hard aged cheese like Parmigiano-Reggiano, 3) A blue cheese like Roquefort, and 4) A semi-firm cheese like Gouda or Manchego.'
        },
        {
            "id": uuid(),
            role: 'user',
            content: 'Some other question....'
        },
        {
            "id": uuid(),
            role: 'assistant',
            content: 'Some other questions answer....'
        },
    ]
};

const DataService = {
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
        let chatConv = recentChats.find(chat => chat.id === id);
        chatConversation["id"] = id;
        chatConversation["title"] = chatConv["title"];
        return Promise.resolve({ data: chatConversation });
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

export default DataService;