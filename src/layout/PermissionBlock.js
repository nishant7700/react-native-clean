import React from "react";

import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Block, Button, Icon, Input, Checkbox, Switch } from "galio-framework";
import { COLORS } from "../theme";
const { width, height } = Dimensions.get("screen");
const PermissionBlock = ({
  title,
  setFieldValue,
  permission_object,
  permission_name,
  isDelete,
  disabled,
}) => {
  return (
    <Block style={{ paddingVertical: 5 }}>
      <Block
        row
        middle
        style={{
          justifyContent: "space-between",
          paddingVertical: 5,
        }}
      >
        <Block>
          <Text
            style={{
              color: "#fff",
              paddingBottom: 5,
              fontFamily: COLORS.NORMAL_FONT,
              textTransform: "capitalize",
            }}
          >
            {title}
          </Text>
        </Block>
        {!disabled && (
          <Block row middle>
            <Block>
              <Switch
                color={COLORS.PRIMARY_COLOR}
                onChange={() => {
                  setFieldValue(
                    `permission.${permission_name}.add`,
                    !permission_object.add
                  );
                  isDelete
                    ? setFieldValue(
                        `permission.${permission_name}.delete`,
                        !permission_object.add
                      )
                    : setFieldValue(
                        `permission.${permission_name}.edit`,
                        !permission_object.add
                      );
                  setFieldValue(
                    `permission.${permission_name}.view`,
                    !permission_object.add
                  );
                }}
              />
            </Block>
            <Block>
              <Text style={{ color: "#fff" }}> All </Text>
            </Block>
          </Block>
        )}
      </Block>
      <Block row style={{ justifyContent: "space-between" }}>
        <Block row middle>
          <Block style={{ paddingVertical: 5 }}>
            <Switch
              color="info"
              value={permission_object.add}
              onChange={() =>
                setFieldValue(
                  `permission.${permission_name}.add`,
                  !permission_object.add
                )
              }
              disabled={disabled}
            />
          </Block>
          <Block>
            <Text style={{ color: "#fff" }}> Add </Text>
          </Block>
        </Block>
        <Block row middle>
          <Block style={{ paddingVertical: 5 }}>
            <Switch
              color="info"
              value={permission_object.view}
              onChange={() =>
                setFieldValue(
                  `permission.${permission_name}.view`,
                  !permission_object.view
                )
              }
              disabled={disabled}
            />
          </Block>
          <Block>
            <Text style={{ color: "#fff" }}> View </Text>
          </Block>
        </Block>
        <Block row middle>
          <Block style={{ paddingVertical: 5 }}>
            <Switch
              color="info"
              value={
                isDelete ? permission_object.delete : permission_object.edit
              }
              label="edit"
              onChange={() => {
                isDelete
                  ? setFieldValue(
                      `permission.${permission_name}.delete`,
                      !permission_object.delete
                    )
                  : setFieldValue(
                      `permission.${permission_name}.edit`,
                      !permission_object.edit
                    );
              }}
              disabled={disabled}
            />
          </Block>
          <Block>
            <Text style={{ color: "#fff" }}>
              {" "}
              {isDelete ? "Delete" : "Edit"}{" "}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PermissionBlock;
