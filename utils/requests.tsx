// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// async function fetchFootballMatches() {
//     try {
//         const apiDomain = 'http://localhost:3000/api/football-matches';
//         //Handle the case where the domain is not available yet
//         if (!apiDomain) {
//             return [];
//         }
//
//         const res = await fetch(apiDomain);
//
//         if (!res.ok) {
//             console.log('Failed to fetch data');
//         }
//
//         return res.json();
//     } catch (error) {
//         console.log(error);
//
//         console.log('Failed to fetch data');
//
//         return [];
//     }
// }
//
// async function fetchFootballMatchById(id) {
//     try {
//         const apiDomain = `http://localhost:3000/api/football-matches/${id}`;
//         //Handle the case where the domain is not available yet
//         if (!apiDomain) {
//             return null;
//         }
//
//         const res = await fetch(apiDomain);
//
//         if (!res.ok) {
//             console.log('Failed to fetch data');
//         }
//
//         return res.json();
//     } catch (error) {
//         console.log(error);
//
//         console.log('Failed to fetch data');
//
//         return null;
//     }
// }
async function fetchFootballMatches() {
    try {
        const apiDomain = 'http://localhost:3000/api/football-matches';
        //Handle the case where the domain is not available yet
        if (!apiDomain) {
            return [];
        }

        const res = await fetch(apiDomain);

        if (!res.ok) {
            console.log('Failed to fetch data');
        }

        return res.json();
    } catch (error) {
        console.log(error);

        console.log('Failed to fetch data');

        return [];
    }
}

async function fetchFootballMatchByUrl(alias) {
    try {
        const url = `http://localhost:3000/api/football-matches/${alias}`;

        if (!url) {
            return null;
        }

        const res = await fetch(url);

        if (!res.ok) {
            console.log('Failed to fetch data');

            return null;
        }

        return res.json();
    } catch (error) {
        console.log('Failed to fetch data');

        return null;
    }
}
async function createOrder(order) {
    try {
        const url = `http://localhost:3000/api/orders`;

        if (!url) {
            return null;
        }

        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            console.log('Failed to fetch data');

            return null;
        }

        return await response.json();
    } catch (error) {
        console.log('Failed to fetch data');

        return null;
    }
}

async function getOrders(userId) {
    try {
        const url = `http://localhost:3000/api/orders/${userId}`;

        if (!url) {
            return null;
        }

        const response = await fetch(url);

        if (!response.ok) {
            console.log('Failed to fetch data');

            return null;
        }

        return await response.json();
    } catch (error) {
        console.log('Failed to fetch data');

        return null;
    }
}
export { fetchFootballMatches, fetchFootballMatchByUrl, createOrder, getOrders };