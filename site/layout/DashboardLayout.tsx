import { Footer } from "@site/component/Footer";
import { Header } from "@site/component/Header";
import classes from "@site/layout/DashboardLayout.module.css";
import type { ReactNode } from "react";

/**
 * An dashboard layout component.
 * @param props The component props.
 * @param props.title The title of the dashboard.
 * @param props.children The children elements to render within the main content area.
 * @returns The rendered dashboard layout component.
 */
export default function DashboardLayout(props: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={classes["layout"]}>
      <Header title={props.title} />
      <main className={classes["main"]}>{props.children}</main>
      <Footer title={props.title} />
    </div>
  );
}
