import { MetadataRoute } from 'next';
import { hotels, blogPosts } from '@/data/hotels';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lumierehotels.com';

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
        { url: `${baseUrl}/hotels`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${baseUrl}/rooms`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
        { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${baseUrl}/experiences`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
        { url: `${baseUrl}/restaurant`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    ];

    const hotelPages = hotels.map((hotel) => ({
        url: `${baseUrl}/hotels/${hotel.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...hotelPages, ...blogPages];
}
