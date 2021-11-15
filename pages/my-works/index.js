import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import client from '../../instances/contentful';
import PageLayout from '../../components/PageLayout';
import FadeAwaySection from '../../components/FadeAwaySection';
import useIsPageClosing from '../../hooks/useIsPageClosing';

export default function MyWorks({ stories }) {
  const isPageClosing = useIsPageClosing();
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Hey, nice to meet ya!" />
        <meta property="og:image" content="/assets/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FadeAwaySection goAway={isPageClosing}>
        <LogosWrapper>
          {stories.items.map(
            (story) =>
              story.fields.logo && (
                <div key={story.sys.id}>
                  <Link href={`/my-works/${story.sys.id}`} passHref>
                    <a>
                      <LogoWrapper>
                        <Image
                          src={`https:${story.fields.logo.fields.file.url}`}
                          width="100"
                          height="100"
                          objectFit="contain"
                          alt={story.fields.title}
                        />
                      </LogoWrapper>
                    </a>
                  </Link>
                </div>
              ),
          )}
        </LogosWrapper>
      </FadeAwaySection>
    </>
  );
}

MyWorks.getLayout = (page) => <PageLayout>{page}</PageLayout>;

const LogosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 95%;
  margin: auto;
`;

const LogoWrapper = styled.div`
  height: 150px;
  width: 150px;
  background: #f6f6f6;
  border-radius: 32px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export async function getStaticProps() {
  const response = await client.getEntries({
    content_type: 'storie',
    include: 5,
  });

  return {
    props: {
      stories: response,
    },
  };
}
