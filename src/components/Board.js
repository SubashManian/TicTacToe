import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { COLORS } from '../constants/theme';

export default function Board({ board, onCellPress, winLine, gameOver }) {
  return (
    <View style={styles.board}>
      {/* Grid lines */}
      <View style={styles.gridV1} />
      <View style={styles.gridV2} />
      <View style={styles.gridH1} />
      <View style={styles.gridH2} />

      {/* Cells */}
      <View style={styles.cellsContainer}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onPress={() => onCellPress(index)}
            isWinCell={winLine ? winLine.includes(index) : false}
            disabled={gameOver}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    paddingHorizontal: 4,
  },
  cellsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  // Decorative grid lines behind cells
  gridV1: {
    position: 'absolute',
    left: '35%',
    top: '4%',
    bottom: '4%',
    width: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  gridV2: {
    position: 'absolute',
    right: '35%',
    top: '4%',
    bottom: '4%',
    width: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  gridH1: {
    position: 'absolute',
    top: '35%',
    left: '4%',
    right: '4%',
    height: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  gridH2: {
    position: 'absolute',
    bottom: '35%',
    left: '4%',
    right: '4%',
    height: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
});
