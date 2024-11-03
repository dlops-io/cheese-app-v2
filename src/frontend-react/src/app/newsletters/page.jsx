import Image from 'next/image';
import Link from 'next/link';


// Import the styles
import styles from "./styles.module.css";

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
    },
    // Add more newsletters...
];


export default function NewslettersPage() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Cheese Chronicles</h1>
                    <p>Explore our collection of articles about the fascinating world of cheese and AI</p>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <div className={styles.aboutContent}>
                    <h2>About Newsletters</h2>
                    <p>
                        Welcome to Formaggio.me's Cheese Chronicles, your weekly digest of all things cheese!
                        Our newsletters dive deep into the fascinating world of artisanal cheese-making,
                        featuring expert insights, tasting notes, and the latest innovations in cheese technology.
                    </p>
                </div>
            </section>

            {/* Newsletter Grid */}
            <section className={styles.newsletterSection}>
                <div className={styles.grid}>
                    {newsletters.map((newsletter) => (
                        <article key={newsletter.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={newsletter.image}
                                    alt={newsletter.title}
                                    width={400}
                                    height={250}
                                    className={styles.image}
                                />
                                <span className={styles.category}>{newsletter.category}</span>
                            </div>

                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.date}>{newsletter.date}</span>
                                    <span className={styles.readTime}>{newsletter.readTime}</span>
                                </div>

                                <h3 className={styles.title}>{newsletter.title}</h3>
                                <p className={styles.excerpt}>{newsletter.excerpt}</p>

                                <Link href={`/newsletters/${newsletter.id}`} className={styles.readMore}>
                                    Read More <span className={styles.arrow}>→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Subscription */}
                <div className={styles.subscriptionBox}>
                    <h3>Stay Updated</h3>
                    <p>Subscribe to receive our latest newsletters directly in your inbox.</p>
                    <form className={styles.subscriptionForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.emailInput}
                        />
                        <button type="submit" className={styles.subscribeButton}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}