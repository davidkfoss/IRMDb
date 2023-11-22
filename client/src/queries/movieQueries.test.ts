import { client } from "../client";
import { getMoviesByFilterQuery } from "./movieQueries";

describe("testing the api for fetching movies with queries", () => {

    it("should return a list of 12 action movies", async () => {
        const result = await client.query({
            query: getMoviesByFilterQuery,
            variables: {
                genre: ["Action"],
                sortBy: "Name",
                direction: "asc",
                search: "",
                offset: 0,
                limit: 12,
            },
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("data");
        expect(result.error).toBeFalsy();
        expect(result.data?.GetMoviesByFilter).toBeTruthy();
        expect(result.data?.GetMoviesByFilter.length).toBe(12);
        for(let i = 0; i < result.data?.GetMoviesByFilter.length; i++) {
            expect(result.data?.GetMoviesByFilter[i].genre).toContain("Action");
        }
    });

    it("should return a list of 12 movies with the word 'the' in the title", async () => {
        const result = await client.query({
            query: getMoviesByFilterQuery,
            variables: {
                genre: [],
                sortBy: "Name",
                direction: "asc",
                search: "the",
                offset: 0,
                limit: 12,
            },
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("data");
        expect(result.error).toBeFalsy();
        expect(result.data?.GetMoviesByFilter).toBeTruthy();
        expect(result.data?.GetMoviesByFilter.length).toBe(12);
        for(let i = 0; i < result.data?.GetMoviesByFilter.length; i++) {
            expect(result.data?.GetMoviesByFilter[i].title.toLowerCase()).toContain("the");
        }
    });

    it("should fail to return a list of 12 movies with the search 'alexander the great'", async () => {
        const result = await client.query({
            query: getMoviesByFilterQuery,
            variables: {
                genre: [],
                sortBy: "Name",
                direction: "asc",
                search: "alexander the great",
                offset: 0,
                limit: 12,
            },
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("data");
        expect(result.error).toBeFalsy();
        expect(result.data?.GetMoviesByFilter).toBeTruthy();
        expect(result.data?.GetMoviesByFilter.length).not.toBeGreaterThanOrEqual(12);
    });

    it("should return 1 movie", async () => {
        const result = await client.query({
            query: getMoviesByFilterQuery,
            variables: {
                genre: [],
                sortBy: "Name",
                direction: "asc",
                search: "",
                offset: 0,
                limit: 1,
            },
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("data");
        expect(result.error).toBeFalsy();
        expect(result.data?.GetMoviesByFilter).toBeTruthy();
        expect(result.data?.GetMoviesByFilter.length).toBe(1);
    });

    it("should return no movies when sending invalid genre", async () => {
        const result = await client.query({
            query: getMoviesByFilterQuery,
            variables: {
                genre: ["Invalid"],
                sortBy: "Name",
                direction: "asc",
                search: "",
                offset: 0,
                limit: 12,
            },
        });
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("data");
        expect(result.error).toBeFalsy();
        expect(result.data?.GetMoviesByFilter).toBeTruthy();
        expect(result.data?.GetMoviesByFilter.length).toBe(0);
    });

});