import { ImCross, ImHome } from 'react-icons/im'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { AiFillProject } from 'react-icons/ai'
import NavItem from './NavItem'
import DrawerLayout from '../DrawerLayout'
import Link from 'next/link'

const Nav = ({ setIsOpen, isOpen }) => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <DrawerLayout setIsOpen={setIsOpen} isOpen={isOpen}>
            <div className="absolute z-50 flex flex-col justify-center lg:inset-y-0  -right-0 lg:right-0 w-64 h-screen lg:mt-3 lg:mr-3 lg:h-[96%] bg-DeepNightBlack shadow-2xl md:rounded-xl md:overflow-hidden">
                <div onClick={e => setIsOpen(false)} className="flex text-LightGray absolute top-0 w-full items-center justify-start pl-6 text-sm h-10 bg-EveningBlack">
                    <ImCross />
                </div>
                <div className="flex flex-col gap-y-2 px-6 w-full transition">
                    <div onClick={() => scrollToSection('home')} className="cursor-pointer">
                        <NavItem NavIcon={<ImHome />} NavText={'Home'} />
                    </div>
                    <div onClick={() => scrollToSection('expertise')} className="cursor-pointer">
                        <NavItem NavIcon={<BsFillPersonLinesFill />} NavText={'Expertise'} />
                    </div>
                    <div onClick={() => scrollToSection('recommendations')} className="cursor-pointer">
                        <NavItem NavIcon={<FaGraduationCap />} NavText={'Recommendations'} />
                    </div>
                    <div onClick={() => scrollToSection('portfolio')} className="cursor-pointer">
                        <NavItem NavIcon={<AiFillProject />} NavText={'Portfolio'} />
                    </div>
                    <div onClick={() => scrollToSection('background')} className="cursor-pointer">
                        <NavItem NavIcon={<FaBriefcase />} NavText={'Background'} />
                    </div>
                </div>
            </div>
        </DrawerLayout>
    )
}

export default Nav