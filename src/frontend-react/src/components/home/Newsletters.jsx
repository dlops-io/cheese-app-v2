import Link from 'next/link';
import Image from 'next/image';
import styles from './Newsletters.module.css';

// Sample newsletter data - this would come from your API/database
const newsletters = [
    {
        id: 1,
        date: 'September 15, 2024',
        title: 'Exploring Alpine Cheeses',
        excerpt: 'Discover the rich traditions of Alpine cheesemaking, from Swiss Gruyère to French Beaufort. Learn how altitude and seasonal grazing practices influence the unique flavors of these mountain cheeses...',
        readTime: '5 min read'
    },
    {
        id: 2,
        date: 'September 8, 2024',
        title: 'The Art of Blue Cheese',
        excerpt: 'Dive into the fascinating world of blue cheeses, from Italian Gorgonzola to French Roquefort. Understand the role of Penicillium roqueforti and how it creates those distinctive blue-green veins...',
        readTime: '4 min read'
    },
    {
        id: 3,
        date: 'September 1, 2024',
        title: 'Spanish Cheese Journey',
        excerpt: 'Take a virtual tour through Spains diverse cheese landscape, from the sharp Manchego of La Mancha to the smoky Idiazábal of the Basque Country...',
        readTime: '6 min read'
    },
    {
        id: 4,
        date: 'August 25, 2024',
        title: 'Fresh Cheese Fundamentals',
        excerpt: 'Learn about the world of fresh cheeses, from Italian Mozzarella to Indian Paneer. Discover how these young cheeses are made and the best ways to enjoy them...',
        readTime: '4 min read'
    },
    {
        id: 5,
        date: 'August 18, 2024',
        title: 'Aging Gracefully: A Guide to Cheese Maturation',
        excerpt: 'Explore the science and art behind cheese aging. From temperature and humidity control to the development of flavor crystals...',
        readTime: '7 min read'
    },
];

export default function Newsletter() {
    return (
        <section className={styles.section} id="newsletters">
            <h2 className={styles.title}>Newsletters</h2>
            <div className={styles.underline}></div>

            <div className={styles.content}>
                <div className={styles.newsletterGrid}>
                    {newsletters.map((newsletter) => (
                        <article key={newsletter.id} className={styles.newsletterCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.date}>{newsletter.date}</span>
                                <span className={styles.readTime}>{newsletter.readTime}</span>
                            </div>

                            <h3 className={styles.newsletterTitle}>{newsletter.title}</h3>

                            <p className={styles.excerpt}>{newsletter.excerpt}</p>

                            <Link href={`/newsletters/${newsletter.id}`} className={styles.readMore}>
                                Read More →
                            </Link>
                        </article>
                    ))}
                </div>
                <div className={styles.aboutNewsletter}>
                    <Image
                        src="/assets/newsletter.png"
                        alt="Newsletter Icon"
                        width={240}
                        height={240}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                    <h3>About Newsletters</h3>
                    <p>
                        Welcome to Formaggio.me's Cheese Chronicles, your weekly digest of all things cheese! Our newsletters dive deep into the fascinating world of artisanal cheese-making, featuring expert insights, tasting notes, and the latest innovations in cheese technology. From traditional techniques to AI-powered cheese analysis, we explore the intersection of time-honored craftsmanship and modern innovation. Whether you're a cheese professional, enthusiast, or just beginning your cheese journey, our newsletters provide valuable insights, pairing suggestions, and behind-the-scenes looks at the world's finest cheeses. Stay informed, inspired, and connected to the global cheese community with our weekly updates!
                    </p>
                </div>
            </div>
            <div className={styles.viewAllContainer}>
                <Link href="/newsletters" className={styles.viewAllButton}>
                    View All Newsletters
                </Link>
            </div>
        </section>
    );
}