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
                  <Link href={`/my-works/${story.sys.id}`} prefetch={false} passHref>
                    <a>
                      <LogoWrapper>
                        <FullWidthImageWrapper>
                          <FullWidthImage
                            layout="fill"
                            alt={story.fields.title}
                            src={`https:${story.fields.logo.fields.file.url}`}
                          />
                        </FullWidthImageWrapper>
                        {/* <Image
                          src={`https:${story.fields.logo.fields.file.url}`}
                          width="100"
                          height="100"
                          objectFit="contain"
                          alt={story.fields.title}
                        /> */}
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

const FullWidthImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  & > div {
    position: unset !important;
  }
`;

const FullWidthImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

const LogosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 95%;
  margin: auto;
  justify-content: center;
  align-content: center;
  min-height: calc(100vh - 144px);
`;

const LogoWrapper = styled.div`
  height: 150px;
  width: 150px;
  background: #f6f6f6;
  border-radius: 32px;
  position: relative;
  display: flex;
  padding: 32px;
  justify-content: center;
  align-items: center;
  @media (max-width: 960px) {
    padding: 16px;
    height: 100px;
    width: 100px;
  }
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
