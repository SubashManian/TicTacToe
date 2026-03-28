import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import useGameLogic from '../hooks/useGameLogic';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import GameStatus from '../components/GameStatus';

export default function GameScreen() {
  const {
    board,
    currentPlayer,
    result,
    scores,
    handlePress,
    resetGame,
    resetAll,
  } = useGameLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <Text style={styles.title}>TIC{'\n'}TAC{'\n'}TOE</Text>
          <Text style={styles.subtitle}>ZERO • ONE • TWO • THREE</Text>
        </View>

        {/* Scoreboard */}
        <Scoreboard
          scores={scores}
          currentPlayer={currentPlayer}
          result={result}
        />

        {/* Game Status */}
        <GameStatus result={result} currentPlayer={currentPlayer} />

        {/* Board */}
        <View style={styles.boardWrapper}>
          <Board
            board={board}
            onCellPress={handlePress}
            winLine={result?.line}
            gameOver={!!result}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={resetGame}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>
              {result ? '▶  PLAY AGAIN' : '↺  RESET'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnSecondary]}
            onPress={resetAll}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSecondaryText}>CLEAR SCORES</Text>
          </TouchableOpacity>
        </View>

        {/* Footer decoration */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>● ● ●</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  // Header
  header: {
    marginBottom: SPACING.xxl,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    left: -SPACING.lg,
    top: 8,
    width: 4,
    height: 70,
    backgroundColor: COLORS.neon,
    borderRadius: 2,
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
    fontFamily: 'monospace',
    color: COLORS.textPrimary,
    lineHeight: 52,
    letterSpacing: -2,
    marginLeft: SPACING.md,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.textSecondary,
    letterSpacing: 3,
    marginTop: SPACING.sm,
    marginLeft: SPACING.md,
    fontFamily: 'monospace',
  },

  // Board
  boardWrapper: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
    shadowColor: COLORS.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },

  // Buttons
  actions: {
    gap: SPACING.sm,
  },
  btn: {
    borderRadius: 14,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: COLORS.neon,
    shadowColor: COLORS.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  btnPrimaryText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 3,
    fontFamily: 'monospace',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    fontFamily: 'monospace',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    color: COLORS.textMuted,
    letterSpacing: 6,
    fontSize: 10,
  },
});
