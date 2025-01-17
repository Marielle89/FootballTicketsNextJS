import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from '../components/AuthProvider';


// export const metadata = {
//     title: 'Buy football ticket',
//     description: 'Ukraine football tickets',
//     keywords: 'football ticket, cheap football ticket',
// };

export default function MainLayout({children}) {
    return (
        <AuthProvider children={children}>
            <html lang="en">
            <body>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
            </body>
            </html>
        </AuthProvider>
    );
}
