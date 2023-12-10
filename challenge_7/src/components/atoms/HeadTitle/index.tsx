import {HelmetProvider, Helmet} from "react-helmet-async";

type HeadTitleProps = {
  title: string,
}

function HeadTitle({title}: HeadTitleProps) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
    </>
  )
}

export default HeadTitle