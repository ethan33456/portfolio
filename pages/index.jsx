import Footer from '../components/Footer';
import Banner from '../components/HomeComponents/Banner';
import MyExpertise from '../components/HomeComponents/Expertise/MyExpertise';
import Recommendations from '../components/HomeComponents/Recommendations/Recommendations';
import PortfolioCard from '../components/Portfolio/PortfolioCard';
import Edu_Card from "../components/Background/Edu_Card";
import Exp_Card from "../components/Background/Exp_Card";
import AnimatedBackground from '../components/Background/AnimatedBackground';
import { useQuery } from 'react-query';
import axios from 'axios';
import ImageAndParagraphSkeleton from '../components/Common/ImageAndParagraphSkeleton';
import ParagraphSkeleton from "../components/Common/ParagraphSkeleton";

const home = () => {
    const { isLoading: portfolioLoading, data: portfolioData } = useQuery('portfolio', () =>
        axios.get('api/portfolio')
            .then(({ data }) => data)
            .catch(error => console.error('Error fetching portfolio:', error)))

    const { isLoading: backgroundLoading, data: backgroundData } = useQuery('background', () =>
        axios.get('api/background')
            .then(({ data }) => data)
            .catch(error => console.error('Error fetching background:', error)))

    return (
        <>
            <AnimatedBackground />
            <div className="Home-Page relative lg:mt-3 lg:mr-3 lg:ml-3 lg:mb-3 md:rounded-xl overflow-hidden">
                <div id="home">
                    <Banner />
                </div>
                
                <div id="expertise" className="hidden">
                    <MyExpertise />
                </div>
                
                {/* Portfolio Section */}
                <div id="portfolio" className="px-5 py-10 lg:py-14">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-Green text-xs tracking-widest">PORTFOLIO</p>
                        <h1 className="text-Snow text-2xl lg:text-4xl">Recent Projects</h1>
                    </div>
                    <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-4 my-6">
                        {portfolioLoading ?
                            [1, 2, 3, 4].map((_, index) => (
                                <ImageAndParagraphSkeleton key={index} className={"w-full object-cover"} />
                            ))
                            :
                            portfolioData?.map((data, key) => (
                                <PortfolioCard key={key} data={data} />
                            ))
                        }
                    </div>
                </div>
                
                <div id="recommendations" className="px-5 py-10 lg:py-14">
                    <Recommendations />
                </div>

                {/* Background Section */}
                <div id="background" className="px-5 py-10 lg:py-14">
                    <div className="flex flex-col justify-center items-center mb-8">
                        <p className="text-Green text-xs tracking-widest">BACKGROUND</p>
                        <h1 className="text-Snow text-2xl lg:text-4xl">Education & Experience</h1>
                    </div>
                    <div className="grid md:grid-cols-2 md:divide-x-4 md:divide-Green px-4">
                        <div className="flex flex-col gap-y-4 order-2 md:order-1 md:mr-12">
                            <div className="text-xl text-Snow font-semibold">Education</div>
                            {backgroundLoading ?
                                [1, 2, 3].map((_, index) => (
                                    <ParagraphSkeleton key={index} className={"p-8 h-full w-full relative"} />
                                ))
                                :
                                backgroundData && backgroundData[0]?.eduCards?.map((data, key) => (
                                    <Edu_Card key={key} data={data} />
                                ))
                            }
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="flex flex-col gap-y-4 md:ml-12">
                                <div className="text-xl text-Snow font-semibold">Experience</div>
                                {backgroundLoading ?
                                    [1, 2, 3].map((_, index) => (
                                        <ParagraphSkeleton key={index} className={"p-8 h-full w-full relative"} />
                                    ))
                                    :
                                    backgroundData && backgroundData[0]?.expCards?.map((data, key) => (
                                        <Exp_Card key={key} data={data} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default home