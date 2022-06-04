import { Header } from "../header/Header";

export function Layout({children}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

