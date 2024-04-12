'use client'
import { GuestBookRow } from '@/components/molecules/guest-book-card';
import { db } from '@/lib/firebase'; // Import your Firebase db instance
import { QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface PostData {
  id: string;
  createdAt: Date;
  desc: string;
  user: { name: string };
}

export default function GuestBooks() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postList: PostData[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          postList.push({ id: doc.id, ...data } as PostData);
        });
        setPosts(postList);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <article className='divide-y lg:divide-y-0'>
      {posts.map((data) => (
        <GuestBookRow data={data} key={data.id} />
      ))}
    </article>
  );
}
