import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { createPageMetadata } from '@/lib/seo';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { YouTubeVideo } from '@/components/blog/YouTubeVideo';
import { BookingCTA } from '@/components/blog/BookingCTA';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

const mdxComponents = {
  YouTubeVideo,
  BookingCTA,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell className="max-w-3xl">
      <Reveal>
        <BlogArticle post={post}>
          <MDXRemote source={post.content} components={mdxComponents} />
        </BlogArticle>
      </Reveal>
    </PageShell>
  );
}
