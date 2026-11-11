import { Suspense } from 'react';

import Feed from '@/components/feed/Feed';

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-[468px] py-6">
      <Suspense>
        <Feed />
      </Suspense>
    </section>
  );
}
