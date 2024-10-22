"use client";
import sx from "@/widgets/layout/ui/about/style/navbar.module.scss";
import Link from "next/link";
import { AppPathEnum, BaseButton, NavLink } from "@/shared";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  title: string;
};
export async function NewsNavbar({ title }: Props) {
  const tr = useTranslations("Main");
  const trNews = useTranslations("News");
  const locale = useLocale();
  return (
    <div className={sx.aboutNavbar}>
      <h1 className={"title"}>{title}</h1>
      <div className={sx.wrap}>
        <Link
          className={`${sx.myBtn} ${NavLink.isActiveLink(`/${locale + AppPathEnum.NEWS + AppPathEnum.INFO}`) ? sx.active : ""}`}
          href={`/${locale + AppPathEnum.NEWS + AppPathEnum.INFO}`}
        >
          <BaseButton text={tr('all')} />
        </Link>
        <Link
          className={`${sx.myBtn} ${NavLink.isActiveLink(`/${locale + AppPathEnum.NEWS}`) ? sx.active : ""}`}
          href={`/${locale + AppPathEnum.NEWS}`}
        >
          <BaseButton text={tr("news")} />
        </Link>
        {/* <Link
          className={`${sx.myBtn} ${NavLink.isActiveLink(`/${locale + AppPathEnum.NEWS + AppPathEnum.NEW}`) ? sx.active : ""}`}
          href={`/${locale + AppPathEnum.NEWS + AppPathEnum.NEW}`}
        >
          <BaseButton text={"News"} />
        </Link> */}
        <Link
          className={`${sx.myBtn} ${NavLink.isActiveLink(`/${locale + AppPathEnum.NEWS + AppPathEnum.KNOWLEDGE}`) ? sx.active : ""}`}
          href={`/${locale + AppPathEnum.NEWS + AppPathEnum.KNOWLEDGE}`}
        >
          <BaseButton text={trNews('usefulInfo')} />
        </Link>
        <Link
          className={`${sx.myBtn} ${NavLink.isActiveLink(`/${locale + AppPathEnum.NEWS + AppPathEnum.POST}`) ? sx.active : ""}`}
          href={`/${locale + AppPathEnum.NEWS + AppPathEnum.POST}`}
        >
          <BaseButton text={tr('posts')} />
        </Link>
      </div>
    </div>
  );
}
