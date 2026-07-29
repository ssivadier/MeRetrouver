import fs from 'fs';
import path from 'path';

const LOG_PATH = path.join(process.cwd(), 'content', 'blog-topics.json');

export type TopicEntry = {
  slug: string;
  title: string;
  generatedAt: string;
  sourceUrl?: string;
  sourceTitle?: string;
  scientificRefs?: string[];
  imageUrl?: string;
};

export function loadTopics(): TopicEntry[] {
  if (!fs.existsSync(LOG_PATH)) return [];
  const raw = fs.readFileSync(LOG_PATH, 'utf-8').trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

export function addTopic(entry: TopicEntry): void {
  const topics = loadTopics();
  topics.push(entry);
  fs.writeFileSync(LOG_PATH, JSON.stringify(topics, null, 2) + '\n');
}

export function isDuplicateTopic(title: string, topics: TopicEntry[]): boolean {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  return topics.some(t =>
    t.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized) ||
    normalized.includes(t.title.toLowerCase().replace(/[^a-z0-9]/g, ''))
  );
}
