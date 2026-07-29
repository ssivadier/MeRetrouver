const PUBMED_SEARCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const PUBMED_SUMMARY = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';

export type PubMedRef = {
  pmid: string;
  title: string;
  authors: string;
  year: string;
  journal: string;
  doi?: string;
  url: string;
};

export async function searchPubMed(query: string, maxResults = 3): Promise<PubMedRef[]> {
  const searchUrl = `${PUBMED_SEARCH}?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json`;
  const searchRes = await fetch(searchUrl);

  if (!searchRes.ok) {
    console.warn(`PubMed search error: ${searchRes.status}`);
    return [];
  }

  const searchData = await searchRes.json();
  const ids: string[] = searchData.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  const summaryUrl = `${PUBMED_SUMMARY}?db=pubmed&id=${ids.join(',')}&retmode=json`;
  const summaryRes = await fetch(summaryUrl);

  if (!summaryRes.ok) {
    console.warn(`PubMed summary error: ${summaryRes.status}`);
    return ids.map(id => ({ pmid: id, title: '', authors: '', year: '', journal: '', url: `https://pubmed.ncbi.nlm.nih.gov/${id}/` }));
  }

  const summaryData = await summaryRes.json();
  const results: PubMedRef[] = [];

  for (const id of ids) {
    const entry = summaryData.result?.[id];
    if (!entry) continue;
    results.push({
      pmid: id,
      title: entry.title ?? '',
      authors: (entry.authors ?? []).slice(0, 3).map((a: any) => a.name).join(', '),
      year: entry.pubdate?.substring(0, 4) ?? '',
      journal: entry.source ?? '',
      doi: entry.elocationid?.startsWith('doi: ') ? entry.elocationid.replace('doi: ', '') : undefined,
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    });
  }

  return results;
}
