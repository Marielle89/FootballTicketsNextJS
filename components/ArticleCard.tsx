import Image from 'next/image';
import Link from 'next/link';

const ArticleCard = ({ article }) => {
    return (
        <div className="rounded-xl shadow-md relative">

            <Image
                src={`/images/properties/${ article.image }`}
                alt=""
                sizes='100vw'
                width={0}
                height={0}
                className="w-full h-auto rounded-t-xl"
            />

            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    {/*<div className="text-gray-600">{ property.type }</div>*/}
                    <h3 className="text-xl font-bold">{ article.title }</h3>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <Link        href={`/blog/${article.url}`} //TODO: add cpu for every match
                                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Детальніше
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;
