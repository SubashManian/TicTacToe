import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function GameStatus({ result, currentPlayer }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(20);
    opacityAnim.setValue(0);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (!result) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [result, currentPlayer]);

  let statusText = '';
  let statusColor = COLORS.textPrimary;
  let subText = '';

  if (result) {
    if (result.winner === 'draw') {
      statusText = "DRAW";
      statusColor = COLORS.drawColor;
      subText = "no one wins this round";
    } else {
      statusText = `${result.winner} WINS`;
      statusColor = result.winner === 'X' ? COLORS.neon : COLORS.plasma;
      subText = "glorious victory";
    }
  } else {
    statusText = `${currentPlayer}'S TURN`;
    statusColor = currentPlayer === 'X' ? COLORS.neon : COLORS.plasma;
    subText = "make your move";
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          borderColor: statusColor,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.statusText,
          { color: statusColor, opacity: result ? 1 : pulseAnim },
        ]}
      >
        {statusText}
      </Animated.Text>
      <Text style={styles.subText}>{subText}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceElevated,
    marginHorizontal: SPACING.md,
  },
  statusText: {
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 4,
  },
  subText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginTop: 4,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
});
