import { ReactTyped } from "react-typed"



export function Home() {

    return (
        <section>
            <h1>
                Welcome to{" "}
                <ReactTyped strings={["Yona's ToyShop🦔"]} typeSpeed={100} loop ={false}  />
            </h1>
            <h3>
                {" "}
                <ReactTyped strings={["Enjoy your visit!"]} typeSpeed={200} loop ={false} />
            </h3>


        </section>
    )
}