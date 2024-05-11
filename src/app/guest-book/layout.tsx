'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion';
import { AsideLink } from '@/components/atoms/aside-link';
import { FadeIn, FadeInStagger } from '@/components/atoms/fade-in';
import { Input } from '@/components/atoms/input';
import { db } from '@/lib/firebase'; // Import your Firebase db instance
import { format } from 'date-fns';
import { addDoc, collection } from 'firebase/firestore';
import { Suspense, useState } from 'react';
import { BsInstagram, BsLinkedin, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { FaRegEnvelope } from 'react-icons/fa';

const dateTimeFormat = "MMMM d, yyyy h:mm a";
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const [postDesc, setPostDesc] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    // Email regex pattern for basic validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateName = (name: string) => {
    // Name regex pattern to check for numbers
    const namePattern = /^[a-zA-Z\s]*$/;
    return namePattern.test(name);
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate email
      if (!validateEmail(userEmail)) {
        setEmailError('Please enter a valid email.');
        return;
      }

      // Validate name
      if (!validateName(userName)) {
        alert('Please enter a valid name without numbers.');
        return;
      }
      const formattedDateTime = format(new Date(), dateTimeFormat);


      const postData = {
        desc: postDesc,
        createdAt: formattedDateTime,
        user: {
          name: userName,
          email: userEmail,
        },
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);
      console.log('Document written with ID: ', docRef.id);
      setPostDesc('');
      setUserName('');
      setUserEmail('');
      setEmailError('');
      // Show success dialogue
    // window.alert('Post added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <section className='grid grid-cols-12 overflow-hidden'>
      <aside className='md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto'>
        <Accordion type='single' collapsible defaultValue='item-0'>
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className='border-b border-lines px-5 py-2.5 text-left' data-umami-event='accordion-guest-book'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='mt-5 space-y-1'>
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink key={j} href={listItem.href} startWith='/about'>
                          <span className='shrink-0'>{listItem.icon}</span>
                          {listItem.title}
                        </AsideLink>
                      </Suspense>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto'>
        <FadeIn className='p-5 space-y-2'>
          <form onSubmit={handleAddPost} className='col-span-full flex flex-col md:flex-row items-center gap-x-2.5'>
            {/* Add input fields for user's name and email */}
            <Input
              name='userName'
              id='userName'
              placeholder='Your Name'
              aria-labelledby='userName'
              required
              className='flex-1 mb-2 md:mb-0'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type='email'
              name='userEmail'
              id='userEmail'
              placeholder='Your Email'
              aria-labelledby='userEmail'
              required
              className='flex-1 mb-2 md:mb-0'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Input
              name='desc'
              id='desc'
              placeholder='Share your thoughts...'
              aria-labelledby='desc'
              required
              className='flex-1'
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
            />
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 md:mt-0'>
              Send Message
            </button>
          </form>
          {/* Email error message */}
          {emailError && <div className='text-red-500'>{emailError}</div>}
          {/* Main content area */}
          {children}
        </FadeIn>
      </section>
    </section>
  );
}

const data = [
  {
    title: 'Contacts',
    list: [
      {
        title: 'Email',
        href: 'mailto:radhikabhoyarbusiness@gmail.com',
        icon: <FaRegEnvelope className='w-4 h-4' />,
      },
      // {
      //   title: 'Telegram',
      //   href: 'https://wa.me/+62',
      //   icon: <BsTelegram className='w-4 h-4' />,
      // },
      {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/radhika-bhoyar-a65220201/',
        icon: <BsLinkedin className='w-4 h-4' />,
      },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/code_raad/',
        icon: <BsInstagram className='w-4 h-4' />,
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/RadhikaBhoyar',
        icon: <BsTwitterX className='w-4 h-4' />,
      },
      {
        title: 'YouTube',
        href: 'https://www.youtube.com/channel/UC4xwuoUx8T-IDcjgmVsm-bw',
        icon: <BsYoutube className='w-4 h-4' />,
      }
    ],
  },
];
