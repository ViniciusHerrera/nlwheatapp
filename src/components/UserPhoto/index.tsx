import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import avatarImg from "../../assets/avatar.png";
import { COLORS } from "../../theme";

import { styles } from "./styles";

//Utilizado para definir os tamanhos das images
const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42
  }
}

// Busca a URI da imagem que foi importada
const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

type Props = {
  imageUri: string | undefined;
  sizes?: 'SMALL' | 'NORMAL';
}

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: Props) {
  // Utiliza nossa constante de tamanho e pega os dados desistruturado
  const { containerSize, avatarSize } = SIZES[sizes];

  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        }
      ]}
    >
      <Image
        source={{ uri: imageUri || AVATAR_DEFAULT }} // Ou carrega a URI passada ou a default
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }
        ]}
      />
    </LinearGradient>

  );
}