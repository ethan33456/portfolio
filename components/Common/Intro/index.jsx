import Link from 'next/link';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import Download from './Download';
import Location from './Location';
import Tools from './Tools';
import Image from 'next/image';
import { NAME, DESIGNATION, SOCIAL_LINKS } from '../../../constants/constants';
import EthanImage from '../../../public/images/ethan.jpeg';

const Intro = () => {
  return (
    <>
      {/* fixed at top */}
      <div className='headerr z-50 absolute bg-DeepNightBlack backdrop-blur-sm inset-y-0 h-48 top-0 flex items-center justify-center w-full flex-col px-4 gap-y-4'>
        <Image className='w-20 h-20 rounded-full' src={EthanImage} alt='profile picture' />
        <div className='flex flex-col items-center justify-center'>
          <span className='text-gray-300 text-base font-bold break-normal'>{NAME}</span>
          <span className='text-sm text-LightGray text-center mt-2'>{DESIGNATION}</span>
          <a href="mailto:wmmethan@gmail.com" className='text-xs text-Green hover:text-Snow mt-1'>wmmethan@gmail.com</a>
        </div>
      </div>

      {/* middle components */}
      <div className='beech z-20 flex flex-col overflow-y-scroll pt-48 top-48 space-y-6 divide-y divide-white overflow-x-hidden no-scrollbar px-4'>
        <Location />
        <Tools />
        <Download icon={<FaDownload />} />
      </div>

      {/* social links */}
      <div className="flex items-center justify-center w-full gap-x-4">
        <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer">
          <FaGithub className="text-Snow hover:text-Green text-xl" />
        </a>
        <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer">
          <FaLinkedin className="text-Snow hover:text-Green text-xl" />
        </a>
      </div>
    </>
  );
};

export default Intro;
