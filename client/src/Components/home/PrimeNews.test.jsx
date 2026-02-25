import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PrimeNews from "./PrimeNews";

const makeFetchResponse = (items) =>
  Promise.resolve({ json: () => Promise.resolve({ items }) });

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("PrimeNews", () => {
  it("fetches the latest video exactly once on mount", async () => {
    global.fetch.mockReturnValue(
      makeFetchResponse([
        { guid: "abc-123", title: "Test Video", metaTags: [] },
      ]),
    );

    render(<PrimeNews />);

    // Wait for fetch to resolve and content to render, then count calls.
    // If fetch is in the component body (not useEffect), each setState
    // re-render triggers another fetch — this assertion catches that.
    await screen.findByText("Test Video");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("bunnycdn.com/library"),
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("renders without crashing when metaTags is an empty array", async () => {
    global.fetch.mockReturnValue(
      makeFetchResponse([
        {
          guid: "abc-123",
          title: "Test Video",
          metaTags: [],
        },
      ]),
    );

    render(<PrimeNews />);

    await screen.findByText("Test Video");
    expect(
      screen.getByText("Grabbing the Information Now"),
    ).toBeInTheDocument();
  });

  it("renders the description when metaTags has a value", async () => {
    global.fetch.mockReturnValue(
      makeFetchResponse([
        {
          guid: "abc-123",
          title: "Another Video",
          metaTags: [{ value: "This is the description" }],
        },
      ]),
    );

    render(<PrimeNews />);

    await screen.findByText("This is the description");
  });

  it("logs an error when the fetch fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch.mockRejectedValue(new Error("Network error"));

    render(<PrimeNews />);

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error)),
    );
    consoleSpy.mockRestore();
  });
});
