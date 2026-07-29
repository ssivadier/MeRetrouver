const GNEWS_API = 'https://gnews.io/api/v4/search';

export type GNewsArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
};

export async function fetchHealthNews(apiKey: string): Promise<GNewsArticle[]> {
  const query = 'hypnose OR hypnothérapie OR stress OR burnout OR phobie OR "bien-être mental" OR relaxation OR anxiété OR sommeil';
  const url = `${GNEWS_API}?q=${encodeURIComponent(query)}&lang=fr&country=fr&max=25&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GNews API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.articles ?? [];
}
