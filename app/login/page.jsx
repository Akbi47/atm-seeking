import { LoginForm } from "./form";


export default function login() {
    return (
        <>
            <section className="bg-ct-blue-600 min-h-screen">
                <div className="container mx-auto px-6 py-1 h-full flex justify-center items-center">
                    <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
                        <LoginForm />
                    </div>
                </div>
            </section>
        </>
    )
}