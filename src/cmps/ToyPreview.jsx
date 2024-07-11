






export function ToyPreview({ toy }) {
    const generateRobohashUrl = (id) => {
        return `https://robohash.org/${id}?set=set3`
    }
    return (
        <article>
            <img src={generateRobohashUrl(toy._id)} alt={toy.name} style={{ width: '100px', height: '100px' }} />
            <h1>{toy.name}</h1>
            <h2>${toy.price}</h2>
            <span className={`stock-status ${toy.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {toy.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
        </article>
    )
}