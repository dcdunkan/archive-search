import MiniSearch from "npm:minisearch@7.1.2";
import { Hono } from "jsr:@hono/hono@4.8.3";

// todo: implement API_SECRET somehow
// const API_SECRET = Deno.env.get("API_SECRET");
// if (!API_SECRET) {
//     throw new Error("Invalid API_SECRET");
// }

const CONTENT_API_ROOT = Deno.env.get("CONTENT_API_ROOT");
if (!CONTENT_API_ROOT || !URL.canParse(CONTENT_API_ROOT)) {
    throw new Error("Invalid CONTENT_API_ROOT");
}

// deno-lint-ignore no-explicit-any
async function getContentJSONFile<T extends any>(path: string) {
    const response = await fetch(CONTENT_API_ROOT + path, {
        cache: "no-cache",
        headers: {
            "Accept": "application/json",
        },
    });
    if (!response.ok) {
        console.error(response);
        throw new Error("failed to get content JSON file: " + path);
    }
    return await response.json() as T;
}

const globalSearchIndex = await getContentJSONFile<SearchDocument[]>("/search-index.json")
    .then((documents) => documents.map((doc, index) => ({ id: index, ...doc })));

const minisearch = new MiniSearch<SearchDocument>({
    fields: [
        "name",
        "code",
        "slug",
        // "courseName",
        // "courseCode",
        "title",
        "caption",
        "alt",
    ],
    searchOptions: {
        boost: {
            code: 3,
            name: 2,
            title: 2,
        },
        prefix: true,
        fuzzy: 0.2,
        combineWith: "AND",
    },
});
minisearch.addAll(globalSearchIndex);

// a simple lru based cache
const cache = new Map<string, SearchDocument[]>();
const lastUsed: string[] = [];
const CACHE_ENTRY_LIMIT = 50;

// todo: implement pagination
// const MAX_PAGES = 100;
// const MAX_RESULTS_PER_PAGE = 100;

const app = new Hono();

// todo: could return paths to different search end-points (contextual stuff etc.)
// app.get("/configurations")

// global search
app.get("/search", (ctx) => {
    const query = ctx.req.query("query");
    if (!query) {
        return ctx.json({
            ok: false,
            message: "Expected query.",
        }, { status: 400, statusText: "Expected query" });
    }

    // todo: implement filters

    if (cache.has(query)) {
        const index = lastUsed.indexOf(query);
        if (index == -1) {
            throw new Error("something really went wrong");
        }
        lastUsed.splice(index, 1);
        lastUsed.push(query);
        const cached = cache.get(query);
        if (cached == null) {
            throw new Error("what");
        }
        return ctx.json(cached);
    } else {
        const results = minisearch.search(query)
            .map((result) => globalSearchIndex[result.id])
            .slice(0, 100);
        if (lastUsed.length > 0 && lastUsed.length === CACHE_ENTRY_LIMIT) {
            const invalidated = lastUsed.shift()!;
            cache.delete(invalidated);
        }
        lastUsed.push(query);
        cache.set(query, results);
        return ctx.json(results);
    }
});

Deno.serve({ port: 8001 }, app.fetch);
