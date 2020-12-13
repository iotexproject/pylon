import CheckCircleTwoTone from "@ant-design/icons/CheckCircleTwoTone";
import CloseCircleTwoTone from "@ant-design/icons/CloseCircleTwoTone";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Row from "antd/lib/grid/row";
import Layout from "antd/lib/layout";
import gql from "graphql-tag";
import { assetURL } from "onefx/lib/asset-url";
import { styled } from "onefx/lib/styletron-react";
import React, { PureComponent, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { t } from "onefx/lib/iso-i18n";
import Button from "antd/lib/button";
import sleepPromise from "sleep-promise";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";
import { colors } from "../common/styles/style-color";
import { ContentPadding } from "../common/styles/style-padding";
import { getAntenna } from "../common/antenna";
import { CommonMargin } from "../common/common-margin";
import { getContract } from "../../contract";
import { IopayRequired } from "../common/iopay-required";
import { Flex } from "../common/flex";

const GET_HEALTH = gql`
  {
    health
  }
`;

const CallContract = IopayRequired(function CallContract(): JSX.Element {
  const [result, setResult] = useState("-");
  const [balance, setBalance] = useState("-");
  const [gamesPlayed, setGamesPlayed] = useState("-");

  const onClick = async (hand: number) => {
    await getContract().methods.bet(hand, {
      amount: toRau("1", "IOTX"),
      account: getAntenna().iotx.accounts[0],
      gasLimit: "300000",
      gasPrice: "1000000000000"
    });
    await sleepPromise(5000);
    const r = await getContract().methods.lastResult({
      account: getAntenna().iotx.accounts[0],
      gasLimit: "300000",
      gasPrice: "1000000000000"
    });

    const b = await getContract().methods.balance({
      account: getAntenna().iotx.accounts[0],
      gasLimit: "300000",
      gasPrice: "1000000000000"
    });
    const g = await getContract().methods.gamesPlayed({
      account: getAntenna().iotx.accounts[0],
      gasLimit: "300000",
      gasPrice: "1000000000000"
    });
    setResult(r);
    setBalance(fromRau(b, "Iotx"));
    setGamesPlayed(g);
  };
  return (
    <>
      <Flex column={true}>
        <div>Play rock paper scissors with a smart contract</div>
        <div>Result: {result}</div>
        <div>Balance: {balance}</div>
        <div>Games Played: {gamesPlayed}</div>
      </Flex>

      <Flex column={true}>
        Choose your hand...
        <Flex>
          <Button onClick={() => onClick(0)}>Rock</Button>
          <CommonMargin />
          <Button onClick={() => onClick(1)}>Paper</Button>
          <CommonMargin />
          <Button onClick={() => onClick(2)}>Scissors</Button>
        </Flex>
      </Flex>
    </>
  );
});

export class Home extends PureComponent {
  public render = (): JSX.Element => (
    <ContentPadding>
      <Layout>
        <Layout.Content style={{ backgroundColor: "#fff", padding: "32px" }}>
          <Row justify="center">
            <OneFxIcon src={assetURL("favicon.png")} />
          </Row>
          <Row justify="center">
            <Title>{t("meta.title")}</Title>
          </Row>
          <Row justify="center">
            <p>{t("meta.description")}</p>
          </Row>
          <Row justify="center">
            <a
              href="/api-gateway/"
              rel="noreferrer nofollow noopener"
              target="_blank"
            >
              GraphQL Endpoint
            </a>
          </Row>
          <Row justify="center">
            <Query query={GET_HEALTH}>
              {({ loading, error, data }: QueryResult<{ health: string }>) => {
                if (loading) {
                  return (
                    <div>
                      <LoadingOutlined /> Checking Status
                    </div>
                  );
                }
                if (error) {
                  return (
                    <div>
                      <CloseCircleTwoTone twoToneColor={colors.error} /> Not OK
                    </div>
                  );
                }

                return (
                  <div>
                    <CheckCircleTwoTone twoToneColor={colors.success} />{" "}
                    {data && data.health}
                  </div>
                );
              }}
            </Query>
          </Row>

          <CommonMargin />

          <CallContract />
        </Layout.Content>
      </Layout>
    </ContentPadding>
  );
}

const OneFxIcon = styled("img", {
  width: "150px",
  height: "150px",
  boxSizing: "border-box",
  border: "5px white solid",
  borderRadius: "50%",
  overflow: "hidden",
  boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
  transform: "translatey(0px)",
  animation: "float 6s ease-in-out infinite"
});

const Title = styled("h1", {
  color: colors.secondary,
  margin: "16px"
});
