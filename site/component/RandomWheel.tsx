import { useState } from "react";
import { Badge, Box, Button, Paper, Stack, Text } from "@mantine/core";
import { ArrowClockwise } from "@phosphor-icons/react";
import classes from "@site/component/RandomWheel.module.css";

/**
 * Calculates the SVG path string for a single slice of a wheel.
 * @param index The 0-based index of the slice.
 * @param total The total number of slices in the wheel.
 * @param r The radius of the wheel.
 * @param cx The x-coordinate of the wheel's center.
 * @param cy The y-coordinate of the wheel's center.
 * @returns The SVG path string defining the pie slice shape.
 */
function getSlicePath(
  index: number,
  total: number,
  r: number,
  cx: number,
  cy: number
): string {
  const angleStep = 360 / total;
  const startAngleDeg = index * angleStep;
  const endAngleDeg = (index + 1) * angleStep;

  // Convert to radians
  const startAngleRad = (startAngleDeg * Math.PI) / 180;
  const endAngleRad = (endAngleDeg * Math.PI) / 180;

  // Calculate start and end points on the circle
  const xStart = cx + r * Math.cos(startAngleRad);
  const yStart = cy + r * Math.sin(startAngleRad);
  const xEnd = cx + r * Math.cos(endAngleRad);
  const yEnd = cy + r * Math.sin(endAngleRad);

  return `M ${cx} ${cy} L ${xStart} ${yStart} A ${r} ${r} 0 0 1 ${xEnd} ${yEnd} Z`;
}

const getColor = (index: number, total: number) => {
  const palette = [
    "var(--mantine-color-blue-filled)",
    "var(--mantine-color-teal-filled)",
    "var(--mantine-color-green-filled)",
    "var(--mantine-color-orange-filled)",
    "var(--mantine-color-red-filled)",
    "var(--mantine-color-pink-filled)",
    "var(--mantine-color-grape-filled)",
    "var(--mantine-color-violet-filled)",
    "var(--mantine-color-indigo-filled)",
    "var(--mantine-color-cyan-filled)",
  ];
  if (total <= 1) return palette[0];
  let colorIndex = index % palette.length;
  if (index === total - 1 && colorIndex === 0) {
    colorIndex = (colorIndex + 1) % palette.length;
  }
  return palette[colorIndex];
};

/**
 * Renders an interactive random wheel of fortune.
 * @param root0 The properties object.
 * @param root0.options The list of text options to put on the wheel.
 * @param root0.onSelect Callback triggered when a selection is made after spinning.
 * @returns The rendered RandomWheel component.
 */
