import 'bootstrap/dist/css/bootstrap.css'
import './global.css'
import MangaBatList from "@/components/MangaBatList";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-bs-theme="dark">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
        <body>
        <div className={"vh-100 bg-dark"}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CrashMeManga</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="ms-auto d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="pb-3"></div>
            <div className={'overflow-auto text-white flex-grow-1 h-100'}>
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
