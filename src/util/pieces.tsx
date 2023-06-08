"use client"

import { ReactNode } from "react"
import Image from "next/image"

type CustomPieceFnArgs = {
  squareWidth: number
  isDragging: boolean
}

type CustomPieceFn = (args: CustomPieceFnArgs) => ReactNode

type CustomPieces = {
  [key: string]: CustomPieceFn
}

const isSafari = (userAgent: string): boolean => {
  const ua = userAgent.toLowerCase()
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1
}

const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"]

export const buildCustomPieces = (userAgent: string): CustomPieces => {
  if (isSafari(userAgent)) {
    return pieces.reduce((acc, p) => {
      acc[p] = ({ squareWidth }): ReactNode => (
        <Image
          priority
          width={squareWidth}
          height={squareWidth}
          src={`/pieces/qootee/png/${p}.png`}
          alt={`piece ${p}`}
        />
      )
      return acc
    }, {} as CustomPieces)
  }

  return pieces.reduce((acc, p) => {
    acc[p] = ({ squareWidth }): ReactNode => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/pieces/qootee/png/${p}.png)`,
          backgroundSize: "100%"
        }}
      />
    )
    return acc
  }, {} as CustomPieces)
}
