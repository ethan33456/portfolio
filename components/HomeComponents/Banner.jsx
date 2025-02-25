import Typewriter from 'typewriter-effect';
import BannerLayout from '../Common/BannerLayout';
import { Link } from 'react-scroll';

const Banner = () => {
    return (
        <BannerLayout>
            <div className="absolute inset-0 z-20 flex flex-col justify-center w-full h-full bg-gradient-to-t from-MidNightBlack">
                <div className="bg-LightGray/10 w-[95%] h-[90%] px-8 py-2 mx-auto rounded-xl overflow-hidden flex items-center">
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-3xl sm:text-4xl xl:text-5xl text-Snow font-bold">Hello, Check This Out!</h1>
                        </div>
                        <div className="py-4 font-cascadia-normal text-Snow pb-4 text-xs h-20 lg:h-auto">
                            <span>{"<"}<span className="text-Green sm:text-base xl:text-lg font-bold">div</span>
                                {">"} <span className="text-Snow sm:text-xl xl:text-2xl font-bold"> I am a <span className="inline-block">
                                    <Typewriter
                                        options={{
                                            strings: [
                                                'Developer',
                                                'Software Engineer'  // Add any other titles you'd like
                                            ],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </span>
                                </span> {"</"}<span className="text-Green sm:text-base xl:text-lg font-bold">div</span>{">"} </span>
                        </div>
                        <p className="text-Snow/80 text-sm sm:text-base max-w-xl">
                            A passionate frontend developer with experience in building responsive and interactive web applications using React, Next.js and modern JavaScript. Currently working at JMM Technologies, focused on creating elegant user interfaces and exceptional digital experiences.
                        </p>
                    </div>
                </div>

                {/* details in row */}

            </div>
        </BannerLayout>
    )
}

export default Banner