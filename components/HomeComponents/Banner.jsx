import Typewriter from 'typewriter-effect';

const Banner = () => {
    return (
        <div className="px-2 md:px-8 py-4 py-16">
            <div className="flex flex-col">
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
                    <p className="text-Snow text-lg lg:text-xl mt-4 max-w-2xl">
                        Lorem Ipsum Dolor
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Banner;