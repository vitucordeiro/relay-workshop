import React from 'react';

import { usePreloadedQuery , graphql } from 'react-relay';


import { Text } from 'rebass';

import { Card, Content, BackButton } from '@workshop/ui';

import Post from './Post.tsx';
import { PostDetailQuery } from './__generated__/PostDetailQuery.graphql';


const PostDetail = () => {
  // get data preloaded in router
  const loadedData = {}

  const data = usePreloadedQuery<PostDetailQuery>(
    graphql`
      query PostDetailQuery($id: ID!) {
        post: node(id: $id) {
          ...Post_post
        }
        me {
          ...Post_me
        }
      }
    `,
    loadedData.postDetailQuery,
  );

  const { post, me } = data;

  if (!post) {
    return (
      <Content>
        <Card p='20px' flex={1} alignItems='center' justifyContent='center'>
          <Text>Post not found</Text>
        </Card>
      </Content>
    );
  }

  return (
    <Content>
      <BackButton />
      <Post post={data.post} me={me} isDetail={true} />
    </Content>
  );
};

export default PostDetail;
