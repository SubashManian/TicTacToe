import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function Cell({ value, onPress, isWinCell, disabled }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 120,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [value]);

  useEffect(() => {
    if (isWinCell) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isWinCell]);

  const isX = value === 'X';
  const isO = value === 'O';

  const cellColor = isX ? COLORS.neon : isO ? COLORS.plasma : 'transparent';
  const cellGlow = isX ? COLORS.neonGlow : isO ? COLORS.plasmaGlow : 'transparent';
  const cellBg = isX ? COLORS.neonSoft : isO ? COLORS.plasmaSoft : 'transparent';

  const winBorderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.gold, '#fff8c0'],
  });

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isWinCell && styles.winCell,
        { backgroundColor: value ? cellBg : 'transparent' },
      ]}
      onPress={onPress}
      disabled={disabled || !!value}
      activeOpacity={0.7}
    >
      {isWinCell && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.winGlow,
            { opacity: glowAnim },
          ]}
        />
      )}
      {value && (
        <Animated.Text
          style={[
            styles.symbol,
            { color: cellColor, transform: [{ scale: scaleAnim }] },
            isWinCell && styles.winSymbol,
          ]}
        >
          {value}
        </Animated.Text>
      )}
      {!value && !disabled && (
        <View style={styles.emptyDot} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceElevated,
    overflow: 'hidden',
  },
  winCell: {
    borderColor: COLORS.gold,
    borderWidth: 2,
  },
  winGlow: {
    backgroundColor: COLORS.goldGlow,
    borderRadius: 14,
  },
  symbol: {
    fontSize: 44,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: -2,
  },
  winSymbol: {
    color: COLORS.gold,
  },
  emptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    opacity: 0.4,
  },
});
