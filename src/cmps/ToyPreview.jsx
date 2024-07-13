






export function ToyPreview({ toy }) {
    function generateRobohashUrl(id) {
        return `https://robohash.org/${id}?set=set3`
    }

    return (
        <article >
  
            <img className="toy-img"src={generateRobohashUrl(toy._id)} alt={toy.name} style={{ width: '100px', height: '100px' }} />
            <h1>{toy.name}</h1>
            <h2>${toy.price}</h2>
            {toy.inStock ? (
        <img className="stock-img" src="src/assets/img/1in.png" alt="In Stock" />
    ) : (
        <img className="stock-img" src="src/assets/img/2out.png" alt="Out of Stock" />
    )}
        </article>
    )
}