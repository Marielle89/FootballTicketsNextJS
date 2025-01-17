'use client';

import { useEffect, useState } from 'react';
import { fetchFootballMatchByUrl } from '../../../utils/requests';
import Link from 'next/link';
import PropertyHeaderImage from '../../../components/PropertyHeaderImage';
import MatchDetails from '../../../components/MatchDetails';
import Spinner from '../../../components/Spinner';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import match from "../../../models/Match";

//
// export const metadata = {
//     title: 'Football match Shakhtar - Dinamo',
//     description: 'Football match Shakhtar - Dinamo',
//     keywords: 'Football match Shakhtar - Dinamo',
// };

export default function FootballMatchPage() {
    const router = useRouter();
    const { url } = useParams();

    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyData = async() => {
            if (!url) return;

            try {
                const property = await fetchFootballMatchByUrl(url);
                setMatch(property)
            } catch (error) {
                console.error('Error fetching match:', error);
            } finally {
                setLoading(false);
            }
        }

        if (null === match) {
            fetchPropertyData();
        }
    }, [url, match]);

    if (!match && !loading) {
        return (
            <h1 className='text-center text-2xl font-bold'>
                Football match Not Found
            </h1>
        );
    }

    return <>
        {loading && <Spinner loading={loading} />}
        {!loading && match &&  (<>
            {/*<PropertyHeaderImage image={match.images[0]}/>*/}
            <section className="bg-blue-50">
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/football-matches"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2"/> Повернутися до списку матчів
                    </Link>
                </div>
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <MatchDetails match={match}/>
                    </div>
                </div>
            </section>
        </>)}

    </>;

    //Working with query params
    // const searchParams = useSearchParams();
    // const name = searchParams.get('orders');
    //
    // const pathName = usePathname();
    //
    // return (
    //     <main>
    //         <div>
    //             <h1>Football match Shakhtar - Dinamo</h1>
    //             <button onClick={() => router.push('/')} className="bg-blue-500 p-2">Go Home {id}</button>
    //             {/*<Link href='/'>Go Home</Link>*/}
    //             <div>
    //                 Kyiv
    //             </div>
    //         </div>
    //     </main>
    // );
}
// 764753735385-en2o7ni65ngtr1bc78n5q6jsgofen4c9.apps.googleusercontent.com
// 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