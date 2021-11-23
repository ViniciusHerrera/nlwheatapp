import React from "react";
import { View } from "react-native";
import { useAuth } from "../../hooks/auth";

import { Button } from "../Button";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function SignInBox() {
  const { signIn, isSigning } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        icon="github"
        title="ENTRAR COM GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        onPress={signIn}
        isLoading={isSigning}
      />
    </View>
  );
}