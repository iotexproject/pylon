import CheckCircleTwoTone from "@ant-design/icons/CheckCircleTwoTone";
import CloseCircleTwoTone from "@ant-design/icons/CloseCircleTwoTone";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Row from "antd/lib/grid/row";
import Layout from "antd/lib/layout";
import gql from "graphql-tag";
import { assetURL } from "onefx/lib/asset-url";
import { styled } from "onefx/lib/styletron-react";
import React, { PureComponent } from "react";
import { Query, QueryResult } from "react-apollo";
import { t } from "onefx/lib/iso-i18n";
import { colors } from "../common/styles/style-color";
import { ContentPadding } from "../common/styles/style-padding";
import { getAntenna } from "../common/antenna";
import { Flex } from "../common/flex";
import { CommonMargin } from "../common/common-margin";

const GET_HEALTH = gql`
  {
    health
  }
`;

type State = {
  address: string;
};

export class Home extends PureComponent<unknown, State> {
  componentDidMount(): void {
    const acct = getAntenna().iotx.accounts.create(new Date().toString());
    this.setState({
      address: acct.address
    });
  }

  state: State = {
    address: ""
  };

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

          <Row justify="center">
            {!this.state.address && <LoadingOutlined />}
            {this.state.address && (
              <Flex column={true}>
                <div>{t("home.account")}</div>
                <div>
                  <pre>{this.state.address}</pre>
                </div>
              </Flex>
            )}
          </Row>
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