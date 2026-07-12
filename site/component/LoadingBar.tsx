import classes from "@site/component/LoadingBar.module.css";

/**
 * Renders a loading bar indicator showing progress.
 *
 * @param props The component props.
 * @param props.progress A number ranging from `0` to `1` that encodes the current loading progress, where 0 is no progress and 1 is fully loaded.
 * @returns The rendered loading bar component.
 */
export default function LoadingBar(props: {
  /**
   * A number ranging from `0` to `1` that encodes the current loading progress,
   * where `0` is no progress and `1` is fully loaded.
   */
  progress: number;
  /**
   * Optional accessible name for the progressbar. Defaults to "Loading progress".
   */
  "aria-label"?: string;
}) {
  const percentage = Math.max(0, Math.min(1, props.progress)) * 100;

  return (
    <div
      className={classes["container"]}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={props["aria-label"] ?? "Loading progress"}
    >
      <svg className={classes["svg"]} width="100%" height="100%">
        <rect className={classes["track"]} width="100%" height="100%" />
        <rect
          className={classes["bar"]}
          width={`${percentage}%`}
          height="100%"
        />
      </svg>
    </div>
  );
}
