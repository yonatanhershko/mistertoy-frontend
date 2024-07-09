






export function ToyPreview({ toy }) {
    return (
        <article>

            <h1>{toy.name}</h1>
            <h2>${toy.price}</h2>
            <span>{toy.inStock ? 'In Stock' : 'Out of Stock'}</span>
        </article>
    )
}