import styled from "styled-components";
import { THEME } from "../theme";

export const H1 = styled.Text`
  font-size: 22px;
  font-family: ${(props) =>
    props.sub_heading ? THEME.SUBHEADING_FONT : THEME.HEADING_FONT};
`;
export const H2 = styled.Text`
  font-size: 20px;
  font-family: ${(props) =>
    props.sub_heading ? THEME.SUBHEADING_FONT : THEME.HEADING_FONT};
`;
export const H3 = styled.Text`
  font-size: 18px;
  font-family: ${(props) =>
    props.sub_heading ? THEME.SUBHEADING_FONT : THEME.HEADING_FONT};
`;
export const H4 = styled.Text`
  font-size: 16px;
  font-family: ${(props) =>
    props.sub_heading ? THEME.SUBHEADING_FONT : THEME.HEADING_FONT};
`;
export const P = styled.Text`
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) =>
    props.sub_heading
      ? THEME.SUBHEADING_FONT
      : props.heading
      ? THEME.HEADING_FONT
      : THEME.PARAGRAPH_FONT};
  color: ${(props) => (props.color ? props.color : THEME.PARAGRAPH_COLOR)};
`;

export const Container = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
`;
export const Row = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Col1 = styled.View`
  flex: 0 0 8.333333%;
  max-width: 8.333333%;
`;
export const Col2 = styled.View`
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
`;
export const Col3 = styled.View`
  flex: 0 0 25%;
  max-width: 25%;
`;
export const Col4 = styled.View`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
`;
export const Col5 = styled.View`
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
`;
export const Col6 = styled.View`
  flex: 0 0 50%;
  max-width: 50%;
`;
export const Col7 = styled.View`
  flex: 0 0 58.333333%;
  max-width: 58.333333%;
`;
export const Col8 = styled.View`
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
`;
export const Col9 = styled.View`
  flex: 0 0 75%;
  max-width: 75%;
`;
export const Col10 = styled.View`
  flex: 0 0 83.333333%;
  max-width: 83.333333%;
`;
export const Col11 = styled.View`
  flex: 0 0 91.666667%;
  max-width: 91.666667%;
`;
export const Col12 = styled.View`
  flex: 0 0 100%;
  max-width: 100%;
`;
export const Card = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  border-radius: 5px;
  margin: 5px;
`;
export const CardBody = styled.View`
  flex: 1 1 auto;
  padding: 10px 10px;
`;
export const CardTitle = styled.View`
  margin-bottom: 10px;
`;
export const Btn = styled.Text`
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  background-color: ${(props) =>
    props.primary
      ? THEME.PRIMARY_COLOR
      : props.secondary
      ? THEME.SECONDARY_COLOR
      : props.success
      ? THEME.SUCCESS_COLOR
      : props.danger
      ? THEME.DANGER_COLOR
      : props.warning
      ? THEME.WARNING_COLOR
      : props.background
      ? props.background
      : "transparent"};
  color: ${(props) =>
    props.textWhite ? "#fff" : props.color ? props.color : "#000"};
  border: 1px solid transparent;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  width: ${(props) => (props.width ? props.width : "100%")};
`;
export const FullImage = styled.Image`
  max-width: 100%;
  height: ${(props) => (props.height ? props.height : "100px")};
`;
