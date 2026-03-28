import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

function ScoreCard({ label, score, color, isActive }) {
  return (
    <View style={[styles.card, isActive && { borderColor: color, borderWidth: 2 }]}>
      <Text style={[styles.playerLabel, { color }]}>{label}</Text>
      <Text style={[styles.score, { color }]}>{score}</Text>
    </View>
  );
}

export default function Scoreboard({ scores, currentPlayer, result }) {
  return (
    <View style={styles.container}>
      <ScoreCard
        label="X"
        score={scores.X}
        color={COLORS.neon}
        isActive={!result && currentPlayer === 'X'}
      />
      <View style={styles.divider}>
        <Text style={styles.drawLabel}>DRAW</Text>
        <Text style={styles.drawScore}>{scores.draw}</Text>
      </View>
      <ScoreCard
        label="O"
        score={scores.O}
        color={COLORS.plasma}
        isActive={!result && currentPlayer === 'O'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 16,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  playerLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    fontFamily: 'monospace',
    opacity: 0.8,
    marginBottom: 4,
  },
  score: {
    fontSize: 36,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  divider: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  drawLabel: {
    fontSize: 9,
    color: COLORS.textSecondary,
    letterSpacing: 2,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  drawScore: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: COLORS.drawColor,
  },
});
