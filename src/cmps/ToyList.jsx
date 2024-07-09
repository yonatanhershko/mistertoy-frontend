import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"



export function ToyList({ toys, onDeleteToy }) {
    return (
        <ul className="toy-list">
       { toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <section className="btns">
                    <button className='btn btn-details'><Link to={`/toy/${toy._id}`}>Details</Link></button>
                    <button className='btn btn-edit'><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    <button onClick={() => onDeleteToy(toy._id)} className="btn btn-delete">Delete</button>
                </section>
            </li>)}
            
        </ul>
    )

}