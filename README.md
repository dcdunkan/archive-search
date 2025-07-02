## Search API

- Designed for serverless environments.
- No pagination yet.
- No full-text search yet.
- Simple small cache.
- Uses Minisearch and Deno.
- Search index are built and pulled from Content API build.

### For Developers

Set CONTENT_API_ROOT environment variable pointing to content API.

- We use Deno for convenience of deployment (free plan on Deno Deploy).
- Please format the files using `deno fmt` and lint using `deno lint`.
- You can run `deno -A --watch main.ts` while in-development.
