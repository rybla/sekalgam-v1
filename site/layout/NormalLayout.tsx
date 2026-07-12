import { Footer } from "@site/component/Footer";
import { Header } from "@site/component/Header";
import classes from "@site/layout/NormalLayout.module.css";
import type { ReactNode } from "react";

/**
 *
 * @param props
 * @param props.title
 * @param props.children
 */
export function NormalLayout(props: { title: string; children?: ReactNode }) {
  return (
    <div className={classes["layout"]}>
      <Header title={props.title} />
      <main>{props.children}</main>
      <Footer title={props.title} />
    </div>
  );
}
