import { Footer } from "@site/component/Footer";
import { Header } from "@site/component/Header";
import classes from "@site/layout/ArticleLayout.module.css";
import type { ReactNode } from "react";

/**
 * An article layout component.
 *
 * @param props The component props.
 * @param props.title The title of the article.
 * @param props.children The children elements to render within the main content area.
 * @returns The rendered article layout component.
 */
export function ArticleLayout(props: { title: string; children?: ReactNode }) {
  return (
    <div className={classes["layout"]}>
      <Header title={props.title} />
      <main>{props.children}</main>
      <Footer title={props.title} />
    </div>
  );
}
