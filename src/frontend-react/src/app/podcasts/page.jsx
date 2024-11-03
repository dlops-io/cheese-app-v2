import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from '@mui/icons-material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


// Import the styles
import styles from "./styles.module.css";

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
    },
];

export default function PodcastsPage() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Cheese Voices</h1>
                    <p>Where AI meets artisanal expertise - A multilingual podcast series exploring the intersection of artificial intelligence and cheese appreciation</p>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <div className={styles.aboutContent}>
                    <h2>About Podcasts</h2>
                    <p>
                        Welcome to The Cheese Podcast, where artificial intelligence meets artisanal expertise! Our groundbreaking series brings together cutting-edge AI technology and centuries-old cheese-making traditions in an innovative way.

                        Each episode is available in multiple languages, making cheese knowledge accessible to audiences worldwide. We use advanced AI translation to ensure our content maintains its authenticity and technical accuracy across all languages.
                    </p>
                </div>
            </section>

            <div className={styles.episodesList}>
                {episodes.map((episode) => (
                    <div key={episode.id} className={styles.episodeCard}>
                        <div className={styles.episodeHeader}>
                            <div className={styles.episodeInfo}>
                                <span className={styles.podcast}>FORMAGGIO</span>
                                <h4 className={styles.episodeTitle}>{episode.title}</h4>
                                <span className={styles.date}>{episode.date}</span>
                            </div>
                            <div className={styles.controls}>
                                <button className={styles.playButton}>
                                    <PlayCircle />
                                </button>
                            </div>
                        </div>

                        <div className={styles.progressContainer}>
                            <div className={styles.timeStamp}>00:00:00</div>
                            <div className={styles.progressBar}>
                                <div className={styles.progress}></div>
                            </div>
                            <div className={styles.timeStamp}>{episode.duration}</div>
                        </div>

                        <div className={styles.episodeFooter}>
                            <button className={styles.descriptionToggle}>
                                Show description ▼
                            </button>
                            <VolumeUpIcon className={styles.volumeIcon} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}