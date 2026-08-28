"use client";

import { useState } from "react";

// Client Component
// useClient: This component runs in the browser.
// useState: Manages interactive state.
// onClick: Handles user interaction.
// clientComponent: Provides interaction for the Server Component.
// fullstack: Client interaction is combined with server-fetched data.

export default function LikeButton() {
    const [liked, setLiked] = useState(false);

    return (
        <section>
            <button
                type="button"
                onClick={() => setLiked((current) => !current)}
            >
                {liked ? "Unlike" : "Like"}
            </button>

            <p>
                {liked ? "You liked this post." : "You have not liked this post yet."}
            </p>
        </section>
    );
}