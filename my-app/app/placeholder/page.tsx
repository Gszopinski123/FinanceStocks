import type { Metadata } from 'next'

import Link from 'next/link'
export default async function Mypage() {
    let data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    let posts = await data.json()
    return (
        <p>{JSON.stringify(posts)}</p>
    )

}