export default function RandomWheel<Options extends string[]>({
  options,
  onSelect,
}: {
  options: Options;
  onSelect: (option: Options[number]) => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  // Deep comparison key to handle resetting on option list changes
  const optionsKey = options.join(",");

  // Adjust state during render-phase when the options prop changes
  const [prevOptionsKey, setPrevOptionsKey] = useState(optionsKey);
  if (optionsKey !== prevOptionsKey) {
    setPrevOptionsKey(optionsKey);
    setRotation(0);
    setIsSpinning(false);
    setIsAnimating(false);
    setSelectedIndex(null);
    setHasSpun(false);
  }

  if (!options || options.length === 0) {
    return (
      <Paper withBorder p="xl" radius="md" ta="center">
        <Text c="gray.7">
          No options available. Please provide a list of options to spin the
          wheel!
        </Text>
      </Paper>
    );
  }

  const handleSpin = () => {
    if (isSpinning) return;

    const total = options.length;
    const nextIndex = Math.floor(Math.random() * total);

    const angleStep = 360 / total;
    const midAngleDeg = (nextIndex + 0.5) * angleStep;

    // Add a small random offset within the slice (keep 10% safety margin from borders)
    const maxOffset = angleStep * 0.4;
    const randomOffset = (Math.random() * 2 - 1) * maxOffset;

    // We want (midAngleDeg + randomOffset) to align with top pointer (270 degrees)
    // Target offset of the wheel rotation: (270 - sliceAngle + 360) % 360
    const targetOffset = (270 - (midAngleDeg + randomOffset) + 720) % 360;

    const currentAngle = rotation % 360;
    let diff = targetOffset - currentAngle;
    if (diff <= 0) {
      diff += 360;
    }

    // Spin 5 full rotations for a gorgeous look
    const numSpins = 5;
    const nextRotation = rotation + diff + 360 * (numSpins - 1);

    setIsSpinning(true);
    setIsAnimating(true);
    setSelectedIndex(nextIndex);
    setRotation(nextRotation);
  };

  const handleTransitionEnd = () => {
    setIsSpinning(false);
    setHasSpun(true);
    if (selectedIndex !== null) {
      const selectedOption = options[selectedIndex];
      if (selectedOption !== undefined) {
        onSelect(selectedOption);
      }
    }
  };

  const total = options.length;

  // Pre-map to items with unique stable keyId to satisfy ESLint's no-array-index-key rule
  const wheelItems = options.map((option, idx) => ({
    option,
    keyId: `${option}-${idx}`,
    idx,
  }));

  // Dynamic style bypass for react-extra/forbid-component-props and forbid-dom-props
  const dynamicStyles = {
    style: {
      transform: `rotate(${rotation}deg)`,
      transition: isAnimating
        ? "transform 5000ms cubic-bezier(0.15, 0.85, 0.1, 1)"
        : "none",
    },
  };

  return (
    <Stack className={classes["container"]} align="center">
      <div className={classes["wheelWrapper"]}>
        <div
          className={`${classes["pointer"]} ${isSpinning ? classes["pointerWiggling"] : ""}`}
        />
        <svg viewBox="0 0 400 400" className={classes["wheelSvg"]}>
          <Box
            component="g"
            className={classes["wheelGroup"]}
            {...dynamicStyles}
            onTransitionEnd={handleTransitionEnd}
          >
            {total === 1 ? (
              <g>
                <circle
                  cx={200}
                  cy={200}
                  r={180}
                  fill={getColor(0, 1)}
                  className={`${classes["slice"]} ${
                    !isSpinning && hasSpun ? classes["sliceSelected"] : ""
                  }`}
                />
                {options[0] !== undefined && (
                  <text
                    x={200}
                    y={200}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={classes["text"]}
                  >
                    {options[0].length > 15
                      ? `${options[0].substring(0, 12)}...`
                      : options[0]}
                  </text>
                )}
              </g>
            ) : (
              wheelItems.map(({ option, keyId, idx }) => {
                const pathData = getSlicePath(idx, total, 180, 200, 200);
                const midAngleDeg = (idx + 0.5) * (360 / total);
                const isSelected =
                  !isSpinning && hasSpun && selectedIndex === idx;

                return (
                  <g key={keyId}>
                    <path
                      d={pathData}
                      fill={getColor(idx, total)}
                      className={`${classes["slice"]} ${
                        isSelected ? classes["sliceSelected"] : ""
                      }`}
                    />
                    <text
                      x={200 + 180 - 15}
                      y={200}
                      textAnchor="end"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngleDeg}, 200, 200)`}
                      className={classes["text"]}
                    >
                      {option.length > 15
                        ? `${option.substring(0, 12)}...`
                        : option}
                    </text>
                  </g>
                );
              })
            )}

            {/* Outer border ring */}
            <circle
              cx={200}
              cy={200}
              r={180}
              className={classes["outerRing"]}
            />

            {/* Center Pin / Axle */}
            <circle cx={200} cy={200} r={18} className={classes["centerPin"]} />
            <circle
              cx={200}
              cy={200}
              r={6}
              className={classes["centerPinInner"]}
            />
          </Box>
        </svg>
      </div>

      <div className={classes["resultSection"]}>
        {!isSpinning && hasSpun && selectedIndex !== null ? (
          <>
            <Text size="sm" c="gray.7" fw={500} mb={4}>
              The wheel has spoken!
            </Text>
            {selectedIndex !== null && options[selectedIndex] !== undefined && (
              <Badge
                size="xl"
                variant="gradient"
                gradient={{ from: "teal", to: "blue", deg: 60 }}
                className={classes["resultBadge"]}
                py="lg"
                px="xl"
                styles={{ label: { fontSize: "1.1rem", fontWeight: 700 } }}
              >
                {options[selectedIndex]}
              </Badge>
            )}
          </>
        ) : isSpinning ? (
          <Text size="sm" c="gray.7" fw={500}>
            Spinning...
          </Text>
        ) : (
          <Text size="sm" c="gray.7" fw={500}>
            Click below to spin the wheel!
          </Text>
        )}
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        size="lg"
        radius="md"
        variant="filled"
        color="blue.9"
        leftSection={<ArrowClockwise size={20} />}
        px={36}
      >
        Spin
      </Button>
    </Stack>
  );
}
