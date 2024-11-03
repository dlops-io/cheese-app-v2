
import Link from 'next/link';
import Image from 'next/image';
import styles from './Podcasts.module.css';
import { PlayCircle } from '@mui/icons-material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
//import PodcastCard from '@/components/shared/PodcastCard';

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

export default function Podcasts() {
    return (
        <section className={styles.section} id="podcasts">
            <h2 className={styles.title}>Podcast</h2>
            <div className={styles.underline}></div>

            <div className={styles.content}>
                <div className={styles.aboutPodcast}>
                    <Image
                        src="/assets/podcast.png"
                        alt="Podcast Icon"
                        width={240}
                        height={240}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                    <h3>About Podcasts</h3>
                    <p>
                        Welcome to The Cheese Podcast, where we celebrate cheeses from around
                        the world in multiple languages! Each episode dives into the flavors,
                        textures, and stories behind different cheeses, bringing together
                        cultures and cuisines. Whether you're a cheese connoisseur or just curious, join us as we explore the world of cheese, one language at a time!
                    </p>
                </div>

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
            <div className={styles.viewAllContainer}>
                <Link href="/podcasts" className={styles.viewAllButton}>
                    View All Podcasts
                </Link>
            </div>
        </section>
    )
}