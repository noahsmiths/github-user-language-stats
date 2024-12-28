export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  let repoLanguageURLs = [];

  let pageIndex = 1;
  for (let i = 0; true; i++) {
    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?page=${pageIndex++}`);
    const repoData = await repoResponse.json() as Array<{ languages_url: string }>;

    if (repoData.length === 0) break;

    console.log(repoData);
    repoLanguageURLs.push(...repoData);
  }

  async function getLanguageURL(url: string) {
    let res = await fetch(url);
    let body = await res.text();
    return body;
  }

  let githubLanguageRequests = [];
  for (let repoURL of repoLanguageURLs) {
    githubLanguageRequests.push(getLanguageURL(repoURL.languages_url));
  }

  const data = await Promise.all(githubLanguageRequests);

  return new Response(data.join("\n"));
}