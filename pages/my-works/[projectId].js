import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { BLOCKS, MARKS, INLINE } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import client from '../../instances/contentful';
import PageLayout from '../../components/PageLayout';
import useIsPageClosing from '../../hooks/useIsPageClosing';
import FadeAwaySection from '../../components/FadeAwaySection';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Card>
        <p>{children}</p>
      </Card>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
      <FullWidthImageWrapper>
        <FullWidthImage layout="fill" alt="" src={`https:${node.data.target.fields.file.url}`} />
      </FullWidthImageWrapper>
    ),
  },
};

export default function Project({ story }) {
  return (
    <>
      <Head>
        <title>{story.title}</title>
        <meta name="description" content="Hey, nice to meet ya!" />
        <meta property="og:image" content="/assets/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FadeAwaySection>
        <Title>{story.title}</Title>
        <div>{documentToReactComponents(story.post, options)}</div>
      </FadeAwaySection>
    </>
  );
}

Project.getLayout = (page) => <PageLayout goBackInstead>{page}</PageLayout>;

const Title = styled.h1`
  font-size: 72px;
  color: #a247cc;
  margin: 0 16px;
  line-height: 72px;
`;

const FullWidthImageWrapper = styled.div`
  width: calc(100% - 32px);
  margin: 16px;
  border-radius: 32px;
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

const Card = styled.div`
  background: #f6f6f6;
  border-radius: 32px;
  padding: 32px;
  margin: 16px;
`;

export async function getStaticProps(context) {
  const response = await client.getEntry(context.params.projectId);

  return {
    props: {
      story: response.fields,
    },
  };
}

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'storie',
    include: 5,
  });

  const paths = response.items.map((item) => ({ params: { projectId: item.sys.id } }));

  return {
    paths,
    fallback: false,
  };
}
