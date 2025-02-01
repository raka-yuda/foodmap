import Head from "next/head";

interface Props {
  titlePage: String;
}

const Header = ({ titlePage }: Props) => {
  return (
    <Head>
      <title>{titlePage}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Header;
