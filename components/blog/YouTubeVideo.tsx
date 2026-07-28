'use client';

export function YouTubeVideo({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-2xl border border-brand-mist">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title ?? 'Vidéo YouTube'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
