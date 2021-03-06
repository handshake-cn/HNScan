import React from "react";
import styled from "styled-components";
import {
  Card,
  Flex,
  Col,
  Row,
  Spacer,
  Text,
  breakpoint,
  EmptyState
} from "@urkellabs/ucl";
import { useTranslation, Trans } from "react-i18next";
import { useHistory } from "react-router-dom";

// Components
import Link from "components/Link";

// SVGs
import BlockLogo from "components/svg/Block";

// Util
import { truncateHash, timeAgo } from "utils/util";

let BlockIcon = styled(BlockLogo)`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

let Time = styled(Flex)`
  ${breakpoint.tablet} {
    justify-content: flex-end;
  }
`;

const BlockCardItem = ({ block }) => {
  return (
    <Row>
      <Spacer px={10} />
      <Col mobile={12} tablet>
        <Flex columns>
          <Flex>
            <BlockIcon />
            <Text small>
              <Trans i18nKey="home.block_num" values={{ height: block.height }}>
                <Link to={"/block/" + block.height}></Link>
              </Trans>
            </Text>
          </Flex>
          <Flex>
            <Text small>
              <Trans
                i18nKey="home.mined_by"
                values={{ miner: truncateHash(block.miner) }}
              >
                <Link to={"/address/" + block.miner}>
                  {/* @todo check pool */}
                </Link>
              </Trans>
            </Text>
          </Flex>
          <Text small>
            <Trans i18nKey="home.transactions" values={{ tx_num: block.txs }} />
          </Text>
        </Flex>
      </Col>
      <Col mobile={12} tablet>
        <Time>
          <Text small bold>
            {timeAgo(block.time)}
          </Text>
        </Time>
      </Col>
      <Spacer px={10} />
    </Row>
  );
};

export default function RecentBlocks({ blocks }) {
  const { t } = useTranslation();
  let history = useHistory();

  if (blocks.length === 0) {
    return (
      <Card title={t("home.recent_transactions")}>
        <EmptyState
          header="No Blocks yet"
          icon={<BlockLogo />}
          action={() => {
            history.push("/status");
          }}
          actionTitle="Check Node Status"
        />
      </Card>
    );
  }
  const blockRows = blocks.map((block, index) => (
    <BlockCardItem key={index} block={block} />
  ));
  return (
    <Card
      title={t("home.recent_blocks")}
      headerAction={<Link to="/blocks">See More</Link>}
    >
      {blockRows}
    </Card>
  );
}
