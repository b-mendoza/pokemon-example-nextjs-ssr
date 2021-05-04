import Link, { LinkProps } from 'next/link';

type Props = LinkProps & Omit<React.ComponentProps<'a'>, 'href'>;

const LinkTo = ({
  as,
  children,
  href,
  locale,
  prefetch,
  replace,
  scroll,
  shallow,
  ...anchorProps
}: Props) => (
  <Link {...{ as, children, href, locale, prefetch, replace, scroll, shallow }}>
    <a {...anchorProps}>{children}</a>
  </Link>
);

export default LinkTo;
