'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from '@mui/icons-material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DataService from "../../services/MockDataService"; // Mock
//import DataService from "../../services/DataService";

// Import the styles
import styles from "./styles.module.css";


export default function PodcastsPage() {
    // Component States
    const [episodes, setEpisodes] = useState([]);

    // Setup Component
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DataService.GetPodcasts(100);
                setEpisodes(response.data);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
                setEpisodes([]); // Set empty array in case of error
            }
        };

        fetchData();
    }, []);

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