import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import Text from '#components/Text';

interface InformationI {
  createdAt: Date;
  size: number;
  width: number;
  height: number;
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 30px;
  width: 300px;
  position: relative;
`;

const InnerContainer = styled.div`
  border: ${({ theme }) => `3px solid ${theme.colors.primary}`};
  padding: 20px;
  z-index: 1;
  position: relative;
`;

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 100%;
  z-index: -1;
`;

const Flex = styled.div`
  display: flex;
`;

const formatBytes = (a: number, b = 2) => {
  if (a === 0) return '0 Bytes'; const c = b < 0 ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / 1024 ** d).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
};

const Information = ({
  createdAt,
  size,
  width,
  height,
}: InformationI) => (
  <Container>
    <InnerContainer>
      <Flex>
        <Text>
          Upload the
        </Text>
        <Text
          color='primary'
          fontWeight='bold'
          styles={{
            marginLeft: 5,
          }}
        >
          {` ${moment(createdAt).format('MMMM Do YYYY')}`}
        </Text>
      </Flex>
      <Flex>
        <Text>
          Weight:
        </Text>
        <Text
          color='primary'
          fontWeight='bold'
          styles={{
            marginLeft: 5,
          }}
        >
          {formatBytes(size)}
        </Text>
      </Flex>
      <Flex>
        <Text>
            Size:
        </Text>
        <Text
          color='primary'
          fontWeight='bold'
          styles={{
            marginLeft: 5,
          }}
        >
          {` ${width} x ${height}`}
        </Text>
      </Flex>
    </InnerContainer>
    <Background />
  </Container>
);

export default Information;
