'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion';
import { AsideLink } from '@/components/atoms/aside-link';
import { FadeIn } from '@/components/atoms/fade-in';
import { Input } from '@/components/atoms/input';
import { db } from '@/lib/firebase'; // Import your Firebase db instance
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { BsInstagram, BsLinkedin, BsWhatsapp } from 'react-icons/bs';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbBrandUpwork } from 'react-icons/tb';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const [postDesc, setPostDesc] = useState('');

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Dummy user data for now, replace with actual user data logic
      const dummyUserId = '1';
      const dummyUserName = 'John Doe';
      const dummyUserEmail = 'johndoe@example.com';

      const postData = {
        desc: postDesc,
        createdAt: serverTimestamp(),
        user: {
          id: dummyUserId,
          name: dummyUserName,
          email: dummyUserEmail,
        },
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);
      console.log('Document written with ID: ', docRef.id);
      setPostDesc('');
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
                {item.list.map((listItem, j) => (
                  <AsideLink key={j} href={listItem.href} startWith='/about'>
                    <span className='shrink-0'>{listItem.icon}</span>
                    {listItem.title}
                  </AsideLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* Contacts section rendered in the sidebar */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {data[0].list.map((contactItem, index) => (
            <a key={index} href={contactItem.href} className='flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md'>
              {contactItem.icon}
              <span>{contactItem.title}</span>
            </a>
          ))}
        </div>
      </aside>
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto'>
        <FadeIn className='p-5 space-y-2'>
          <form onSubmit={handleAddPost} className='col-span-full flex items-center justify-between gap-x-2.5'>
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
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
              Send Message
            </button>
          </form>
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
        href: 'mailto:wwicaksono96@gmail.com',
        icon: <FaRegEnvelope className='w-4 h-4' />,
      },
      {
        title: 'Upwork',
        href: 'https://www.upwork.com/freelancers/~01df34d78e05fa69bf',
        icon: <TbBrandUpwork className='w-4 h-4' />,
      },
      {
        title: 'WhatsApp',
        href: 'https://wa.me/+6287885002327',
        icon: <BsWhatsapp className='w-4 h-4' />,
      },
      {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/wiscaksono/',
        icon: <BsLinkedin className='w-4 h-4' />,
      },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/amach',
        icon: <BsInstagram className='w-4 h-4' />,
      },
    ],
  },
];
