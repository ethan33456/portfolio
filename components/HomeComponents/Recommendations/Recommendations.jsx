import RecommendationCard from "./RecommendationCard"
import axios from "axios";
import { useQuery } from "react-query";
import ParagraphSkeleton from "../../Common/ParagraphSkeleton";


const Recommendations = () => {
    const { isLoading, error, data } = useQuery('recommendations', () =>
        axios.get('api/recommendations')
            .then(({ data }) => data)
            .catch(error => console.error('Error fetching testimonials:', error)))


    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <p className="text-Green text-xs tracking-widest">RECOMMENDATIONS</p>
                <h1 className="text-Snow text-2xl lg:text-4xl">What Client Say</h1>
            </div>
            <div className="grid w-full h-full mt-5 justify-items-start grid-flow-row md:grid-cols-2 grid-rows-auto gap-x-4 gap-y-4 px-2 md:px-8 pb-8">

                {isLoading ?
                    [1, 2, 3, 4].map(() => (
                        <ParagraphSkeleton className={"p-8 h-full w-full relative"} />
                    ))
                    :
                    data?.map((data, key) => (
                        <RecommendationCard key={key} data={data} />
                    ))
                }

            </div>
        </>
    )
}

export default Recommendations