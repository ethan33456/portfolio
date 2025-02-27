import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';

const Banner = () => {
    return (
        <div className="lg:px-8 2xl:px-16 py-16 lg:py-28">
            <div className="flex flex-col px-4 lg:px-8">
                <div className="flex flex-col gap-y-4">
                    <h1 className="text-Snow text-4xl lg:text-5xl font-bold mb-4">
                        Hi, I'm Ethan Bell
                    </h1>
                    <div className="py-4 font-cascadia-normal text-Snow pb-4 text-xl lg:text-2xl">
                        <span className="text-Snow font-bold">
                            I am a{" "}
                            <span className="inline-block">
                                <Typewriter
                                    options={{
                                        strings: ['Developer', 'Software Engineer'],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </span>
                    </div>
                    <Link 
                        to='intro' 
                        spy={true} 
                        smooth={true} 
                        duration={500} 
                        offset={-50} 
                        className="button w-fit mt-4"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Banner;