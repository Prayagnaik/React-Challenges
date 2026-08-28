'use client'

import { useState } from 'react'

// useClient: this component is a Client Component
// serverComponent: this component is rendered by a Server Component
// useState: React state is used for interactivity

export default function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <h2>Counter</h2>

            <p>Count: {count}</p>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}